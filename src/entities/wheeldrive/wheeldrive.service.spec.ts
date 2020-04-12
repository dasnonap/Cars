import { Test, TestingModule } from '@nestjs/testing';
import { WheeldriveService } from './wheeldrive.service';

describe('WheeldriveService', () => {
  let service: WheeldriveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WheeldriveService],
    }).compile();

    service = module.get<WheeldriveService>(WheeldriveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
