import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { Cities } from './cities.entity';
import { CitiesModel } from 'src/DTO/cities.model';

@Controller('cities')
export class CitiesController {
    constructor(protected readonly citiesService: CitiesService){}

    @Get()
    findAll(): Promise<Cities[]>{
        return this.citiesService.findAll();
    }
    
    @Get(':id')
    findOne(@Param('id') id: number){
        return this.citiesService.findOne(id);
    }

    @Post()
    setCity(@Body('name') name: string ) {
        this.citiesService.insertOne(new CitiesModel(0, name));
    }

    @Post('update/:id')
    updateCity(@Param('id') id: number, @Body('name') name: string) {
        this.citiesService.updateOne(new CitiesModel(id, name));
    }

}
