import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from './cars.entity';
import { Repository } from 'typeorm';

import { CarsModel } from 'src/DTO/cars.model';
import { EngineType } from '../engine-type/engine-type.entity';
import { Models } from '../models/models.entity';
import { Transmission_Type } from '../trans-type/trans-type.entity';
import { Type_of_car } from '../car-type/car-type.entity';
import { Wheeldrive } from '../wheeldrive/wheeldrive.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { SearchModel } from 'src/DTO/search.model';


@Injectable()
export class CarsService {

   constructor(
        @InjectRepository(Cars)
        private carsRepo: Repository<Cars>,

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

    async findAll(): Promise<Cars[]>{
        return this.carsRepo.find({relations: ['engineID', 'modelID', 'transID',  'carTypeID', 'wheelDriveID']});
    }

    async findWithModel(search: SearchModel): Promise<Cars[]>{
        return this.carsRepo
                .createQueryBuilder("car")
                .leftJoinAndSelect("car.engineID", "engine")
                .leftJoinAndSelect("car.modelID", "model")
                .leftJoinAndSelect("car.transID", "trans")
                .leftJoinAndSelect("car.carTypeID", "carType")
                .leftJoinAndSelect("car.wheelDriveID", "wheel")
                .where("engine.type = :type", {type: search.engine})
                .orWhere("model.modelName = :name", {name: search.model})
                .orWhere("trans.type = :type", {type: search.transmission})
                .orWhere("carType.name = :name", {name: search.car_type})
                .orWhere("wheel.type = :type", {type: search.wheelDrive})
                .getMany();
    }

    async insert(car: CarsModel){
        const row = new Cars();
        row.doors = car.doorNumber;
        row.year = car.yearDev;
        row.engineID = await this.engineRepo.findOne({where: {type: car.engineType}});
        
        row.modelID = await this.modelsRepo.findOne({where: {modelName: car.model}});
        
        row.transID = await this.transRepo.findOne({where: {type: car.transType}});

        
        row.carTypeID = await this.carTypeRepo.findOne({where: {name: car.carType}});
        
        row.wheelDriveID = await this.wheelRepo.findOne({where: {type: car.wheelDrive}});        

        this.carsRepo.insert(row);

    }

    returnEngines(): Promise<EngineType[]>{
        return this.engineRepo.find();
    }
    returnModels(): Promise<Models[]>{
        return this.modelsRepo.find({relations: ['manID']});
    }
    returnTransm(): Promise<Transmission_Type[]>{
        return this.transRepo.find();
    }
    returnCarType(): Promise<Type_of_car[]>{
        return this.carTypeRepo.find();
    }
    returnWheelDrive(): Promise<Wheeldrive[]>{
        return this.wheelRepo.find();
    }
    returnMan(): Promise<Manufacturer[]>{
        return this.manRepo.find();
    }

}
