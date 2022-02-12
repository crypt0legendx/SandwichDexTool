import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoinMarketCapModule } from './coin-market-cap/coin-market-cap.module';
import { MultiChainCapModule } from './multi-chain-cap/multi-chain-cap.module';
import { BitqueryModule } from './bitquery/bitquery.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',

    }),
    CoinMarketCapModule, 
    MultiChainCapModule, 
    BitqueryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
