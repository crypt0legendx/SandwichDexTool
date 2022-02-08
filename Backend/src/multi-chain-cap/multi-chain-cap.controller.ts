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
    

    @Get('/toptokens/:network')
    async getTopTokens(@Res() res, @Req() req){
        const {network} = req.params;
        let tokenList=[];
        if(network=="Ethereum"){
            tokenList = await this.etherscanApiService.getTopTokens();
        }
        if(network=="BSC"){
            tokenList = await this.bscscanApiService.getTopTokens();
        }
        if(network=="Polygon"){
            tokenList = await this.polygonscanApiService.getTopTokens();
        }
        
        return res.status(HttpStatus.OK).json(tokenList);
    }

    @Get('/tradebook/:network/:contractAddress')
    async getTradeBook(@Res() res, @Req() req){
        const {network, contractAddress} = req.params;
        let tradelist=[];
        if(network=="Ethereum"){
            tradelist = await this.etherscanApiService.getTradeBook(contractAddress);
        }
        if(network=="BSC"){
            tradelist = await this.bscscanApiService.getTradeBook(contractAddress);
        }
        if(network=="Polygon"){
            tradelist = await this.polygonscanApiService.getTradeBook(contractAddress);
        }
            
        return res.status(HttpStatus.OK).json(tradelist);
    }


    @Get('/tokenInfo/:network/:symbol')
    async getTokenInfoBySymbol(@Res() res, @Req() req) {
        const {network, symbol} =  req.params;
    }

}
