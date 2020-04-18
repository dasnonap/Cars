import { Controller, Get, Post, Body } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Models } from './models.entity';
import { ModelsModel } from 'src/DTO/models.model';

@Controller('models')
export class ModelsController {
    constructor( protected readonly modelsService: ModelsService){}

    @Get()
    async findAll(): Promise<Models[]>{
        return this.modelsService.findAll();       
    }

    @Post()
    insertModel(@Body() model: ModelsModel){
        try{
            this.modelsService.insertOne(model);
        }
        catch(err){
            return "Already exists";
        }
        
    }
}
