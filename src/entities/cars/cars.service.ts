import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from './cars.entity';
import { Repository } from 'typeorm';
import { EngineTypeService } from '../engine-type/engine-type.service';
import { ModelsService } from '../models/models.service';
import { TransTypeService } from '../trans-type/trans-type.service';
import { CarTypeService } from '../car-type/car-type.service';
import { WheeldriveService } from '../wheeldrive/wheeldrive.service';
import { CarsModel } from 'src/DTO/cars.model';


@Injectable()
export class CarsService {

   constructor(
        @InjectRepository(Cars)
        private carsRepo: Repository<Cars>,
        private engineService: EngineTypeService,
        private modelsService: ModelsService,
        private transService: TransTypeService,
        private carTypeService: CarTypeService,
        private wheelService: WheeldriveService
        
    ){}

    async findAll(): Promise<Cars[]>{
        return this.carsRepo.find({relations: ['engineID', 'modelID', 'transID',  'carTypeID', 'wheelDriveID']});
    }

    async findOne(id: number): Promise<Cars>{
        return this.carsRepo.findOne(id);
    }

    async insert(car: CarsModel){
        const row = new Cars();
        row.doors = car.doorNumber;
        row.year = car.yearDev;
        row.engineID = await this.engineService.findWithType(car.engineType);
        row.modelID = await this.modelsService.findWithName(car.model);
        row.transID = await this.transService.findOne(car.transType);
        row.carTypeID = await this.carTypeService.findWithName(car.carType);
        row.wheelDriveID = await this.wheelService.findWithName(car.wheelDrive);

        this.carsRepo.insert(row);

    }

}
