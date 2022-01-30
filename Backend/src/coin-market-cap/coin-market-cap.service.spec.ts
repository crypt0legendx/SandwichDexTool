import { Test, TestingModule } from '@nestjs/testing';
import { CoinMarketCapService } from './coin-market-cap.service';

describe('CoinMarketCapService', () => {
  let service: CoinMarketCapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoinMarketCapService],
    }).compile();

    service = module.get<CoinMarketCapService>(CoinMarketCapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
