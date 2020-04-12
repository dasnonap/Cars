import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Repository } from 'typeorm';
import { ManufacturerModel } from 'src/DTO/manufacturer.model';

@Injectable()
export class ManufacturerService {

    constructor(
        @InjectRepository(Manufacturer)
        protected manRepo: Repository<Manufacturer>
    ){}
    async findAll(): Promise<Manufacturer[]>{
        return this.manRepo.find();
    }

    findOne(id: number): Promise<Manufacturer>{
        return this.manRepo.findOne(id);
    }

    insertOne(man: ManufacturerModel){
        const row = new Manufacturer();

        row.name = man.getMan();

        this.manRepo.insert(row);
    }

    updateOne(man: ManufacturerModel){
        const row = new Manufacturer();

        row.name = man.getMan();

        this.manRepo.update(man.getID(), row);
    }

    deleteOne(id: number){
        this.manRepo.delete(id);
    }

    getArray(manName: string){
        
        const row = new Manufacturer();
        row.name = manName;
        return this.manRepo.getId(row);
    }

}
