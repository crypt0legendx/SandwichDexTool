import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';

@Module({
  imports: [ConfigModule.forRoot(), CoinMarketCapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
