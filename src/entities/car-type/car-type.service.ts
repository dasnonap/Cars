import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Type_of_car } from './car-type.entity';
import { Repository } from 'typeorm';
import { CarTypeModel } from 'src/DTO/carType.model';

@Injectable()
export class CarTypeService {
    constructor(
        @InjectRepository(Type_of_car)
        private carTypeRepo: Repository<Type_of_car>,
    ){}

    async findAll(): Promise<Type_of_car[]>{
        return this.carTypeRepo.find();
    }

    findOne(id: number): Promise<Type_of_car>{
        return this.carTypeRepo.findOne(id);
    }

    insertOne(type: CarTypeModel){
        const row = new Type_of_car();

        row.name = type.getCarType();

        this.carTypeRepo.insert(row);
    }

    updateOne(type: CarTypeModel){
        const row = new Type_of_car();

        row.name = type.getCarType();

        this.carTypeRepo.update(type.getID(), row);
    }

    deleteOne(id: number){
        this.carTypeRepo.delete(id);
    }
}
