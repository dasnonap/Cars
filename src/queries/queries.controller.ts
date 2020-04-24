import { Controller, Get, Post, Body } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { SearchModel } from 'src/DTO/search.model';

@Controller('queries')
export class QueriesController {
    constructor(private queriesService: QueriesService){}

    @Get('ads')
    getAds(){
        return this.queriesService.getAds();
    }

    @Get('all')
    async getAllData(){
        var cities = await this.queriesService.getCities();
        var ads = await this.queriesService.getAds();
        var wheelDrives = await this.queriesService.getWheel();
        var engines = await this.queriesService.getEngines();
        var transmissions = await this.queriesService.getTransm();
        var models = await this.queriesService.getModels();
        var types = await this.queriesService.getCarType();
        var man = await this.queriesService.getMan();

        return {
            "cities": cities,
            "wheel drives": wheelDrives,
            "engines": engines,
            "transmissions": transmissions,
            "models": models,
            "car types": types,
            "manufacturers": man,
            "ads": ads
        }
    }

    @Post('search')
    async searchBy(@Body()search: SearchModel){
        return this.queriesService.searchBy(search);
    }

    



    
}
