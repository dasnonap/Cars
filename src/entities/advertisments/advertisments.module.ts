import { Module } from '@nestjs/common';
import { AdvertismentsService } from './advertisments.service';
import { AdvertismentsController } from './advertisments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';

import { Cars } from '../cars/cars.entity';

import { MulterModule } from '@nestjs/platform-express';
import { Users } from '../users/users.entity';
import { Cities } from '../cities/cities.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Advertisments, Cars, Users, Cities]), 
            MulterModule.register({
             dest: './ads/photos/'
            })],
  providers: [AdvertismentsService, ],
  controllers: [AdvertismentsController],
  
})
export class AdvertismentsModule {}
