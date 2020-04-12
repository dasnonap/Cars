import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type_of_car } from './car-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Type_of_car])],
    exports: [TypeOrmModule]
})
export class CarTypeModule {

}
