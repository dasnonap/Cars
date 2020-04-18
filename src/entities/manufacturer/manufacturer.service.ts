import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository } from 'typeorm';
import { ManufacturerModel } from 'src/DTO/manufacturer.model';

@Injectable()
export class ManufacturerService {

    constructor(
        @InjectRepository(Manufacturer)
        private manRepo: Repository<Manufacturer>
    ){}
    async findAll(): Promise<Manufacturer[]>{
        return this.manRepo.find();
    }

    async findOne(id: number): Promise<Manufacturer>{
        return this.manRepo.findOne(id);
    }

    async findWithName(man: string): Promise<Manufacturer>{
        return this.manRepo.findOne({where: {name: man}});
    }

    async insertOne(mann: ManufacturerModel){
        const row = new Manufacturer();

        row.name = mann.man;

        if (await this.checkExists(mann.man) != 0){
            throw ConflictException;
        }

        this.manRepo.insert(row);
    }

    updateOne(man: ManufacturerModel){
        const row = new Manufacturer();

        row.name = man.man;

        this.manRepo.update(man.getID(), row);
    }

    deleteOne(id: number){
        this.manRepo.delete(id);
    }

   private async checkExists(manName: string): Promise<number>{
        return this.manRepo.count({where: {name: manName}});
   }



}
