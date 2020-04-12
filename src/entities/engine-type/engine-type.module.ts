import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineType } from './engine-type.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EngineType])],
    exports: [TypeOrmModule]
})
export class EngineTypeModule {}
