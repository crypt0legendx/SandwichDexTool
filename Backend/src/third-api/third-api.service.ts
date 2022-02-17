import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThirdApiService {

    constructor(
        private httpService: HttpService
    ){}
    async getBalancesOverview(chain:String, account:String){
        const response =  await this.fetchBalancesOverview(chain, account);
        return response;

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
