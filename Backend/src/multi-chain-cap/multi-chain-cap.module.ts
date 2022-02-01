import { Module } from '@nestjs/common';
import { MultiChainCapController } from './multi-chain-cap.controller';
import { EtherscanApiService } from './etherscan-api/etherscan-api.service';
import { BscscanApiService } from './bscscan-api/bscscan-api.service';
import { PolygonscanApiService } from './polygonscan-api/polygonscan-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [MultiChainCapController],
  providers: [EtherscanApiService, BscscanApiService, PolygonscanApiService]
})
export class MultiChainCapModule {}
