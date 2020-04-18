import { Controller, Get, Body, Post, Req } from '@nestjs/common';
import { CarTypeService } from './car-type.service';
import { CarTypeModel } from 'src/DTO/carType.model';

@Controller('car-type')
export class CarTypeController {
    constructor(private typeService: CarTypeService){}
    @Get()
    getAll(){
        return this.typeService.findAll();
    }

    @Post()
    insertOne( @Body() type: CarTypeModel){
        
        try{
            this.typeService.insertOne(type);
        }
        catch(err){
            return 'Already exixts';
        }        
    }
}
