import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type_of_car } from './car-type.entity';
import { CarTypeService } from './car-type.service';
import { CarTypeController } from './car-type.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Type_of_car])],
    providers: [CarTypeService],
    exports: [TypeOrmModule],
    controllers: [CarTypeController]
})
export class CarTypeModule {

}
