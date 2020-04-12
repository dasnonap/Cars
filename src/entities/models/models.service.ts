import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Models } from './models.entity';
import { Repository } from 'typeorm';
import { ModelsModel } from 'src/DTO/models.model';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { ManufacturerService } from '../manufacturer/manufacturer.service';

@Injectable()
export class ModelsService {

    constructor(
        @InjectRepository(Models)
        private modelsRepo: Repository<Models>,
        private manService: ManufacturerService
    ){}

    async findAll(): Promise<Models[]>{
        return this.modelsRepo.find();
    }

    findOne(id: number): Promise<Models>{
        return this.modelsRepo.findOne(id);
    }

    insertOne(model: ModelsModel){
        const row = new Models();
        
        const manID = this.manService.getArray(model.getMan());
        row.manID = manID;

        row.modelName = model.getName();

        this.modelsRepo.insert(row);
        
    }
}
