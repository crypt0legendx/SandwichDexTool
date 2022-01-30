import { Module } from '@nestjs/common';
import { BscscanApiController } from './bscscan-api.controller';
import { BscscanApiService } from './bscscan-api.service';

@Module({
  controllers: [BscscanApiController],
  providers: [BscscanApiService]
})
export class BscscanApiModule {}
