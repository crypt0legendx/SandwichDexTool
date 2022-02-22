import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThirdApiService {

    constructor(
        private httpService: HttpService
    ){}

    /**
     * get Presale Tokens
     */
    async getPresaleTokens(){
        const response = await this.fetchPresaleTokens();
        return response;
    }

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
    async getBalancesOverview(chain:String, account:String, limit){
        const response =  await this.fetchBalancesOverview(chain, account, limit);
        return response;
    }

    /**
     * get defi assets from third api
     * @param chain 
     * @param account 
     * @returns 
     */
    async getDefiAssets(chain:String, account:String){
        const response =  await this.fetchDefiAssets(chain, account);
        return response;
    }

    /**
     * Return Presale Tokens
     * @returns 
     */
     async fetchPresaleTokens(){
        let request;
        try {
        request = await this.httpService
            .get(`https://sandwich.network/php/projects.php`, {
            params: {
                net:56,
                _:1645521969830
            },
            })
            .toPromise();
        } catch (err) {
        console.error(err);
        }
        // console.log(request.data);
        return request.data || [];
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
     async fetchBalancesOverview(chain:String, account:String, limit){
        let request;
        let params ={};
        if(limit != "all"){
            params = {
                protocol:chain.toLowerCase(),
                limit:limit,
                fiat:"USD"
            }
        }else{
            params = {
                protocol:chain.toLowerCase(),
                fiat:"USD"
            }
        }
        try {
        request = await this.httpService
            .get(`https://dappradar.com/apiv3/wallet/overview/${account}`, {
            headers: { 'User-Agent': 'third-api' },
            params: params,
            })
            .toPromise();
        } catch (err) {
        console.error(err);
        }
        return request.data?.data || {};
    }

    /**
     * Return Defi Assets of account on chain
     * @param chain 
     * @param account 
     * @returns 
     */
     async fetchDefiAssets(chain:String, account:String){
        let request;
        try {
        request = await this.httpService
            .get(`https://dappradar.com/apiv3/wallet/defi/assets/${chain}/${account}`, {
            headers: { 'User-Agent': 'third-api' },
            params: {
                embed:"all",
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
