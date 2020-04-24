import { Controller, Get, Body, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Cars } from './cars.entity';
import { CarsModel } from 'src/DTO/cars.model';
import { SearchModel } from 'src/DTO/search.model';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService){}

    @Get()
    findAll() :Promise<Cars[]>{
        return this.carsService.findAll();
    }
    @Get('search')
    searchWithModel(@Body()search: SearchModel){
        
        return this.carsService.findWithModel(search);
    }

    @Post()
    insertCar(@Body()car: CarsModel ){
        this.carsService.insert(car);
    }
}
