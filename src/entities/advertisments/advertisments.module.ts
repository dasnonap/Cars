import { Module } from '@nestjs/common';
import { AdvertismentsService } from './advertisments.service';
import { AdvertismentsController } from './advertisments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';

import { Cars } from '../cars/cars.entity';

import { MulterModule } from '@nestjs/platform-express';
import { Users } from '../users/users.entity';
import { Cities } from '../cities/cities.entity';
import { EngineType } from '../engine-type/engine-type.entity';
import { Models } from '../models/models.entity';
import { Transmission_Type } from '../trans-type/trans-type.entity';
import { Type_of_car } from '../car-type/car-type.entity';
import { Wheeldrive } from '../wheeldrive/wheeldrive.entity';
import { Manufacturer } from '../manufacturer/manufacturer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Advertisments, Cars, Users, Cities, EngineType, Models, Transmission_Type, Type_of_car, Wheeldrive, Manufacturer]), 
            MulterModule.register({
             dest: './ads/photos/'
            })],
  providers: [AdvertismentsService, ],
  controllers: [AdvertismentsController],
  
})
export class AdvertismentsModule {}
