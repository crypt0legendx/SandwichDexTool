import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { BscscanApiModule } from './bscscan-api/bscscan-api.module';
import { EtherscanApiModule } from './etherscan-api/etherscan-api.module';
import { PolygonscanApiModule } from './polygonscan-api/polygonscan-api.module';

@Module({
  imports: [ConfigModule.forRoot(), CoinMarketCapModule, BscscanApiModule, EtherscanApiModule, PolygonscanApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
