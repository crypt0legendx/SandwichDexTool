import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThirdApiService {

    constructor(
        private httpService: HttpService
    ){}

    
    /**
     * get holdings info.
     * @param chain 
     * @param account 
     * @returns 
     */
    async getHoldings(chain:String, account:String){
        const response = await this.fetchHoldings(chain, account);
        return response;
    }
    /**
     * get doiminant token and tokens list from third api
     * @param chain 
     * @param account 
     * @returns 
     */
    async getBalancesOverview(chain:String, account:String){
        const response =  await this.fetchBalancesOverview(chain, account);
        return response;
    }

    /**
     * Return Holdings and Worth of account on chain
     * @param chain 
     * @param account 
     * @returns 
     */
     async fetchHoldings(chain:String, account:String){
        let request;
        try {
        request = await this.httpService
            .get(`https://dappradar.com/apiv3/wallet/holdings/${account}`, {
            headers: { 'User-Agent': 'third-api' },
            params: {
                protocol:chain.toLowerCase(),
                fiat:"USD"
            },
            })
            .toPromise();
        } catch (err) {
        console.error(err);
        }
        return request.data?.data || {};
    }

    /**
     * Return Balance List of account on chain
     * @param chain 
     * @param account 
     * @returns 
     */
     async fetchBalancesOverview(chain:String, account:String){
        let request;
        try {
        request = await this.httpService
            .get(`https://dappradar.com/apiv3/wallet/overview/${account}`, {
            headers: { 'User-Agent': 'third-api' },
            params: {
                protocol:chain.toLowerCase(),
                limit:5,
                fiat:"USD"
            },
            })
            .toPromise();
        } catch (err) {
        console.error(err);
        }
        return request.data?.data || {};
    }

    

}
