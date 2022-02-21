import { Controller, Get, Res, Req, HttpStatus } from '@nestjs/common';
import { CoinMarketCapService } from './coin-market-cap.service';

@Controller('coin-market-cap')
export class CoinMarketCapController {
  constructor(private coinMarketCapService: CoinMarketCapService) {}

  /**
   * Return Global Metrics from CMC.
   * @param res 
   * @param req 
   * @returns
   */
  @Get('/global-metrics')
  async getGlobalMetrics(@Res() res, @Req() req) {
    const metrics = await this.coinMarketCapService.getGlobalMetrics();
    return res.status(HttpStatus.OK).json(metrics);
  }

  /**
   * Return ranking list for certain chain from CMC.
   * @param res 
   * @param req 
   * @returns
   */
  @Get('/ranking/:chain')
  async getRanking(@Res() res, @Req() req) {
    const {chain} = req.params;
    const coins = await this.coinMarketCapService.getRankingByChain(chain);
    return res.status(HttpStatus.OK).json(coins);
  }

  /**
   * Return Trending List from CMC
   * @param res 
   * @param req 
   * @returns 
   */
  @Get('/trending')
  async getTrending(@Res() res, @Req() req) {    
    const trendins = await this.coinMarketCapService.getTrending();
    return res.status(HttpStatus.OK).json(trendins);
  }

  /**
   * Return Biggest Gainers and Losers from CMC
   * @param res 
   * @param req 
   * @returns 
   */
   @Get('/gainers-losers')
   async getGainersLosers(@Res() res, @Req() req) {    
     const gainers_losers = await this.coinMarketCapService.getGainersLosers();
     return res.status(HttpStatus.OK).json(gainers_losers);
   }


  /**
   * Return Token Detail Info for Symbol from CMC.
   * @param res 
   * @param req 
   * @returns 
   */
  @Get('/token/:symbol')
  async getTokenInfobySymbol(@Res() res, @Req() req) {
    console.log('cmc/token/:symbol');
    const {symbol} =  req.params;
    const tokens = await this.coinMarketCapService.getTokenInfoBySymbol(symbol);
    return res.status(HttpStatus.OK).json(tokens);
  }

  
}
