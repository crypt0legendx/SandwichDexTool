import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { request, gql } from 'graphql-request';

@Injectable()
export class BitqueryService {

    private GRAPH_API_BITQUERY = "https://graphql.bitquery.io";

    constructor(
    
    ){}


    async getTradeBook(chain, address){
        const datas = await request(
            this.GRAPH_API_BITQUERY,
            gql`
            `,{}
        )
    }

    getTradeByAddress(){

    }

    getHolders(){

    }

    getLiquidity(){

    }
}
