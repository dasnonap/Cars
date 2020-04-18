import { Test, TestingModule } from '@nestjs/testing';
import { EngineTypeController } from './engine-type.controller';

describe('EngineType Controller', () => {
  let controller: EngineTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EngineTypeController],
    }).compile();

    controller = module.get<EngineTypeController>(EngineTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
