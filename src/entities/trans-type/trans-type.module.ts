import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transmission_Type } from './trans-type.entity';
import { TransTypeService } from './trans-type.service';
import { TransTypeController } from './trans-type.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Transmission_Type])],
    providers: [TransTypeService],
    exports: [TypeOrmModule],
    controllers: [TransTypeController]
})
export class TransTypeModule {}
