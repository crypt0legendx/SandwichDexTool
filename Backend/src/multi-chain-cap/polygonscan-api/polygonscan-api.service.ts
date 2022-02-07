import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PolygonscanApiService {

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
            .get('https://polygonscan.com/tokens', {
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
