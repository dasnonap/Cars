import { Test, TestingModule } from '@nestjs/testing';
import { LikedAdsService } from './liked-ads.service';

describe('LikedAdsService', () => {
  let service: LikedAdsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LikedAdsService],
    }).compile();

    service = module.get<LikedAdsService>(LikedAdsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
