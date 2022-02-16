import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PolygonscanApiService {

    private url = process.env.POLYGONSCAN_URL;
    private apiKey = process.env.POLYGONSCAN_APIKEY;

    constructor(
        private httpService: HttpService
    ){}

    async getTopTokens(){
        const html = await this.fetchTopTokens();
        return html
    }
  
  
    private async fetchTopTokens(): Promise<any> {
        let request;
        request = await this.httpService
            .get('https://polygonscan.com/tokens', {
            params: { 
                p:1,
            },
            })
            .toPromise();
        return request.data||{};
    }

    async searchTokens(searchText:String){
        const response = await this.searchTokensFromScan(searchText);
        return response;
      }
      
      private async searchTokensFromScan(searchText:String): Promise<any> {
  
        console.log('polygonscan Search');
        let request;
        
        request = await this.httpService
            .get('https://polygonscan.com/searchHandler', {
            params: { 
                term:searchText,
                filterby:0
            },
            })
            .toPromise();
        return request.data;
  
      }

}
