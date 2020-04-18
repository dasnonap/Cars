import { Test, TestingModule } from '@nestjs/testing';
import { TransTypeController } from './trans-type.controller';

describe('TransType Controller', () => {
  let controller: TransTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransTypeController],
    }).compile();

    controller = module.get<TransTypeController>(TransTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
