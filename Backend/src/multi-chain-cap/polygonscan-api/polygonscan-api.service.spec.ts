import { Test, TestingModule } from '@nestjs/testing';
import { PolygonscanApiService } from './polygonscan-api.service';

describe('PolygonscanApiService', () => {
  let service: PolygonscanApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PolygonscanApiService],
    }).compile();

    service = module.get<PolygonscanApiService>(PolygonscanApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
