import { Controller, Get, Post, Body } from '@nestjs/common';
import { EngineTypeService } from './engine-type.service';
import { EngineTypeModel } from 'src/DTO/engineType.model';

@Controller('engine-type')
export class EngineTypeController {

    constructor( private engineService: EngineTypeService){}
    @Get()
    getAll(){
        return this.engineService.findAll();
    }

    @Post()
    insertOne(@Body()engine: EngineTypeModel){
        try{
            this.engineService.insertOne(engine);
        }
        catch(err){
            return "Already exists";
        }
    }
}
