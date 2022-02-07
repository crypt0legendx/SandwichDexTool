
import "../../style/css/dashboard2.css"
import "../../style/css/table.css"

import FullscreenIcon from "../../assets/icons/others/screen.svg"
import TradingChart from "../../components/Chart/TradingChart";

import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import TrendingMarquee from "../../components/TrendingMarquee/TrendingMarquee";
import {Tabs, Tab} from "react-bootstrap";


function Chart() {

    const { symbol } = useParams();
    const [coin,setCoin] =  useState({});
    const [tradeBook, setTradeBook] = useState([]);

    const [timeInterval] =  useState(['1H','4H','1D','1W','1M']);
    const [intervalChart, setIntervalChart] = useState("1D");

    useEffect(()=>{
        getCoinBySymbol();
        fetchTradeBook();
    },[symbol])

    useEffect(() => {
        const interval = setTimeout(async () => {
            getCoinBySymbol();
            fetchTradeBook();
          }, 10000)
          return () => clearInterval(interval)
    }, [coin, tradeBook]);


    useEffect(() => {
        console.log(coin);
    }, [coin]);

    const fetchTradeBook = async() =>{
        axios.get(`http://localhost:4000/multi-chain-cap/tradebook/BSC/0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51`)
        .then(function (response) {
            console.log('tradebook',response.data);
            setTradeBook(response.data);
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
        });
    }
    const getCoinBySymbol = async() => {
        axios.get(`http://localhost:4000/coin-market-cap/token/${symbol}`)
        .then(function (response) {
            console.log('getdata');
            console.log(response.data);
            setCoin(response.data[0]);
            console.log(response.data[0]);
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
                                <label>{symbol}</label>
                                <span className="badge ml-2 mt-1">{coin.percent_change_24h>0?'+':''}{Math.floor(coin.percent_change_24h * 100) / 100}%</span>
                            </div>
                            <div className="action"><i className="fa fa-angle-down"></i></div>
                        </div>
                        <div className="d-flex value">
                            ${Math.floor(coin.price * 1000) / 1000}
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="pair-detail-card mt-3">
                        <div className="row">
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <i className="fa fa-clock"></i>&nbsp;24h change
                                    </div>
                                    <div className="pair-detail-item-value text-success">
                                        ${Math.floor(coin.price * 100) / 100}
                                        {coin.percent_change_24h>0?'+':''}
                                        {Math.floor(coin.percent_change_24h * 100) / 100}%
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <i className="fa fa-clock"></i>&nbsp;24h high
                                    </div>
                                    <div className="pair-detail-item-value">
                                        ${Math.floor(coin.price * 100) / 100}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <i className="fa fa-clock"></i>&nbsp;24h low
                                    </div>
                                    <div className="pair-detail-item-value">
                                        ${Math.floor(coin.price * 100) / 100}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <i className="fa fa-clock"></i>&nbsp;24h volume
                                    </div>
                                    <div className="pair-detail-item-value">
                                        ${Math.round(coin.volume_24h)}
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
            <div class="row">
                <div class="col-md-12">
                    <TradingChart symbol = {symbol} interval={intervalChart} />
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
                                                        <td className="text-strong text-left ">{new Date(Number(tx.timeStamp)).toLocaleTimeString()}</td>
                                                        <td className="text-strong text-success text-left ">{tx.value}</td>
                                                        <td className="text-strong text-left ">0.245455484546</td>
                                                        <td className="text-strong text-right ">{tx.value}</td>
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