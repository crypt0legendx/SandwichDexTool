
import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import axios from 'axios';

import {Tabs, Tab} from "react-bootstrap";
import {BsArrowUp, BsArrowDown, BsClock} from 'react-icons/bs';
import {FaRegChartBar} from 'react-icons/fa';

import FullscreenIcon from "../../assets/icons/others/screen.svg"
import TradingChart from "../../components/Chart/TradingChart";
import TrendingMarquee from "../../components/TrendingMarquee/TrendingMarquee";

import "../../style/css/dashboard2.css"
import "../../style/css/table.css"



function Chart() {

    
    const { symbol, contractAddress } = useParams();
    const network_name = useSelector((state) => state.network.name);

    const [tokenInfo,setTokenInfo] =  useState({});
    const [tradeBook, setTradeBook] = useState([]);

    const [timeInterval] =  useState(['1H','4H','1D','1W','1M']);
    const [intervalChart, setIntervalChart] = useState("1D");


    useEffect(()=>{
        getTokenInfo();
        fetchTradeBook();
    },[])

    // useEffect(() => {
    //     const interval = setTimeout(async () => {
    //         getCoinBySymbol();
    //         fetchTradeBook();
    //       }, 10000)
    //       return () => clearInterval(interval)
    // }, [coin, tradeBook]);

    const fetchTradeBook = async() =>{
        axios.get(`http://localhost:4000/bitquery/tradebook/${network_name}/${contractAddress}`)
        .then(function (response) {
            console.log(response.data.ethereum.dexTrades);
            setTradeBook(response.data.ethereum.dexTrades);
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
        });
    }
    const getTokenInfo = async() => {
        axios.get(`http://localhost:4000/bitquery/tokeninfo/${network_name}/${contractAddress}`)
            .then(function (response) {
                console.log('getTokenInfo');
                const dexTrades = response.data.ethereum.dexTrades;
                const percent_24h_change = (dexTrades[0].quotePrice-dexTrades[1].quotePrice)/dexTrades[1].quotePrice*100;
                let tokenInfo = {
                    symbol:dexTrades[0].baseCurrency.symbol,
                    percent_change_24h:percent_24h_change,
                    lastPrice:dexTrades[1].quotePrice,
                    price:dexTrades[0].quotePrice,
                    minimum:dexTrades[0].minimum_price,
                    maximum:dexTrades[0].maximum_price,
                    volume_24h:dexTrades[0].tradeAmount
                }
                setTokenInfo(tokenInfo)
                console.log(tokenInfo);
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
        });        
    }
    
    return ( 
        <>
            <div className="row ">
                <div className="col-md-12 d-flex">
                    <TrendingMarquee />
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <div className="pair-card mt-3">
                        <div className="d-flex justify-content-between align-items-center ">
                            <div className="token-pair">
                                <label>{tokenInfo.symbol}</label>
                                <span className={tokenInfo.percent_change_24h>0?"badge ml-2 mt-1 bg-success":"badge ml-2 mt-1 bg-danger"}>{tokenInfo.percent_change_24h>0?'+':''}{Math.floor(tokenInfo.percent_change_24h * 100) / 100}%</span>
                            </div>
                            {/* <div className="action"><i className="fa fa-angle-down"></i></div> */}
                        </div>
                        <div className={tokenInfo.percent_change_24h>0?'d-flex value text-success':'d-flex value text-danger'}>
                            ${tokenInfo.price?tokenInfo.price.toFixed(5):'-'}
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="pair-detail-card mt-3">
                        <div className="row">
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <BsClock />&nbsp;24h change
                                    </div>
                                    <div className="pair-detail-item-value text-success">
                                        ${tokenInfo.lastPrice?tokenInfo.lastPrice.toFixed(5):'-'}
                                        {tokenInfo.percent_change_24h>0?'+':''}
                                        {Math.floor(tokenInfo.percent_change_24h * 100) / 100}%
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <BsArrowUp />&nbsp;24h high
                                    </div>
                                    <div className="pair-detail-item-value">
                                        ${tokenInfo.maximum?tokenInfo.maximum.toFixed(5):'-'}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <BsArrowDown />&nbsp;24h low
                                    </div>
                                    <div className="pair-detail-item-value">
                                        ${tokenInfo.minimum?tokenInfo.minimum.toFixed(5):'-'}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <FaRegChartBar />&nbsp;24h volume
                                    </div>
                                    <div className="pair-detail-item-value">
                                        ${Math.round(tokenInfo.volume_24h)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

                <div className="col-md-12  mt-3">
                    <div className="trading-view-filter" style={{width: "100%"}}>
                        <div className="row">
                            <div className="col-md-7 d-flex flex-wrap">
                                <button className="trading-filter-btn mt-1 mr-1">Time</button>
                                {
                                    timeInterval.map((val,index)=>{
                                        return <button 
                                        key={index} 
                                        className={intervalChart==val?`trading-filter-btn mt-1 mr-1 active`:`trading-filter-btn mt-1 mr-1`}
                                        onClick={()=>setIntervalChart(val)}
                                        >{val}</button>
                                    })
                                }                                
                            </div>
                            <div className="col-md-5 d-flex justify-content-end align-items-center">
                                <a href="" className="trading-subnav active mr-3">Trading View</a>
                                <a href="" className="trading-subnav mr-3">Depth</a>
                                <a href="" className="trading-subnav"><img src={FullscreenIcon} /></a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-md-12">
                    {
                        tokenInfo.symbol&&
                        <TradingChart symbol = {tokenInfo.symbol} interval={intervalChart} />
                    }
                    
                </div>
            </div>   
            <div className="row mt-3">
                <div className="col-md-12">
                <Tabs variant="pills" defaultActiveKey="trade_book" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="trade_book" title="Tradebook" className="mt-1">
                        <div style={{width:'100%', overflowX:'auto'}}>
                            <table className="table table-striped market-trade-table ">
                                <thead>
                                    <tr>
                                        <th scope="col " className="text-left ">Time <i className="fa fa-sort ml-2"></i></th>
                                        <th scope="col " className="text-left ">Traded<i className="fa fa-sort ml-2"></i></th>
                                        <th scope="col " className="text-left ">Token Price<i className="fa fa-sort ml-2"></i></th>
                                        <th scope="col " className="text-right ">value<i className="fa fa-sort ml-2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        tradeBook.map((tx, index)=>{
                                            return <tr key={index}>
                                                        <td className="text-strong text-left ">{new Date(Number(tx.block.timestamp.unixtime)*1000).toLocaleTimeString()}</td>
                                                        <td className="text-strong text-success text-left ">{tx.volume.toFixed(5)}&nbsp;{tx.baseCurrency.symbol}</td>
                                                        <td className="text-strong text-left ">${(tx.tradeAmount/tx.volume).toFixed(5)}</td>
                                                        <td className="text-strong text-right ">${tx.tradeAmount.toFixed(5)}</td>
                                                    </tr>
                                        })
                                    }                                    
                                </tbody>
                            </table>
                        </div>
                        
                    </Tab>
                    <Tab eventKey="your_trades" title="Your trades" className="mt-1">
                        
                    </Tab>
                    <Tab eventKey="holders" title="Holders" className="mt-1">
                        
                    </Tab>
                    <Tab eventKey="details" title="Details" className="mt-1">
                        
                    </Tab>
                    <Tab eventKey="liquidity" title="Liquidity" className="mt-1">
                        
                    </Tab>
                    <Tab eventKey="news" title="News" className="mt-1">
                        
                    </Tab>
                </Tabs>
                </div>
            </div>
        </>
    );
}

export default Chart;