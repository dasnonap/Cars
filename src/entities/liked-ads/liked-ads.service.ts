import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Liked_ads } from './liked-ads.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikedAdsService {
    constructor(
        @InjectRepository(Liked_ads)
        private likedAdsRepo: Repository<Liked_ads>,
    ){}

    async findAll(): Promise<Liked_ads[]>{
        return this.likedAdsRepo.find();
    }

    findOne(id: number): Promise<Liked_ads>{
        return this.likedAdsRepo.findOne(id);
    }
}
