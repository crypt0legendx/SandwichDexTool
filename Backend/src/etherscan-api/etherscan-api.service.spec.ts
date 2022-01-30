import { Test, TestingModule } from '@nestjs/testing';
import { EtherscanApiService } from './etherscan-api.service';

describe('EtherscanApiService', () => {
  let service: EtherscanApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EtherscanApiService],
    }).compile();

    service = module.get<EtherscanApiService>(EtherscanApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
