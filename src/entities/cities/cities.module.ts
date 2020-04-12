import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cities } from './cities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cities])],
  providers: [CitiesService],
  controllers: [CitiesController],
  exports:[TypeOrmModule]
})
export class CitiesModule {}
