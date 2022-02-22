import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ThirdApiService } from './third-api.service';

@Controller('third-api')
export class ThirdApiController {

    constructor(
        private thirdApiService: ThirdApiService
    ){}

    /**
    * Returns Presale Token List
    *
     */
    @Get('/presale-tokens')
    async getPresaleTokens(@Res() res, @Req() req){
        console.log('third-api/presale-tokens');
        const presaleTokens = await this.thirdApiService.getPresaleTokens();
        return res.status(HttpStatus.OK).json(presaleTokens);
    }
    /**
     * Return Balance List of Account from third api
     * @param res 
     * @param req 
     * @returns 
     */
     @Get('/holdings-account/:chain/:address')
     async getHoldings(@Res() res, @Req() req){
         console.log('third-api/holdings-account');
         const {chain, address} =  req.params;
         const holdings = await this.thirdApiService.getHoldings(chain, address);
         return res.status(HttpStatus.OK).json(holdings);
     }

    /**
     * Return Balance List of Account from third api
     * @param res 
     * @param req 
     * @returns 
     */
     @Get('/balances-overview/:chain/:address/:limit')
     async getBalancesOverview(@Res() res, @Req() req){
         console.log('third-api/balances');
         const {chain, address, limit} =  req.params;
         const balances = await this.thirdApiService.getBalancesOverview(chain, address, limit);
         return res.status(HttpStatus.OK).json(balances);
     }  

    /**
     * Return Defi assets of Account from third api
     * @param res 
     * @param req 
     * @returns 
     */
    @Get('/defi-assets/:chain/:address')
    async getDefiAssets(@Res() res, @Req() req){
         console.log('third-api/defi-assets');
         const {chain, address} =  req.params;
         const defiAssets = await this.thirdApiService.getDefiAssets(chain, address);
         return res.status(HttpStatus.OK).json(defiAssets);
     }  
}
