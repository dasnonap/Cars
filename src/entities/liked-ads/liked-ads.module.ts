import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liked_ads } from './liked-ads.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Liked_ads])],
    exports: [TypeOrmModule]
})
export class LikedAdsModule {}
