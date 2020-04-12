import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wheeldrive } from './wheeldrive.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Wheeldrive])],
    exports: [TypeOrmModule]
})
export class WheeldriveModule {}
