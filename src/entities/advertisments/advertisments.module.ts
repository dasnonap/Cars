import { Module } from '@nestjs/common';
import { AdvertismentsService } from './advertisments.service';
import { AdvertismentsController } from './advertisments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';
import { CarsModule } from '../cars/cars.module';
import { CarsService } from '../cars/cars.service';
import { CitiesModule } from '../cities/cities.module';
import { CitiesService } from '../cities/cities.service';
import { Cars } from '../cars/cars.entity';
import { EngineTypeModule } from '../engine-type/engine-type.module';
import { ModelsModule } from '../models/models.module';
import { TransTypeModule } from '../trans-type/trans-type.module';
import { CarTypeModule } from '../car-type/car-type.module';
import { WheeldriveModule } from '../wheeldrive/wheeldrive.module';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';
import { EngineTypeService } from '../engine-type/engine-type.service';
import { ModelsService } from '../models/models.service';
import { TransTypeService } from '../trans-type/trans-type.service';
import { CarTypeService } from '../car-type/car-type.service';
import { WheeldriveService } from '../wheeldrive/wheeldrive.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisments, Cars]), 
            MulterModule.register({
             dest: './ads/photos/'
            }),
            CarsModule, CitiesModule, 
            EngineTypeModule,ModelsModule, 
            TransTypeModule,CarTypeModule, 
            WheeldriveModule, ManufacturerModule, UsersModule ],
  providers: [AdvertismentsService, CarsService, CitiesService, EngineTypeService,
    ModelsService, TransTypeService,
    CarTypeService, WheeldriveService, ManufacturerService, UsersService],
  controllers: [AdvertismentsController],
  
})
export class AdvertismentsModule {}
