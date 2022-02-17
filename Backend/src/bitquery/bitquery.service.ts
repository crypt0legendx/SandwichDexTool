import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { request, gql, GraphQLClient } from 'graphql-request';

@Injectable()
export class BitqueryService {

    private GRAPH_API_BITQUERY = "https://graphql.bitquery.io";
    private client = new GraphQLClient(this.GRAPH_API_BITQUERY,{headers:{"X-API-KEY":"BQY5KsbTpW4whBdE1dO5F3T57lFtZkbK"}});

    constructor(
    
    ){}


    /**
     * Get Bitquery Ethereum Network Name For Human Network
     * @param chain 
     * @returns 
     */
    convertToBitqueryChain(chain: String){
        if(chain == "Ethereum")
         return "ethereum";
        if(chain == "BSC")
         return "bsc";
        if(chain == "Polygon")
         return "matic";
        return "";
    }


    /**
     * Get Stable Coin Address For Network
     * @param chain 
     * @returns 
     */
    getStableCoinAddressForChain(chain: String){
        if(chain == "Ethereum")//Ethereum Tether USDT Address
           return "0xdac17f958d2ee523a2206206994597c13d831ec7";
        if(chain == "BSC")//Binance USDC Address
            return "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"
        if(chain == "Polygon")// POS Tether USDT Address
            return "0xc2132d05d31c914a87c6611c10748aeb04b58e8f";

        return "";
    }

    async getTokenInfo(chain:String, address:String){
      const tradeQuery =gql`query ($network:EthereumNetwork!, $baseAddress:String!, $quoteAddress:String!){
        ethereum(network: $network) {
          dexTrades(
            options: {limit: 2, desc: "timeInterval.day"}
            date: {since:"2019-12-01"}
            baseCurrency: {is: $baseAddress}
            quoteCurrency: {is: $quoteAddress}
          ) {            
            timeInterval {
              day(count: 1)
            }
            baseCurrency {
              symbol
              address
            }
            volume: baseAmount
            tradeAmount(in: USD)
            quotePrice      
            maximum_price: quotePrice(calculate: maximum)
            minimum_price: quotePrice(calculate: minimum)  		
          }
        }
      }`;

      const variables={
          "network":this.convertToBitqueryChain(chain),
          baseAddress:address,
          quoteAddress:this.getStableCoinAddressForChain(chain)
      }
      const data = await this.client.request(tradeQuery, variables);
      
      return data;
    }

    /**
     * Get Trade Data of Specific Token
     * @param chain 
     * @param address 
     * @returns 
     */
    async getTradeBook(chain:String, address:String){
        const tradeQuery =gql`query ($network:EthereumNetwork!, $baseAddress:String!, $quoteAddress:String!){
            ethereum(network: $network) {
              dexTrades(
                options: {limit: 10, desc: "timeInterval.second"}
                date: {since: "2022-01-13"}
                baseCurrency: {is: $baseAddress}
                quoteCurrency: {is: $quoteAddress}
              ) {            
                protocol
                baseCurrency{
                  symbol
                }
                volume: baseAmount
                tradeAmount(in: USD)
                timeInterval {
                    second
                }
                block {
                    timestamp{
                      unixtime
                    }
                }
                quotePrice
              }
            }
          }`;

        const variables={
            "network":this.convertToBitqueryChain(chain),
            baseAddress:address,
            quoteAddress:this.getStableCoinAddressForChain(chain)
        }
        const data = await this.client.request(tradeQuery, variables);
        return data;
    }

    /**
     * Get Dex Trade Data For account.
     * @param chain 
     * @param address 
     * @param account 
     */
    async getTradeByAddress(chain:String, address:String, account:String){
        const tradeQuery =gql`query ($network:EthereumNetwork!, $baseAddress:String!, $quoteAddress:String!, $account:String!){
            ethereum(network: $network) {
              dexTrades(
                options: {limit: 10, desc: "timeInterval.second"}
                date: {since: "2022-01-13"}
                baseCurrency: {is: $baseAddress}
                quoteCurrency: {is: $quoteAddress}
                txSender: {is: $account}
              ) {            
                protocol
                baseCurrency{
                  symbol
                }
                volume: baseAmount
                tradeAmount(in: USD)
                timeInterval {
                    second
                }
                block {
                    timestamp{
                      unixtime
                    }
                }
                quotePrice
              }
            }
          }`;

        const variables={
            network:this.convertToBitqueryChain(chain),
            baseAddress:address,
            quoteAddress:this.getStableCoinAddressForChain(chain),
            account:account
        }
        const data = await this.client.request(tradeQuery, variables);
        return data;
    }

    getHolders(){

    }

    getLiquidity(){

    }


    async getBalances(chain:String, account:String){
      const response =  await this.fetchBalances(chain, account);
      const balances = response.ethereum.address[0].balances;

      if(balances == null){
        console.log("No Exist Data");
      }else{
          // await balances.forEach(async(e) => {
          //   if(e.currency.address!="-"){
          //     const getInfo = await this.getTokenInfo(chain, e.currency.address);
          //     console.log(getInfo);
          //   }
          // });
      }


      return response;

    }
    /**
     * Return Balance List of account on chain
     * @param chain 
     * @param account 
     * @returns 
     */
    async fetchBalances(chain:String, account:String){
      const balancesQuery =gql`query ($network:EthereumNetwork!, $account:String!){
        ethereum(network: $network) {
          address(address: {is: $account}) {
            balance
            balances {
              currency {
                name
                symbol
                address
                tokenType
                tokenId
              }
              value
            }
          }
        }
      }`;

      const variables={
          network:this.convertToBitqueryChain(chain),
          account:account
      }
      const data = await this.client.request(balancesQuery, variables);
      return data;
  }
}
