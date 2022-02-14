import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { BitqueryService } from './bitquery.service';

@Controller('bitquery')
export class BitqueryController {

    constructor(
        private bitqueryService:BitqueryService
    ){}
    
   /**
   * Return Dex Trade Data from the Bitquery GraphQL
   * @param res 
   * @param req 
   * @returns 
   */
  @Get('/tradebook/:chain/:address')
  async getTradeBook(@Res() res, @Req() req) {    
    console.log('bitquery/tradebook');
    const {chain, address} =  req.params;
    const trade_data = await this.bitqueryService.getTradeBook(chain, address);
    return res.status(HttpStatus.OK).json(trade_data);
  }

}
