import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wheeldrive } from './wheeldrive.entity';
import { WheeldriveService } from './wheeldrive.service';
import { WheeldriveController } from './wheeldrive.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Wheeldrive])],
    providers: [WheeldriveService],
    exports: [TypeOrmModule],
    controllers: [WheeldriveController]
})
export class WheeldriveModule {}
