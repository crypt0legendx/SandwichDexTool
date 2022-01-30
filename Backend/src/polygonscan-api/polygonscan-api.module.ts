import { Module } from '@nestjs/common';
import { PolygonscanApiController } from './polygonscan-api.controller';
import { PolygonscanApiService } from './polygonscan-api.service';

@Module({
  controllers: [PolygonscanApiController],
  providers: [PolygonscanApiService]
})
export class PolygonscanApiModule {}
