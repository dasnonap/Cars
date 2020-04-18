import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wheeldrive } from './wheeldrive.entity';
import { Repository } from 'typeorm';
import { WheelDriveModel } from 'src/DTO/wheelDrive.model';
import { throwError } from 'rxjs';

@Injectable()
export class WheeldriveService {
    constructor(
        @InjectRepository(Wheeldrive)
        private driveRepo: Repository<Wheeldrive>,
    ){}

    async findAll(): Promise<Wheeldrive[]>{
        return this.driveRepo.find();
    }
    async findWithName(name: string): Promise<Wheeldrive>{
        return this.driveRepo.findOne({where: {type: name}});
    }
    async insert(wheel: WheelDriveModel){
        const row = new Wheeldrive();

        row.type = wheel.wheelType;

        if(await this.checkExists(wheel.wheelType) != 0){
            throwError(ConflictException);
        }

        this.driveRepo.insert(row);
    }
    private checkExists(name: string){
        return this.driveRepo.count({where: {type: name}});
    }
}
