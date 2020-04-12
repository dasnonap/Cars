import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EngineType } from './engine-type.entity';
import { Repository } from 'typeorm';
import { EngineTypeModel } from 'src/DTO/engineType.model';

@Injectable()
export class EngineTypeService {

    constructor(
        @InjectRepository(EngineType)
        private engineTypeRepo: Repository<EngineType>,
    ){}

    findAll(): Promise<EngineType[]>{
        return this.engineTypeRepo.find();
    }

    findOne(id: number): Promise<EngineType>{
        return this.engineTypeRepo.findOne(id);
    }

    insertOne(type: EngineTypeModel){
        const row = new EngineType();

        row.type = type.getEngineType();

        this.engineTypeRepo.insert(row);
    }

    updateOne(type: EngineTypeModel){
        const row = new EngineType();

        row.type = type.getEngineType();

        this.engineTypeRepo.update(type.getID(), row);
    }

    deleteOne(id: number){
        this.engineTypeRepo.delete(id);
    }
}
