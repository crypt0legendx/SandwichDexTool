import { Test, TestingModule } from '@nestjs/testing';
import { BitqueryService } from './bitquery.service';

describe('BitqueryService', () => {
  let service: BitqueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitqueryService],
    }).compile();

    service = module.get<BitqueryService>(BitqueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
