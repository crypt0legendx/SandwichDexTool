import { Test, TestingModule } from '@nestjs/testing';
import { MultiChainCapController } from './multi-chain-cap.controller';

describe('MultiChainCapController', () => {
  let controller: MultiChainCapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MultiChainCapController],
    }).compile();

    controller = module.get<MultiChainCapController>(MultiChainCapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
