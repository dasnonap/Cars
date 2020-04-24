import { Module } from '@nestjs/common';
import { QueriesController } from './queries.controller';
import { QueriesService } from './queries.service';
import { AdvertismentsModule } from 'src/entities/advertisments/advertisments.module';
import { AdvertismentsService } from 'src/entities/advertisments/advertisments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisments } from 'src/entities/advertisments/advertisments.entity';
import { Cars } from 'src/entities/cars/cars.entity';
  
import { Users } from 'src/entities/users/users.entity';
import { Cities } from 'src/entities/cities/cities.entity';
import { EngineType } from 'src/entities/engine-type/engine-type.entity';
import { CarsModule } from 'src/entities/cars/cars.module';
import { CarsService } from 'src/entities/cars/cars.service';
import { Transmission_Type } from 'src/entities/trans-type/trans-type.entity';
import { Type_of_car } from 'src/entities/car-type/car-type.entity';
import { Wheeldrive } from 'src/entities/wheeldrive/wheeldrive.entity';
import { Models } from 'src/entities/models/models.entity';
import { Manufacturer } from 'src/entities/manufacturer/manufacturer.entity';

@Module({
  imports: [AdvertismentsModule, CarsModule,

           TypeOrmModule.forFeature([Advertisments, Cars, Users, Cities, EngineType, Transmission_Type, Type_of_car, Wheeldrive, Models, Manufacturer])],
  controllers: [QueriesController],
  providers: [QueriesService, AdvertismentsService, CarsService]
})
export class QueriesModule {}
