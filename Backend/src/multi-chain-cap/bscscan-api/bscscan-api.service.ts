import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BscscanApiService {

    private url = `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/listings/latest`;
    private apiKey = process.env.BSCSCAN_APIKEY;

    constructor(
        private httpService:HttpService
    ){}

    async getLargestTokens(){
        const tokens = await this.fetchLargestTokens();

        const listCoins = Object.keys(tokens);
        return listCoins.map((k) => ({
          id:tokens[k].id,
          name: tokens[k].name,
          symbol: tokens[k].symbol,
          price: tokens[k].quote?.USD?.price,
          volume_24h:tokens[k].quote?.USD?.volume_24h,
          percent_change_24h:tokens[k].quote?.USD?.percent_change_24h,
          percent_change_7d:tokens[k].quote?.USD?.percent_change_24h,
          market_cap:tokens[k].quote?.USD?.market_cap,      
        }));
    }

    private async fetchLargestTokens(): Promise<any> {
        let request;
        try {
          request = await this.httpService
            .get(this.url, {
              headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
              params: { start:1, limit:20 },
            })
            .toPromise();
        } catch (err) {
          console.error(err);
        }
        return request?.data?.data || {};
      }
}
