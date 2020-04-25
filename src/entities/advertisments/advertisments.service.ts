import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';
import { Repository, LessThanOrEqual, MoreThanOrEqual, Like } from 'typeorm';

import { AdvertismentsModel } from 'src/DTO/advertisments.model';
import * as fs from 'fs-extra';

import { Users } from '../users/users.entity';
import { Cities } from '../cities/cities.entity';
import { Cars } from '../cars/cars.entity';
import { SearchModel } from 'src/DTO/search.model';
import { CarsModel } from 'src/DTO/cars.model';



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

        row.carID = this.searchCar(ad.car)[0];

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
        let urlAd = ad;
        urlAd.urls = [];
        let counter = 1;
        
        this.adsRepo
            .createQueryBuilder()
            .update(Advertisments)
            .set({photos: ad.photos})
            .where('adID = :adID', { adID: ad.id })
            .execute();

        
        files.forEach( file =>{
            var path = this.createFilePath(counter, ad.id);
            fs.move('./ads/photos/' + file.filename, path);
            urlAd.urls.push('localhost:3000/img/' + ad.id + '_' + counter);
            counter++;
        });
        return urlAd;
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
    
            fs.mkdir('F:/ads/ad' + ad +'/photos', (err)=>{
                if(err) throw err;
            } );
        }
    }

    private async searchCar(car: CarsModel){
        const array = await this.carsRepo.find({relations: ['engineID', 'modelID', 'transID',  'carTypeID', 'wheelDriveID']});
        
        return this.searchEngine(car, array);
    }
    private searchEngine(car: CarsModel, array: Cars[]){
        return this.searchModel(car, array.filter(function(value, index, arr){
            return value.engineID.type == car.engineType;
        }));
    }
    private searchModel(car: CarsModel, array: Cars[]){
        return this.searchTrans(car, array.filter(function(value, index, arr){
            return value.modelID.modelName == car.model;
        }));
    }
    private searchTrans(car: CarsModel, array: Cars[]){
        return this.searchCarType(car, array.filter(function(value, index, arr){
            return value.transID.type == car.transType;
        }));
    }
    private searchCarType(car: CarsModel, array: Cars[]){
        return this.searchWheel(car, array.filter(function(value, index, arr){
            return value.carTypeID.name == car.carType;
        }));
    }
    private searchWheel(car: CarsModel, array: Cars[]){
        return this.searchDoors(car, array.filter(function(value, index, arr){
            return value.wheelDriveID.type == car.wheelDrive;
        }));
    }
    private searchDoors(car: CarsModel, array: Cars[]){
        return this.searchYear(car, array.filter(function(value, index, arr){
            return value.doors == car.doorNumber;
        }));
    }
    private searchYear(car: CarsModel, array: Cars[]){
        return array.filter(function(value, index, arr){
            return value.year == car.yearDev;
        });
    }

}
