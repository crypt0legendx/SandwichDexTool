import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoinMarketCapService {
  private url = `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/listings/latest`;
  private apiKey = process.env.COINMARKETCAP_APIKEY;

  constructor(private httpService: HttpService) {}
  /*
   * Servicio de listado de precio de criptomonedas por default 'BTC,ETH'
   */
  async getAll() {
    const coins = await this.fetchCoins();

    const listCoins = Object.keys(coins);
    return listCoins.map((k) => ({
      id:coins[k].id,
      name: coins[k].name,
      symbol: coins[k].symbol,
      price: coins[k].quote?.USD?.price,
      volume_24h:coins[k].quote?.USD?.volume_24h,
      percent_change_24h:coins[k].quote?.USD?.percent_change_24h,
      percent_change_7d:coins[k].quote?.USD?.percent_change_24h,
      market_cap:coins[k].quote?.USD?.market_cap,      
    }));
  }

  async getCoinInfoBySysmbol(symbol = "BTC"){
    const coins =  await this.fetchCoinBySymbol(symbol);
    const listCoins = Object.keys(coins);
    return listCoins.map((k) => ({
      id:coins[k].id,
      name: coins[k].name,
      symbol: coins[k].symbol,
      price: coins[k].quote?.USD?.price,
      volume_24h:coins[k].quote?.USD?.volume_24h,
      percent_change_24h:coins[k].quote?.USD?.percent_change_24h,
      percent_change_7d:coins[k].quote?.USD?.percent_change_24h,
      market_cap:coins[k].quote?.USD?.market_cap,      
      quote:coins[k].quote?.USD

    }));
  }

  async getTrending(symbol = 'BTC,ETH,SOL') {
    console.log("trending");
    const trendings = await this.fetchTrendings();

    const listCoins = Object.keys(trendings);
    return listCoins.map((k) => ({
      name: trendings[k].name,
    }));
  }


  private async fetchCoins(): Promise<any> {
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

  private async fetchCoinBySymbol(symbol): Promise<any> {
    let request;
    try {
      request = await this.httpService
        .get(`${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/quotes/latest`, {
          headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
          params: {symbol:symbol},
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || {};
  }

  private async fetchTrendings(): Promise<any> {
    let request;
    try {
      request = await this.httpService
        .get(`${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/trending/latest`, {
          headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || {};
  }
}



