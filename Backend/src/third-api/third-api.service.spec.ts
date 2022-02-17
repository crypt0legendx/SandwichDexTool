import { Test, TestingModule } from '@nestjs/testing';
import { ThirdApiService } from './third-api.service';

describe('ThirdApiService', () => {
  let service: ThirdApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThirdApiService],
    }).compile();

    service = module.get<ThirdApiService>(ThirdApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
