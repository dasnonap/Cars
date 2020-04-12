import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CitiesModule } from './entities/cities/cities.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cities } from './entities/cities/cities.entity';
import { ManufacturerModule } from './entities/manufacturer/manufacturer.module';
import { Manufacturer } from './entities/manufacturer/manufacturer.entity';
import { AdvertismentsModule } from './entities/advertisments/advertisments.module';
import { Advertisments } from './entities/advertisments/advertisments.entity';
import { Cars } from './entities/cars/cars.entity';
import { Type_of_car } from './entities/car-type/car-type.entity';
import { EngineType } from './entities/engine-type/engine-type.entity';
import { Models } from './entities/models/models.entity';
import { Transmission_Type } from './entities/trans-type/trans-type.entity';
import { Users } from './entities/users/users.entity';
import { Wheeldrive } from './entities/wheeldrive/wheeldrive.entity';
import { Liked_ads } from './entities/liked-ads/liked-ads.entity';
import { ModelsModule } from './entities/models/models.module';


@Module({
  imports: [
    CitiesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'two',
      synchronize: true,
      keepConnectionAlive: true,
      entities: [ Cities, Manufacturer, Advertisments, Cars, 
                  Type_of_car, EngineType, Models, Transmission_Type,
                  Users, Wheeldrive, Liked_ads ]
    }),
    ManufacturerModule,
    AdvertismentsModule, 
    ModelsModule,   
  ],
  controllers: [AppController],
  providers: [AppService],
}
)
export class AppModule {
}
