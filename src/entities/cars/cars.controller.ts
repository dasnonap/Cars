import { Controller, Get, Body, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Cars } from './cars.entity';
import { CarsModel } from 'src/DTO/cars.model';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService){}

    @Get()
    findAll() :Promise<Cars[]>{
        return this.carsService.findAll();
    }

    @Post()
    insertCar(@Body()car: CarsModel ){
        this.carsService.insert(car);
    }
}
