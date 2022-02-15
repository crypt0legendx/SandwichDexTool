import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { BitqueryService } from './bitquery.service';

@Controller('bitquery')
export class BitqueryController {

    constructor(
        private bitqueryService:BitqueryService
    ){}


    /**
     * get Token Detail Info includes price and 24h volume, etc.
     * @param res 
     * @param req 
     * @returns 
     */
    @Get('/tokeninfo/:chain/:address')
    async getTokenInfo(@Res() res, @Req() req) {    
        console.log('bitquery/tokenInfo');
        const {chain, address} =  req.params;
        const tokenInfo = await this.bitqueryService.getTokenInfo(chain, address);
        return res.status(HttpStatus.OK).json(tokenInfo);
    }
        
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

    /**
     * Return Dex Trade Data For Account.
     * @param res 
     * @param req 
     * @returns 
     */
    @Get('/tradebyAddress/:chain/:address/:account')
    async getTradeByAddress(@Res() res, @Req() req) {    
        console.log('bitquery/tradebyAddress');
        const {chain, address, account} =  req.params;
        const trade_data = await this.bitqueryService.getTradeByAddress(chain, address, account);
        return res.status(HttpStatus.OK).json(trade_data);
    }

  

}
