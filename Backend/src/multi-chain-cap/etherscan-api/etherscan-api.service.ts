import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EtherscanApiService {
    private url = process.env.ETHERSCAN_URL;
    private apiKey = process.env.ETHERSCAN_APIKEY;

    constructor(
        private httpService: HttpService
    ){}

    async getTopTokens(){
        const html = await this.fetchTopTokens();
        return html
      }
  
  
      private async fetchTopTokens(): Promise<any> {
        let request;
        try {
        request = await this.httpService
            .get('https://etherscan.io/tokens', {
            params: { 
                p:1,
            },
            })
            .toPromise();
        } catch (err) {
        console.error(err);
        }
        return request.data || {};
    }

}
