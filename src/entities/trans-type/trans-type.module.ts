import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transmission_Type } from './trans-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transmission_Type])],
    exports: [TypeOrmModule]
})
export class TransTypeModule {}
