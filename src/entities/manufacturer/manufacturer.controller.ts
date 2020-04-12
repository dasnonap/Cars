import { Controller, Get, Post, Body } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerModel } from 'src/DTO/manufacturer.model';

@Controller('manufacturer')
export class ManufacturerController {
    constructor(protected readonly manuService: ManufacturerService){}

    @Get()
    findAll(): Promise<Manufacturer[]>{
        return this.manuService.findAll();
    }

    @Post()
    insert(@Body('name') name: string){
        this.manuService.insertOne(new ManufacturerModel(0, name));
    }
}
