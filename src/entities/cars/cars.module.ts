import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cars } from './cars.entity';
import { EngineTypeService } from '../engine-type/engine-type.service';
import { ModelsService } from '../models/models.service';
import { TransTypeService } from '../trans-type/trans-type.service';
import { CarTypeService } from '../car-type/car-type.service';
import { WheeldriveService } from '../wheeldrive/wheeldrive.service';
import { EngineTypeModule } from '../engine-type/engine-type.module';
import { ModelsModule } from '../models/models.module';
import { TransTypeModule } from '../trans-type/trans-type.module';
import { CarTypeModule } from '../car-type/car-type.module';
import { WheeldriveModule } from '../wheeldrive/wheeldrive.module';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';


@Module({
  imports: [TypeOrmModule.forFeature([Cars]), EngineTypeModule,
            ModelsModule, TransTypeModule,
            CarTypeModule, WheeldriveModule, ManufacturerModule],
  controllers: [CarsController],
  providers: [CarsService, EngineTypeService,
              ModelsService, TransTypeService,
              CarTypeService, WheeldriveService, ManufacturerService]
})
export class CarsModule {

}
