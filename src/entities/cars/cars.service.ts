import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cars } from './cars.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {

    constructor(
        @InjectRepository(Cars)
        private carsRepo: Repository<Cars>
    ){}

    async findAll(): Promise<Cars[]>{
        return this.carsRepo.find();
    }
}
