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
  @Get('/tradebook')
  async getTradeBook(@Res() res, @Req() req) {    
    const trade_data = await this.bitqueryService.getTradeBook();
    return res.status(HttpStatus.OK).json(trade_data);
  }

}
