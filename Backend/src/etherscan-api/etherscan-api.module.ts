import { Module } from '@nestjs/common';
import { EtherscanApiController } from './etherscan-api.controller';
import { EtherscanApiService } from './etherscan-api.service';

@Module({
  controllers: [EtherscanApiController],
  providers: [EtherscanApiService]
})
export class EtherscanApiModule {}
