import { Test, TestingModule } from '@nestjs/testing';
import { AccountServiceController } from './account-service.controller';

describe('AccountService Controller', () => {
  let controller: AccountServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountServiceController],
    }).compile();

    controller = module.get<AccountServiceController>(AccountServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
