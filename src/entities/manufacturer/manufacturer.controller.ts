import { Controller, Get, Post, Body, ConflictException } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { Manufacturer } from './manufacturer.entity';
import { ManufacturerModel } from 'src/DTO/manufacturer.model';

@Controller('manufacturer')
export class ManufacturerController {
    constructor(protected readonly manuService: ManufacturerService){}

    @Get()
    async findAll(){
        return this.manuService.findAll();
    }

    @Post()
    insert(@Body('name') name: string){
        try{
            this.manuService.insertOne(new ManufacturerModel(0, name));
        }
        catch(err){
            return "Already exists";
        }
        
    }
}
