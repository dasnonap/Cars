import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transmission_Type } from './trans-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransTypeService {
    constructor(
        @InjectRepository(Transmission_Type)
        private transRepo: Repository<Transmission_Type>
    ){}

    async findAll(): Promise<Transmission_Type[]>{
        return this.transRepo.find();
    }
}
