import { Injectable, ConflictException } from '@nestjs/common';
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

    async findWithName(typeName: string): Promise<Type_of_car>{
        return this.carTypeRepo.findOne({where: {name: typeName}});
    }

    findOne(id: number): Promise<Type_of_car>{
        return this.carTypeRepo.findOne(id);
    }

    async insertOne(type: CarTypeModel){
        const row = new Type_of_car();

        row.name = type.carType;
        if(await this.checkExists(type.carType) != 0){
            throw ConflictException;
        }


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

    private checkExists(type: string){
        return this.carTypeRepo.count({where: {name: type}});
    }
}
