import { Test, TestingModule } from '@nestjs/testing';
import { PolygonscanApiController } from './polygonscan-api.controller';

describe('PolygonscanApiController', () => {
  let controller: PolygonscanApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PolygonscanApiController],
    }).compile();

    controller = module.get<PolygonscanApiController>(PolygonscanApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
