import { Test, TestingModule } from '@nestjs/testing';
import { BitqueryResolver } from './bitquery.resolver';

describe('BitqueryResolver', () => {
  let resolver: BitqueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BitqueryResolver],
    }).compile();

    resolver = module.get<BitqueryResolver>(BitqueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
