import { Module } from '@nestjs/common';
import { CitiesModule } from './cities.module';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';


@Module({
    imports: [CitiesModule],
    providers: [CitiesService],
    controllers: [CitiesController],
})
export class CitiesHttpModule{
    
}