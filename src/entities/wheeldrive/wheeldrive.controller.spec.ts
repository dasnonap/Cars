import { Test, TestingModule } from '@nestjs/testing';
import { WheeldriveController } from './wheeldrive.controller';

describe('Wheeldrive Controller', () => {
  let controller: WheeldriveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WheeldriveController],
    }).compile();

    controller = module.get<WheeldriveController>(WheeldriveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
