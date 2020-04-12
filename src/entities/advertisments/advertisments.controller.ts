import { Controller, Get } from '@nestjs/common';
import { AdvertismentsService } from './advertisments.service';
import { Advertisments } from './advertisments.entity';

@Controller('advertisments')
export class AdvertismentsController {
    constructor(protected readonly adsService: AdvertismentsService){}

    @Get()
    findAll(): Promise<Advertisments[]>{
        return this.adsService.findAll();
    }
}
