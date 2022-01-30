import { Test, TestingModule } from '@nestjs/testing';
import { EtherscanApiController } from './etherscan-api.controller';

describe('EtherscanApiController', () => {
  let controller: EtherscanApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EtherscanApiController],
    }).compile();

    controller = module.get<EtherscanApiController>(EtherscanApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
