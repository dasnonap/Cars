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
import { EngineType } from '../engine-type/engine-type.entity';
import { Models } from '../models/models.entity';
import { Transmission_Type } from '../trans-type/trans-type.entity';
import { Type_of_car } from '../car-type/car-type.entity';
import { Wheeldrive } from '../wheeldrive/wheeldrive.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';



@Injectable()
export class AdvertismentsService {
    private lastInsertedADID: number = 0;
    constructor(
        @InjectRepository(Advertisments)
        private adsRepo:Repository<Advertisments>,

        @InjectRepository(Cars)
        private carsRepo: Repository<Cars>,

        @InjectRepository(Cities)
        private citiesRepo: Repository<Cities>,

        @InjectRepository(Users)
        private usersRepo:Repository<Users>,

        @InjectRepository(EngineType)
        private engineRepo: Repository<EngineType>,

        @InjectRepository(Models)
        private modelsRepo: Repository<Models>,

        @InjectRepository(Transmission_Type)
        private transRepo: Repository<Transmission_Type>,

        @InjectRepository(Type_of_car)
        private carTypeRepo: Repository<Type_of_car>,

        @InjectRepository(Wheeldrive)
        private wheelRepo: Repository<Wheeldrive>,

        @InjectRepository(Manufacturer)
        private manRepo: Repository<Manufacturer>
        
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
        var newID: number;
        
        const carID =  await this.searchCar(ad.car);
        if(carID == null){
            const newCar = await this.createCar(ad.car);
            const car = await this.carsRepo.insert(newCar).then(()=>{
            return this.carsRepo.getId(newCar);
            });
            newID = car;
            row.carID = await this.carsRepo.findOne(newID);
        }
        
        row.carID = carID;
        row.cityID = await this.citiesRepo.findOne({where: {cityName: ad.city}});
        row.creatorID = await this.usersRepo.findOne({where: {username: ad.creatorUsername}});
        
        row.creatorPN = ad.creatorPN;
        row.price = ad.price;
        row.desc = ad.desc;
        row.photos = "new";

        return this.adsRepo.insert(row).then(()=>{
            return this.adsRepo.getId(row);
        });

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
        
        return this.searchEngine(car, array)[0];
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

    private async createCar(car: CarsModel){
        const row = new Cars();
        row.doors = car.doorNumber;
        row.year = car.yearDev;

        row.engineID = await this.engineRepo.findOne({where: {type: car.engineType}});
        if(await this.manRepo.count({where: {name: car.man}}) == 0){
            const manu = new Manufacturer();

            manu.name = car.man;
            this.manRepo.insert(manu);
        }
        
        if(await this.modelsRepo.count({where: {modelName: car.model}}) == 0){
            const model = new Models();
            
            const manID = await this.manRepo.findOne({where: {name: car.man}});
            model.manID = manID;
            model.modelName = car.model;
            
            const mod = await this.modelsRepo.insert(model).then(()=>{
                return this.modelsRepo.getId(model);
            });
            var modID: number = mod;
            row.modelID =  await this.modelsRepo.findOne({where: {id: modID}});
            
        }
        row.modelID = await this.modelsRepo.findOne({where: {modelName: car.model}});
        
        row.transID = await this.transRepo.findOne({where: {type: car.transType}});

        
        row.carTypeID = await this.carTypeRepo.findOne({where: {name: car.carType}});
        
        row.wheelDriveID = await this.wheelRepo.findOne({where: {type: car.wheelDrive}});  
        
        return row;

    }

}
