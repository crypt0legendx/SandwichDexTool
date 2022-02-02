import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap.service';

@Controller('coin-market-cap')
export class CoinMarketCapController {
  constructor(private coinMarketCapService: CoinMarketCapService) {}

  @Get('/trending')
  async getTrending(@Res() res, @Req() req) {    
    const trendins = await this.coinMarketCapService.getTrending();
    return res.status(HttpStatus.OK).json(trendins);
  }

  // List coins filter by key
  @Get('/:chain')
  async getAllCoins(@Res() res, @Req() req) {
    const {chain} = req.params;
    const coins = await this.coinMarketCapService.getAll(chain);
    return res.status(HttpStatus.OK).json(coins);
  }

  @Get('/coins/:symbol')
  async getCoinsbySymbol(@Res() res, @Req() req) {
    const {symbol} =  req.params;
    const coins = await this.coinMarketCapService.getCoinInfoBySysmbol(symbol);
    return res.status(HttpStatus.OK).json(coins);
  }

  
}
