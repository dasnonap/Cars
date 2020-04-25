import { Controller, Get, Post, Body, UploadedFiles, UseInterceptors, Res } from '@nestjs/common';
import { AdvertismentsService } from './advertisments.service';

import { AdvertismentsModel } from 'src/DTO/advertisments.model';
import { FilesInterceptor } from '@nestjs/platform-express';


@Controller('advertisments')
export class AdvertismentsController {
    constructor(protected readonly adsService: AdvertismentsService){}

    @Get()
    findAll(){
        return this.adsService.findAll();
    }

    @Get('desc')
    async findOne(@Body('id')id: number, @Res() res, @Body('number')number: number){
        const row = await this.adsService.findWithID(id);
        
        
        return res.sendFile(row.adID + '_' + number + '.jpg', {root: row.photos});
    }
    @Get('ad')
    async findAdWithDesc(@Body()ad: AdvertismentsModel, @Res() res ){
        const row = await this.adsService.findIDByDesc(ad.desc);
    
    }

    @Post()
    async insert(@Body()ad: AdvertismentsModel){
        this.adsService.insert(ad);
    }

    @Post('upload')
    @UseInterceptors(
        FilesInterceptor('image', 20)
    )
    async findWithDesc(@Body()ad: AdvertismentsModel, @UploadedFiles() files){
        const row = await this.adsService.findIDByDesc(ad.desc);
       
        ad.id = row.adID;
        ad.photos = 'F:/ads/ad' + ad.id + '/photos/';

       return  this.adsService.updateAd(ad, files);

             
    }
}
