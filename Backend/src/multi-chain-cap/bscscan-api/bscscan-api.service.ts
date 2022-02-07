import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BscscanApiService {

    private url = process.env.BSCSCAN_URL;
    private apiKey = process.env.BSCSCAN_APIKEY;

    constructor(
        private httpService:HttpService
    ){}

    async getTradeBook(contractAddress){
      const tradebook =  await this.fetchTradeBook(contractAddress);
      return tradebook.result;
    }

    async getTopTokens(){
      const html = await this.fetchTopTokens();
      return html
    }


    private async fetchTopTokens(): Promise<any> {
      let request;
        try {
          request = await this.httpService
            .get('https://bscscan.com/tokens', {
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

    private async fetchTradeBook(contractAddress): Promise<any> {
      
        let request;
        try {
          request = await this.httpService
            .get(this.url, {
              params: { 
                module:'account',
                action:'tokentx',
                contractaddress:`${contractAddress}`,
                page:1,
                offset:10,
                startblock:0,
                endblock:99999999,
                sort:'desc',
                apikey:this.apiKey
              },
            })
            .toPromise();
        } catch (err) {
          console.error(err);
        }
        return request.data || {};
      }
}
