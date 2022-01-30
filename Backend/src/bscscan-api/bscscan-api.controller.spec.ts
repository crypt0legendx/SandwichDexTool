import { Test, TestingModule } from '@nestjs/testing';
import { BscscanApiController } from './bscscan-api.controller';

describe('BscscanApiController', () => {
  let controller: BscscanApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BscscanApiController],
    }).compile();

    controller = module.get<BscscanApiController>(BscscanApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
