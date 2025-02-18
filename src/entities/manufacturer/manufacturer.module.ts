import { Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature( [Manufacturer] )],
  providers: [ManufacturerService, ],
  controllers: [ManufacturerController]
})
export class ManufacturerModule {}
