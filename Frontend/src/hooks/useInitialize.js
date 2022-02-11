import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';

import { extractNameSymbol, extractUSD, extractContractAddress,extractLogoUrl } from "../helpers/scrape";
import {changeLoading, changeRanking} from "../store/slices/currencies-slice";

const useInitialize = () => {

    const InvalidCMC = useSelector((state) => state.currencies.InvalidCMC);
    const dispatch = useDispatch();

    const initializeApp = (chain) => {

        dispatch(changeLoading(true));
        axios.get(`http://localhost:4000/multi-chain-cap/toptokens/${chain}`)
            .then(function (response) {
                let results=[];
                let symbols="";
                let parser = new DOMParser();
                let doc = parser.parseFromString(response.data, 'text/html');
                let trs = doc.body.getElementsByTagName("tr");

                for (let i =1; i<trs.length; i++){
                    const tds=trs[i].getElementsByTagName('td');
                    const img = tds[1].getElementsByTagName('img')[0].src;
                    const logo = extractLogoUrl(img);
                    const a = tds[1].getElementsByTagName('a')[0].href;
                    const contractAddress = extractContractAddress(a);
                    const tname = tds[1].getElementsByTagName('a')[0].innerText.trim();
                    const {name,symbol} = extractNameSymbol(tname);
                    const price = tds[2].innerText.trim();
                    const usd_price=extractUSD(price);
                    const change = tds[3].innerText.trim();
                    const volume = tds[4].innerText.trim();
                    const marketcap =tds[5].innerText.trim();
                    
                    if(!InvalidCMC.includes(symbol)){
                        symbols=symbols+','+symbol;
                        console.log('symbol');
                    }                        
                    
                    results.push({id:1027, contractAddress:contractAddress, logo:logo, name:name, symbol:symbol, price:usd_price,percent_change_24h:change,percent_change_7d:change,market_cap:marketcap,volume_24h:volume});
                    
                }
                symbols=symbols.substring(1);
                axios.get(`http://localhost:4000/coin-market-cap/token/${symbols}`)
                    .then(async function (response) {
                        const cmc_data=response.data;
                        results=await results.map((d,index)=>{
                            
                            const token_cmc=cmc_data.find(cd=>d.symbol.toUpperCase()==cd.symbol);
                            
                            if(token_cmc&&token_cmc.percent_change_24h){
                                return {id:token_cmc.id, contractAddress:d.contractAddress, logo:d.logo, name:d.name, symbol:d.symbol, price:d.price,percent_change_24h:token_cmc.percent_change_24h,percent_change_7d:token_cmc.percent_change_7d,market_cap:d.market_cap,volume_24h:d.volume_24h}
                            }else{
                                return {id:1027, contractAddress:d.contractAddress, logo:d.logo, name:d.name, symbol:d.symbol, price:d.price,percent_change_24h:d.percent_change_24h,percent_change_7d:'-',market_cap:d.market_cap,volume_24h:d.volume_24h}
                            }
                        });

                        console.log(results);                
                        dispatch(changeRanking(results));
                        dispatch(changeLoading(false));
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    }).finally(()=>{

                    });                                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
                
            });
    }

    return {initializeApp}
}

export default useInitialize;