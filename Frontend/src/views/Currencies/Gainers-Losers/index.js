import "../../../style/css/table.css"
import "./style.css"

import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";


function GainersLosers() {

    const chain = useSelector((state) => state.network.name);
    const gainers = useSelector((state) => state.trendings.gainers);
    const losers = useSelector((state) => state.trendings.losers);
    const [filteredGainersForChain, setFilteredGainersForChain] = useState([]);
    const [filteredLosersForChain, setFilteredLosersForChain] = useState([]);

    useEffect(()=>{
        console.log('gainers-chain', chain);
        let slug ="";
        if(chain==="Ethereum")
            slug="ethereum";
        if(chain==="BSC")
            slug="bnb";
        if(chain==="Polygon")
            slug="matic";
        let filteredGainers = [];
        let filteredLosers = [];
        gainers.forEach(d=>{

            if(d.platform!=null&&d.platform.slug == slug){
                filteredGainers.push(d);
                // return d;
            }
        })

        losers.forEach(d=>{
            if(d.platform!=null&&d.platform.slug == slug){
                filteredLosers.push(d);
            }
        })
        console.log('filteredGainerrs',filteredGainers);
        setFilteredGainersForChain(filteredGainers);
        setFilteredLosersForChain(filteredLosers);

    },[gainers, losers, chain])

    return ( 
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="sub-title mt-4">Top Gainers and Losers on {chain}</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="sub-description mt-1">Today's best and worst performing tokens</div>
                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="sm-sub-title mt-5">Top Gainers</div>
                    <div className="row">
                        <div className="col-md-12"  style={{width:'100%', overflowX:'auto', textAlign:'center'}}>
                            <table className="table mt-2">
                                <thead>
                                    <tr>                                
                                        <th scope="col " className="text-left bg-light-gray theader-round-left">Position</th>
                                        <th scope="col " className="text-left bg-light-gray ">24h change</th>
                                        <th scope="col " className="text-right bg-light-gray ">Volume</th>
                                        <th scope="col " className="text-right bg-light-gray theader-round-right">Trust Score</th>                                
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredGainersForChain.slice(0,10).map((t,i)=>{
                                            return (<tr key={i}>                                        
                                                <td className="text-strong text-left ">                                                    
                                                    <Link to={ `/chart/${chain}/${t.platform.token_address}`}>
                                                        <div className="d-flex align-items-center">
                                                        <img className="token-logo mr-2" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${t.id}.png`} />
                                                        <div className="d-flex flex-column token-normal-info">
                                                            <div>
                                                                {t.symbol}
                                                            </div>                                                        
                                                            <div  className="small-price">
                                                                ${t.price.toFixed(4)}
                                                            </div>
                                                        </div>                                                                                                    
                                                        </div>
                                                    </Link>
                                                    </td>
                                                <td className={parseFloat(t.percent_change_24h)>0?"text-success text-right":"text-danger text-right"}>
                                                    {Math.floor(t.percent_change_24h)}
                                                    %
                                                </td>
                                                <td className="text-strong text-right ">${Math.floor(t.volume_24h)}</td>
                                                <td className="text-strong text-center"> 
                                                    N/A
                                                </td>
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                </div>
                <div className="col-md-6">
                    <div className="sm-sub-title mt-5">Top Losers</div>
                    <div className="row">
                        <div className="col-md-12"  style={{width:'100%', overflowX:'auto', textAlign:'center'}}>
                            <table className="table mt-2">
                                <thead>
                                    <tr>                                
                                        <th scope="col " className="text-left bg-light-gray theader-round-left">Position</th>
                                        <th scope="col " className="text-left bg-light-gray ">24h change</th>
                                        <th scope="col " className="text-right bg-light-gray ">Volume</th>
                                        <th scope="col " className="text-right bg-light-gray theader-round-right">Trust Score</th>                                
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredLosersForChain.slice(0,10).map((t,i)=>{
                                            return (<tr key={i}>                                        
                                                <td className="text-strong text-left ">                                                    
                                                    <Link to={ `/chart/${chain}/${t.platform.token_address}`}>
                                                        <div className="d-flex align-items-center">
                                                        <img className="token-logo mr-2" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${t.id}.png`} />
                                                        <div className="d-flex flex-column token-normal-info">
                                                            <div>
                                                                {t.symbol}
                                                            </div>                                                        
                                                            <div className="small-price">
                                                                ${t.price.toFixed(6)}
                                                            </div>
                                                        </div>                                                                                                    
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className={parseFloat(t.percent_change_24h)>0?"text-success text-right":"text-danger text-right"}>
                                                    {Math.floor(t.percent_change_24h)}%
                                                </td>
                                                <td className="text-strong text-right ">${Math.floor(t.volume_24h)}</td>
                                                <td className="text-strong text-center"> 
                                                    N/A
                                                </td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                               
        </>
        );

}

export default GainersLosers;