import { Test, TestingModule } from '@nestjs/testing';
import { BscscanApiService } from './bscscan-api.service';

describe('BscscanApiService', () => {
  let service: BscscanApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BscscanApiService],
    }).compile();

    service = module.get<BscscanApiService>(BscscanApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
