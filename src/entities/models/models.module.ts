import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Models } from './models.entity';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { Manufacturer } from '../manufacturer/manufacturer.entity';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';



@Module({
    imports: [ TypeOrmModule.forFeature([Models, Manufacturer]), ManufacturerModule],
    providers: [ModelsService, ManufacturerService],
    exports: [TypeOrmModule],
    controllers: [ModelsController]
})
export class ModelsModule {

}
