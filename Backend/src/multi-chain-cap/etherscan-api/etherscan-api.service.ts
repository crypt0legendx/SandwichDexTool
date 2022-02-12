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
        return html;
      }
  
  
    private async fetchTopTokens(): Promise<any> {
      console.log('fetch-top-tokens');
      let request;
      
      request = await this.httpService
          .get('https://etherscan.io/tokens', {
          params: { 
              p:1,
          },
          })
          .toPromise();
      return request.data;
        
        
    }

    async getTradeBook(contractAddress){
        const tradebook =  await this.fetchTradeBook(contractAddress);
        return tradebook.result;
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