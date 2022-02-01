import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EtherscanApiService {
    private url = process.env.ETHERSCAN_URL;
    private apiKey = process.env.ETHERSCAN_APIKEY;

    constructor(
        private httpService: HttpService
    ){}

    async getLargestTokens(){
        const tokens = await this.fetchLargestTokens();

        const listCoins = Object.keys(tokens);
        console.log(tokens);
        return [];
    }

    private async fetchLargestTokens(): Promise<any> {
        let request;
        try {
          request = await this.httpService
            .get(this.url, {
              headers: {'module':'account','action':'tokentx', 'apikey': this.apiKey }
            })
            .toPromise();
        } catch (err) {
          console.error(err);
        }
        return request?.data?.data || {};
      }
}
