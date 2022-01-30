import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoinMarketCapController } from './coin-market-cap.controller';
import { CoinMarketCapService } from './coin-market-cap.service';

@Module({
  imports: [HttpModule],
  controllers: [CoinMarketCapController],
  providers: [CoinMarketCapService],
})
export class CoinMarketCapModule {}
