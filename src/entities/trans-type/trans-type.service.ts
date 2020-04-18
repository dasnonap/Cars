import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transmission_Type } from './trans-type.entity';
import { Repository } from 'typeorm';
import { TransTypeModel } from 'src/DTO/transType.model';
import { throwError } from 'rxjs';

@Injectable()
export class TransTypeService {
    constructor(
        @InjectRepository(Transmission_Type)
        private transRepo: Repository<Transmission_Type>
    ){}

    async findAll(): Promise<Transmission_Type[]>{
        return this.transRepo.find();
    }

    async findOne(typeName: string): Promise<Transmission_Type>{
        return this.transRepo.findOne({where: {type: typeName}});
    }

    async insertOne(type: TransTypeModel){
        const row = new Transmission_Type();
        row.type = type.transType;

        if(await this.checkExists(type.transType) != 0){
            throwError(ConflictException);
        }

        this.transRepo.insert(row);
    }

    private checkExists(typeName: string){
        return this.transRepo.count({where: {type: typeName}});
    }
}
