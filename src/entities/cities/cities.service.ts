import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cities } from './cities.entity';
import { CitiesModel } from 'src/DTO/cities.model';
import { CitiesModule } from './cities.module';


@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(Cities)
        private citiesRepo: Repository<Cities>,
    ){}

    async findAll(): Promise<Cities[]>{
        return this.citiesRepo.find();
    }

    async findOne(id: number): Promise<Cities>{
        return this.citiesRepo.findOne(id);
    }

    async findByName(name: string): Promise<Cities>{
        return this.citiesRepo.findOne({where: {cityName: name}});
    }


    insertOne(city: CitiesModel){
        const row = new Cities();
        row.cityName = city.getCity();//to do 

        this.citiesRepo.insert(row);
    }

    updateOne(city: CitiesModel){
        const row = new Cities();
        row.cityName = city.getCity();

        this.citiesRepo.update(city.id, row);
    }

    deleteOne(city: CitiesModel){

        this.citiesRepo.delete(city.id);
    }

    
}
