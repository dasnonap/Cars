import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Like } from 'typeorm';
import { CarsService } from '../cars/cars.service';
import { CitiesService } from '../cities/cities.service';
import { UsersService } from '../users/users.service';
import { AdvertismentsModel } from 'src/DTO/advertisments.model';
import * as fs from 'fs-extra';

import { Users } from '../users/users.entity';
import { Cities } from '../cities/cities.entity';
import { Cars } from '../cars/cars.entity';
import { SearchModel } from 'src/DTO/search.model';
import { EngineType } from '../engine-type/engine-type.entity';


@Injectable()
export class AdvertismentsService {
    constructor(
        @InjectRepository(Advertisments)
        private adsRepo:Repository<Advertisments>,

        @InjectRepository(Cars)
        private carsRepo: Repository<Cars>,

        @InjectRepository(Cities)
        private citiesRepo: Repository<Cities>,

        @InjectRepository(Users)
        private usersRepo:Repository<Users>
        
    ){}

    async findAll(): Promise<Advertisments[]>{
        return this.adsRepo.find({relations: ['carID', 'carID.engineID', 'carID.modelID', 'carID.modelID.manID','carID.transID', 'carID.carTypeID', 'carID.wheelDriveID', 'cityID', 'creatorID'], 
        
    });
    }
    
    findWithID(id: number): Promise<Advertisments>{
        return this.adsRepo.findOne(id);
    }

    getCities(): Promise<Cities[]>{
        return this.citiesRepo.find();
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

    async findWithModel(search: SearchModel){
        var array = await this.findAll();
        
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

        row.carID = await this.carsRepo.findOne(ad.car);
        row.cityID = await this.citiesRepo.findOne({where: {cityName: ad.city}});
        row.creatorID = await this.usersRepo.findOne({where: {username: ad.creatorUsername}});
        
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
