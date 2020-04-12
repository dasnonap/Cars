import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wheeldrive } from './wheeldrive.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WheeldriveService {
    constructor(
        @InjectRepository(Wheeldrive)
        private driveRepo: Repository<Wheeldrive>,
    ){}

    async findAll(): Promise<Wheeldrive[]>{
        return this.driveRepo.find();
    }
}
