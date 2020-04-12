import { Controller, Get } from '@nestjs/common';
import { CarsService } from './cars.service';
import { Cars } from './cars.entity';

@Controller('cars')
export class CarsController {
    constructor(private readonly carsService: CarsService){}

    @Get()
    findAll() :Promise<Cars[]>{
        return this.carsService.findAll();
    }
}
