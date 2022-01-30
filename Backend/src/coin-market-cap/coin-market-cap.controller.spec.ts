import { Test, TestingModule } from '@nestjs/testing';
import { CoinMarketCapController } from './coin-market-cap.controller';

describe('CoinMarketCapController', () => {
  let controller: CoinMarketCapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoinMarketCapController],
    }).compile();

    controller = module.get<CoinMarketCapController>(CoinMarketCapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
