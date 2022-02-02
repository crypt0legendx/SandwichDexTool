
import "../style/css/dashboard2.css"
import "../style/css/table.css"

import FullscreenIcon from "../assets/icons/others/screen.svg"
import TradingChart from "../components/Chart/TradingChart";

import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import TrendingMarquee from "../components/TrendingMarquee/TrendingMarquee";


function Chart() {

    const { symbol } = useParams();
    const [coin,setCoin] =  useState({});

    useEffect(() => {
        const interval = setTimeout(async () => {
            getCoinBySymbol()
          }, 10000)
          return () => clearInterval(interval)
    }, [coin]);

    useEffect(() => {
        console.log(coin);
    }, [coin]);

    const getCoinBySymbol = async() => {
        axios.get(`http://localhost:4000/coin-market-cap/coins/${symbol}`)
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
                                <button className="trading-filter-btn mt-1 mr-1">1H</button>
                                <button className="trading-filter-btn mt-1 mr-1">1H</button>
                                <button className="trading-filter-btn mt-1 mr-1">4H</button>
                                <button className="trading-filter-btn mt-1 mr-1 active">1D</button>
                                <button className="trading-filter-btn mt-1 mr-1">1W</button>
                                <button className="trading-filter-btn mt-1 mr-1">1M</button>
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
                    <TradingChart symbol = {symbol} />
                </div>
            </div>   
            <div className="row">
                <div className="col-md-12">
                    <div className="market-trade-filter d-flex mt-5 flex-wrap">
                        <button className="trading-filter-btn mt-1 active">Tradebook</button>
                        <button className="trading-filter-btn mt-1">Your trades</button>
                        <button className="trading-filter-btn mt-1">Holders</button>
                        <button className="trading-filter-btn mt-1">Details</button>
                        <button className="trading-filter-btn mt-1">Liquidity</button>
                        <button className="trading-filter-btn mt-1">News</button>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12 "  style={{width:'100%', overflowX:'auto'}}>

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
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                            <tr>
                                <td className="text-strong text-left ">18:05:40</td>
                                <td className="text-strong text-success text-left ">36,641.209735578</td>
                                <td className="text-strong text-left ">0.245455484546</td>
                                <td className="text-strong text-right ">36,641.209735578</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <footer>
                <div className="footer_wrapper">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10 col-lg-12">
                                <div className="footer_box_wrapper">
                                    <div className="footer_box pt_30">
                                        <div className="footer_content">
                                            <a href="index.html">
                                                <img src="../assets/images/Logo/logo.png" className="img-fluid" alt="" />
                                            </a>
                                            <p>Sandwich Network is the definite hub to start your decentralized cryptocurrency journey. Join us!</p>
                                        </div>
                                    </div>
                                    <div className="footer_box pt_30">
                                        <div className="footer_list_wrapper">
                                            <h5>Products</h5>
                                            <ul className="footer_list">
                                                <li>
                                                    <a href="/launch/">SandwichBeta</a>
                                                </li>
                                                <li>
                                                    <a href="#">SandwichSAFU</a>
                                                </li>
                                                <li>
                                                    <a href="#">SandwichTools</a>
                                                </li>
                                                <li>
                                                    <a href="#">SandwichSwap</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer_box pt_30">
                                        <div className="footer_list_wrapper">
                                            <h5>Support</h5>
                                            <ul className="footer_list">
                                                <li>
                                                    <a href="/tutorials/">Tutorials</a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://docs.sandwich.network/">Documentation</a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://docs.sandwich.network/support">Customer support</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="footer_box pt_30">
                                        <div className="footer_list_wrapper">
                                            <h5>Social</h5>
                                            <ul className="footer_list">
                                                <li>
                                                    <a target="_blank" href="https://t.me/SandwichNetwork">
                                                        <i className="fab fa-telegram-plane"></i> Telegram
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://twitter.com/NetworkSandwich">
                                                        <i className="fab fa-twitter"></i> Twitter
                                                    </a>
                                                </li>
                                                <li>
                                                    <a target="_blank" href="https://medium.com/@sandwichnetwork">
                                                        <i className="fab fa-medium"></i> Medium
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="footer_last_text">
                                    <p>Copyright © 2021 Sandwich. All rights reserved</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>        
        </>
    );
}

export default Chart;