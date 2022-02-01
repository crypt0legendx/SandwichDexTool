import { Controller, Get, HttpStatus, Req, Res } from '@nestjs/common';
import { BscscanApiService } from './bscscan-api/bscscan-api.service';
import { EtherscanApiService } from './etherscan-api/etherscan-api.service';
import { PolygonscanApiService } from './polygonscan-api/polygonscan-api.service';

@Controller('multi-chain-cap')
export class MultiChainCapController {

    constructor(
        private etherscanApiService:EtherscanApiService,
        private bscscanApiService:BscscanApiService,
        private polygonscanApiService:PolygonscanApiService
    ){}
    
    @Get('/trending/:network')
    async getTrending(@Res() res, @Req() req) {    
        const {network} =  req.params;
    }

    // List coins filter by key
    @Get('/largest/:network')
    async getLargestTokens(@Res() res, @Req() req) {
        const {network} =  req.params;
        if(network == "Ethereum"){
            const tokens = await this.etherscanApiService.getLargestTokens();
            return res.status(HttpStatus.OK).json(tokens);
        }
        if(network == "BSC"){
            const tokens = await this.bscscanApiService.getLargestTokens();
            return res.status(HttpStatus.OK).json(tokens);
        }
    }

    @Get('/tokenInfo/:network/:symbol')
    async getTokenInfoBySymbol(@Res() res, @Req() req) {
        const {network, symbol} =  req.params;
    }

}
