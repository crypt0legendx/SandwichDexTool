import { Test, TestingModule } from '@nestjs/testing';
import { BitqueryController } from './bitquery.controller';

describe('BitqueryController', () => {
  let controller: BitqueryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BitqueryController],
    }).compile();

    controller = module.get<BitqueryController>(BitqueryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
