import { Controller, Get, Post, Body } from '@nestjs/common';
import { ModelsService } from './models.service';
import { Models } from './models.entity';
import { ModelsModel } from 'src/DTO/models.model';

@Controller('models')
export class ModelsController {
    constructor( protected readonly modelsService: ModelsService){}

    @Get()
    findAll(): Promise<Models>{
        return this.findAll();
    }

    @Post()
    insertModel(@Body('model') model: string, @Body('manName') man: string){
        this.modelsService.insertOne(new ModelsModel(0, model, man))
    }
}
