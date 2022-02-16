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
        console.log('toptokens');
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

    @Get('/search-tokens/:text')
    async searchTokens(@Res() res, @Req() req){
        console.log('toptokens');
        const {text} = req.params;
        let tokenList=[];
        const etherscanTokenList = await this.etherscanApiService.searchTokens(text);
        const bscscanTokenList = await this.bscscanApiService.searchTokens(text);
        const polygonTokenList = await this.polygonscanApiService.searchTokens(text);
        tokenList.push(etherscanTokenList, bscscanTokenList, polygonTokenList);

        return res.status(HttpStatus.OK).json(tokenList);
    }

    

}
