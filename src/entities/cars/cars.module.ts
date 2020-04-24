import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './cars.entity';

import { EngineType } from '../engine-type/engine-type.entity';
import { Models } from '../models/models.entity';
import { Transmission_Type } from '../trans-type/trans-type.entity';
import { Type_of_car } from '../car-type/car-type.entity';
import { Wheeldrive } from '../wheeldrive/wheeldrive.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Cars, EngineType, Models, Transmission_Type, Type_of_car, Wheeldrive, Manufacturer])],
  controllers: [CarsController],
  providers: [CarsService, ]
})
export class CarsModule {

}
