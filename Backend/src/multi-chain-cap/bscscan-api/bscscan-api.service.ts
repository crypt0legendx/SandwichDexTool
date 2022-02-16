import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BscscanApiService {

    private url = process.env.BSCSCAN_URL;
    private apiKey = process.env.BSCSCAN_APIKEY;

    constructor(
        private httpService:HttpService
    ){}

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
            return request.data;
        } catch (err) {
          console.error(err);
          return [];
        }
        
    }

    async searchTokens(searchText:String){
      const response = await this.searchTokensFromScan(searchText);
      return response;
    }
    
    private async searchTokensFromScan(searchText:String): Promise<any> {

      console.log('bscscan Search');
      let request;
      
      request = await this.httpService
          .get('https://bscscan.com/searchHandler', {
          params: { 
              term:searchText,
              filterby:0
          },
          })
          .toPromise();
      return request.data;

    }
}
