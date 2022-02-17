import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { ThirdApiService } from './third-api.service';

@Controller('third-api')
export class ThirdApiController {

    constructor(
        private thirdApiService: ThirdApiService
    ){}

    /**
     * Return Balance List of Account from third api
     * @param res 
     * @param req 
     * @returns 
     */
     @Get('/balances-overview/:chain/:address')
     async getBalancesOverview(@Res() res, @Req() req){
         console.log('third-api/balances');
         const {chain, address} =  req.params;
         const balances = await this.thirdApiService.getBalancesOverview(chain, address);
         return res.status(HttpStatus.OK).json(balances);
     }  
}
