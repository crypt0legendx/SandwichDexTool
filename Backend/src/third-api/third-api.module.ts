import { Module } from '@nestjs/common';
import { ThirdApiService } from './third-api.service';
import { ThirdApiController } from './third-api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[
    HttpModule
  ],
  providers: [ThirdApiService],
  controllers: [ThirdApiController]
})
export class ThirdApiModule {


}
