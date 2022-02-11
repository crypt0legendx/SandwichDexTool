import { Module } from '@nestjs/common';
import { BitqueryController } from './bitquery.controller';
import { BitqueryService } from './bitquery.service';
import { BitqueryResolver } from './bitquery.resolver';

@Module({
  controllers: [BitqueryController],
  providers: [BitqueryService, BitqueryResolver]
})
export class BitqueryModule {}
