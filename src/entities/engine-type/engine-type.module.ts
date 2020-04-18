import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineType } from './engine-type.entity';
import { EngineTypeService } from './engine-type.service';
import { EngineTypeController } from './engine-type.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EngineType])],
    providers:[EngineTypeService],
    exports: [TypeOrmModule],
    controllers: [EngineTypeController]
})
export class EngineTypeModule {}
