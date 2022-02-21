import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoinMarketCapService {
  private url = `${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/listings/latest`;
  private apiKey = process.env.CMC_APIKEY;

  constructor(private httpService: HttpService) {}
  
  /**
   * return global metrics such as global market cap, etc.
   */
  async getGlobalMetrics(){
      const global_metrics =  await this.fetchGlobalMetrics();
      return global_metrics;
  }

  async fetchGlobalMetrics(){
    let request;
    try {
      request = await this.httpService
        .get(`${process.env.COINMARKETCAP_URL}/v1/global-metrics/quotes/latest`, {
          headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || {};    
  }

  /**
   * Return the Ranking List by certain chain.
   * @param chain 
   * @returns 
   */
  async getRankingByChain(chain:String) {
    const crypto_req =  await this.fetchRankingByChain(chain);
    const coins =  crypto_req.cryptoCurrencyList;

    const listCoins = Object.keys(coins);
    return listCoins.map((k) => ({
      id:coins[k].id,
      name: coins[k].name,
      symbol: coins[k].symbol,
      price: coins[k].quotes[0].price,
      volume_24h:coins[k].quotes[0].volume24h,
      percent_change_24h:coins[k].quotes[0].percentChange24h,
      percent_change_7d:coins[k].quotes[0].percentChange7d,
      market_cap:coins[k].quotes[0].marketCap,
      platform:coins[k].platform?.platform||{}      
    }));
  }

  /**
   * Fetch the Ranking List by certain chain using CMC API Key.
   * @param chain 
   * @returns 
   */

  private async fetchRankingByChain(chain:String): Promise<any> {
    let request;
    let platform = "ethereum-ecosystem";
    if(chain =="BSC")
      platform = "binance-smart-chain";
    else if(chain =="Polygon")
      platform = "polygon-ecosystem";
    try {
      request = await this.httpService
        .get('https://api.coinmarketcap.com/data-api/v3/cryptocurrency/listing', {
          params: { 
            start:1, 
            limit:20,
            sortBy:'market_cap',
            sortType:'desc',
            convert:'USD',
            cryptoType:'all',
            tagType:'all',
            audited:true,
            aux:"ath,atl,high24h,low24h,num_market_pairs,cmc_rank,date_added,max_supply,circulating_supply,total_supply,volume_7d,volume_30d,self_reported_circulating_supply,self_reported_market_cap,platform",
            tagSlugs:platform

          },
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || {};
  }

  /**
   * return the Token List By Symbol
   * @returns 
   */
  async getTokenInfoBySymbol(symbol = "BTC"){
    const coins =  await this.fetchTokenBySymbol(symbol);
    const listCoins = Object.keys(coins);
    return listCoins.map((k) => ({
      id:coins[k].id,
      name: coins[k].name,
      symbol: coins[k].symbol,
      price: coins[k].quote?.USD?.price,
      volume_24h:coins[k].quote?.USD?.volume_24h,
      percent_change_24h:coins[k].quote?.USD?.percent_change_24h,
      percent_change_7d:coins[k].quote?.USD?.percent_change_7d,
      market_cap:coins[k].quote?.USD?.market_cap,      
      quote:coins[k].quote?.USD

    }));
  }

  /**
   * fetch the Token List By Symbol
   * @returns 
   */
  private async fetchTokenBySymbol(symbol): Promise<any> {
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

  /**
   * Return the Trending List.
   * @returns 
   */
  async getTrending() {
    console.log("trending");
    const trendings = await this.fetchTrendings();

    const listCoins = Object.keys(trendings);
    return listCoins.map((k) => ({
      id:trendings[k].id,
      name: trendings[k].name,
      symbol: trendings[k].symbol,
      price: trendings[k].quote?.USD?.price,
      volume_24h:trendings[k].quote?.USD?.volume_24h,
      percent_change_24h:trendings[k].quote?.USD?.percent_change_24h,
      percent_change_7d:trendings[k].quote?.USD?.percent_change_7d,
      market_cap:trendings[k].quote?.USD?.market_cap,      
      quote:trendings[k].quote?.USD,
      platform:trendings[k].platform
    }));
  }


  /**
   * Fetch the Trending using CMC Paid API Key.
   * @returns 
   */
  private async fetchTrendings(): Promise<any> {
    let request;
    try {
      request = await this.httpService
        .get(`${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/trending/latest`, {
          headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
          params: { 
            start:1, 
            limit:200,
          }
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || [];
  }

  /**
   * Return the Gainers and Losers List.
   * @returns 
   */
   async getGainersLosers() {
    console.log("gainers_losers");
    const gainers_data = await this.fetchGainers();
    const losers_data= await this.fetchLosers();
    let gainers_chain;
    let losers_chain;

    let listGainerCoins = Object.keys(gainers_data);
    let listLoserCoins = Object.keys(losers_data);

    gainers_chain = listGainerCoins.map((k) => {
        
          return {
            id:gainers_data[k].id,
            name: gainers_data[k].name,
            symbol: gainers_data[k].symbol,
            price: gainers_data[k].quote?.USD?.price,
            volume_24h:gainers_data[k].quote?.USD?.volume_24h,
            percent_change_24h:gainers_data[k].quote?.USD?.percent_change_24h,
            percent_change_7d:gainers_data[k].quote?.USD?.percent_change_7d,
            market_cap:gainers_data[k].quote?.USD?.market_cap,      
            quote:gainers_data[k].quote?.USD,
            platform:gainers_data[k].platform
        }
           
  });

  losers_chain = listLoserCoins.map((k) => {
    
      return {
        id:losers_data[k].id,
        name: losers_data[k].name,
        symbol: losers_data[k].symbol,
        price: losers_data[k].quote?.USD?.price,
        volume_24h:losers_data[k].quote?.USD?.volume_24h,
        percent_change_24h:losers_data[k].quote?.USD?.percent_change_24h,
        percent_change_7d:losers_data[k].quote?.USD?.percent_change_7d,
        market_cap:losers_data[k].quote?.USD?.market_cap,      
        quote:losers_data[k].quote?.USD,
        platform:losers_data[k].platform
    
  }      
});

    return {gainers:gainers_chain, losers:losers_chain}
  }


  /**
   * Fetch the Gainers and Losers List. using CMC Paid API Key.
   * @returns 
   */
  private async fetchGainers(): Promise<any> {
    let request;
    try {
      request = await this.httpService
        .get(`${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/trending/gainers-losers`, {
          headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
          params: { 
            start:1, 
            limit:200,
            sort_dir:'desc'
          }
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || [];
  }

  /**
   * Fetch the Gainers and Losers List. using CMC Paid API Key.
   * @returns 
   */
   private async fetchLosers(): Promise<any> {
    let request;
    try {
      request = await this.httpService
        .get(`${process.env.COINMARKETCAP_URL}/v1/cryptocurrency/trending/gainers-losers`, {
          headers: { 'X-CMC_PRO_API_KEY': this.apiKey },
          params: { 
            start:1, 
            limit:200,
            sort_dir:'asc'
          }
        })
        .toPromise();
    } catch (err) {
      console.error(err);
    }
    return request?.data?.data || [];
  }
}



  




