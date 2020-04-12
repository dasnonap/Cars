import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdvertismentsService {

    constructor(
        @InjectRepository(Advertisments)
        private adsRepo:Repository<Advertisments>,
    ){}

    async findAll(): Promise<Advertisments[]>{
        return this.adsRepo.find();
    }
}
