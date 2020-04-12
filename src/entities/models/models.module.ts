import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Models } from './models.entity';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { ManufacturerService } from '../manufacturer/manufacturer.service';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';
import { Manufacturer } from '../manufacturer/manufacturer.entity';


@Module({
    imports: [TypeOrmModule.forFeature([Models, Manufacturer])],
    providers: [ModelsService, ManufacturerService],
    exports: [TypeOrmModule],
    controllers: [ModelsController]
})
export class ModelsModule {

}
