import { Module } from '@nestjs/common';
import { AdvertismentsService } from './advertisments.service';
import { AdvertismentsController } from './advertisments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisments } from './advertisments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisments])],
  providers: [AdvertismentsService],
  controllers: [AdvertismentsController],
  exports: [TypeOrmModule]
})
export class AdvertismentsModule {}
