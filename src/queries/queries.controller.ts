import { Controller, Get, Post, Body } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { SearchModel } from 'src/DTO/search.model';
import * as fs from 'fs-extra';
import { Advertisments } from 'src/entities/advertisments/advertisments.entity';
import { AddUserOptions } from 'typeorm';

@Controller('queries')
export class QueriesController {
    constructor(private queriesService: QueriesService){}

    @Get('ads')
    async getAds(){
        return await this.queriesService.getAds(false);
        
    }

    @Get('all')
    async getAllData(){
        var cities = await this.queriesService.getCities();
        var ads= await this.queriesService.getAds(false);
        var wheelDrives = await this.queriesService.getWheel();
        var engines = await this.queriesService.getEngines();
        var transmissions = await this.queriesService.getTransm();
        var models = await this.queriesService.getModels();
        var types = await this.queriesService.getCarType();
        var man = await this.queriesService.getMan();
        
        var arrayUrls: any[] = new Array(0);

        ads.forEach(ad => {
            var urls: string[] = new Array(0);
            const files = fs.readdirSync(ad.photos);

            files.forEach(file => {
                urls.push('localhost:3000/img/' + file)
            });

            arrayUrls.push({
                'id': ad.adID,
                'urls': urls
            })
        });

       
       
        
       return {
            "cities": cities,
            "wheel drives": wheelDrives,
            "engines": engines,
            "transmissions": transmissions,
            "models": models,
            "car types": types,
            "manufacturers": man,
            "ads": ads,
            "adsUrls": arrayUrls
        }
    }

    @Post('search')
    async searchBy(@Body()search: SearchModel){
        return this.queriesService.searchBy(search);
    }

    



    
}
