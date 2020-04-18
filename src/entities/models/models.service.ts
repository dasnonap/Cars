import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Models } from './models.entity';
import { Repository } from 'typeorm';
import { ModelsModel } from 'src/DTO/models.model';
import { ManufacturerService } from '../manufacturer/manufacturer.service';

@Injectable()
export class ModelsService {

    constructor(
        @InjectRepository(Models)
        private modelsRepo: Repository<Models>,
        private manService: ManufacturerService
    ){}

    async findAll(): Promise<Models[]>{
        return this.modelsRepo.find({relations: ["manID"]});
    }

    async findOne(id: number): Promise<Models>{
        return this.modelsRepo.findOne(id);
    }

    async findWithName(name: string){
        return this.modelsRepo.findOne({where: {modelName: name}});
    }

    async insertOne(model: ModelsModel){
        const row = new Models();
        
        row.manID = await this.manService.findWithName(model.man);
        row.modelName = model.modelName;

            if(await this.checkExists(model.modelName) != 0){
                throw ConflictException;
            }
            else{
                this.modelsRepo.insert(row);  
            }  
    }

    private async checkExists(name: string): Promise<number>{
        let res = await this.modelsRepo.count({where: {modelName: name}});
        return res;
    }
}
