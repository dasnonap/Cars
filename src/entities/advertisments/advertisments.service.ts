import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';
import { Repository } from 'typeorm';
import { CarsService } from '../cars/cars.service';
import { CitiesService } from '../cities/cities.service';
import { UsersService } from '../users/users.service';
import { AdvertismentsModel } from 'src/DTO/advertisments.model';
import * as fs from 'fs-extra';
import { asap } from 'rxjs/internal/scheduler/asap';


@Injectable()
export class AdvertismentsService {
    constructor(
        @InjectRepository(Advertisments)
        private adsRepo:Repository<Advertisments>,
        private carsService: CarsService,
        private citiesService: CitiesService,
        private usersService: UsersService
        
    ){}

    async findAll(): Promise<Advertisments[]>{
        return this.adsRepo.find({relations: ['carID', 'cityID', 'creatorID']});
    }
    
    findWithID(id: number): Promise<Advertisments>{
        return this.adsRepo.findOne(id);
    }

    async findOne(creatorUsername: string ): Promise<Advertisments[]>{// за търсене на обяви за един човек
        return this.adsRepo.find({
             where: {
                creatorID: {
                    username: creatorUsername
                }
            }
        });
    }   

    async findIDByDesc(descr: string){
        const log: Advertisments = await this.adsRepo.findOne({
                                    where: {
                                    desc: descr
                                }
                            });

        
        return log;
    }

    checkExists(descr: string){
        return this.adsRepo.count({where: {desc: descr}});
    }

    async insert(ad: AdvertismentsModel){        
        const row = new Advertisments();

        row.carID = await this.carsService.findOne(ad.car);
        row.cityID = await this.citiesService.findByName(ad.city);
        row.creatorID = await this.usersService.findWithUsername(ad.creatorUsername);
        row.creatorPN = ad.creatorPN;
        row.price = ad.price;
        row.desc = ad.desc;
        row.photos = "new";

        this.adsRepo.insert(row);

    }

    insertPhotos(files: any[], id: number){
        let counter = 1;

        files.forEach(async file =>{
            fs.move('./ads/photos/' + file.filename, await this.createFilePath(counter, id))
            counter++;
        });
    }

    updateAd(ad: AdvertismentsModel, files: any[]){
        const row = new Advertisments();
        let counter = 1;

        this.adsRepo
            .createQueryBuilder()
            .update(Advertisments)
            .set({photos: ad.photos})
            .where('adID = :adID', { adID: ad.id })
            .execute();

        
        files.forEach( file =>{
            fs.move('./ads/photos/' + file.filename, this.createFilePath(counter, ad.id));
            counter++;
        });
    }

    private createFilePath(counter: number, id: number){
        
        this.createDir(id);

        return 'F:/ads/ad' + id + '/photos/' +  id + '_' + counter + '.jpg';
    }

    private createDir(ad: number){
        if(!fs.existsSync('F:/ads/ad' + ad +'/photos',)){

            fs.mkdir('F:/ads/ad' + ad, (err)=>{
                if(err) throw err;
            } );
    
            fs.mkdir(('F:/ads/ad' + ad) +'/photos', (err)=>{
                if(err) throw err;
            } );
        }
    }



}
