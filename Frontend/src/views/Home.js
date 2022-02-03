
import "../style/css/dashboard1.css"
import "../style/css/table.css"

import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import TrendingMarquee from "../components/TrendingMarquee/TrendingMarquee";
import {useSelector, useDispatch} from "react-redux";

function Home() {

    const ranking = useSelector((state) => state.currencies.ranking);
    const isLoading = useSelector((state) => state.currencies.isLoading);

    return ( 
        <>
            <div className="row ">
                <div className="col-md-12 d-flex ">
                    <TrendingMarquee />    
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 ">
                    <div className="composition-image mt-3  ">
                        <img src="../assets/images/compositions/composition_1.png " />
                    </div>
                    <div className="composition-footer d-flex justify-content-between ">
                        <div className="composition-title ">
                            When to invest in crypto?
                        </div>
                        <div className="composition-ads ">
                            Ads
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="composition-image mt-3  ">
                        <img src="../assets/images/compositions/composition_2.png " />
                    </div>
                    <div className="composition-footer d-flex justify-content-between ">
                        <div className="composition-title ">
                            Crypto in 2022
                        </div>
                        <div className="composition-ads ">
                            Ads
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="composition-image mt-3  ">
                        <img src="../assets/images/compositions/composition_3.png " />
                    </div>
                    <div className="composition-footer d-flex justify-content-between ">
                        <div className="composition-title ">
                            Will BTC recover?
                        </div>
                        <div className="composition-ads ">
                            Ads
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 ">
                <div className="col-md-12 ">
                    <div className="coin-martketcap-intro-title ">
                        Today's Cryptocurrency Prices by Market Cap<br />
                        <small>
                            The global crypto market cap is $1.58T, a 13.92% decrease over the last day.
                        </small>
                    </div>
                </div>
            </div>
            <div className="row mt-3 ">
                <div className="col-md-4 ">
                    <div className="coin-marketcap-info-item ">
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-title "><i className="fa fa-fire-flame-curved mr-2"></i>Trending</span>
                            <button className="btn btn-default info-view-more ">More<i className="fa fa-angle-right ml-2"></i></button>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">Cardano&nbsp;<small>ADA</small></span>
                            <span className="info-item-opt-value text-success ">+0.64%</span>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">EOS&nbsp;<small>EOS.IO</small></span>
                            <span className="info-item-opt-value text-danger ">-9.04%</span>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">Tether&nbsp;<small>USDT</small></span>
                            <span className="info-item-opt-value text-success ">+0.64%</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="coin-marketcap-info-item ">
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-title "><i className="fa fa-chart-line mr-2"></i>Biggest Gainers</span>
                            <button className="btn btn-default info-view-more ">More<i className="fa fa-angle-right ml-2"></i></button>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">Cardano&nbsp;<small>ADA</small></span>
                            <span className="info-item-opt-value text-success ">+0.64%</span>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">EOS&nbsp;<small>EOS.IO</small></span>
                            <span className="info-item-opt-value text-danger ">-9.04%</span>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">Tether&nbsp;<small>USDT</small></span>
                            <span className="info-item-opt-value text-success ">+0.64%</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 ">
                    <div className="coin-marketcap-info-item ">
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-title "><i className="fa fa-fire-flame-curved mr-2"></i>Sandwich Network Presales</span>
                            <button className="btn btn-default info-view-more ">More<i className="fa fa-angle-right ml-2"></i></button>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">Cardano&nbsp;<small>ADA</small></span>
                            <span className="info-item-opt-value text-success ">+0.64%</span>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">EOS&nbsp;<small>EOS.IO</small></span>
                            <span className="info-item-opt-value text-danger ">-9.04%</span>
                        </div>
                        <div className="d-flex justify-content-between ">
                            <span className="info-item-opt-title ">Tether&nbsp;<small>USDT</small></span>
                            <span className="info-item-opt-value text-success ">+0.64%</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="row mt-3 ">
                <div className="col-md-12 d-flex flex-wrap justify-content-between ">
                    <div className="col-md-6 d-flex flex-wrap justify-content-md-start justify-content-xs-center">
                        <button className="btn btn-default coin-sort-btn active mt-2 mr-2 ">All Tokens</button>
                        <button className="btn btn-default coin-sort-btn  mt-2 mr-2 ">Categories</button>
                        <button className="btn btn-default coin-sort-btn mt-2 mr-2 ">NFT</button>
                        <button className="btn btn-default coin-sort-btn mt-2 mr-2 ">BSC</button>
                        <button className="btn btn-default coin-sort-btn mt-2 ">Metaverse</button>
                    </div>
                    <div className="col-md-6 d-flex flex-wrap justify-content-md-end justify-content-xs-center">
                        <input type="text " className="form-control mt-2 mr-2 search-input " placeholder="Search " />
                        <button className="btn btn-default mt-2 mr-2 time-sort-btn d-flex ">All time &nbsp;<i className="fa fa-calendar"></i></button>
                    </div>
                </div>
            </div> */}
            <div className="row mt-3 ">
                <div className="col-md-12"  style={{width:'100%', overflowX:'auto', textAlign:'center'}}>
                    {
                        isLoading&&(
                            <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--sQzcbE_t--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/fk3smrzna1vieidxaawn.gif" alt="Alt Text" loading="lazy" data-xblocker="passed" />
                        )
                    }
                    {
                        !isLoading&&(
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col ">#</th>
                                        <th scope="col " className="text-left ">Name</th>
                                        <th scope="col " className="text-left ">Price</th>
                                        <th scope="col " className="text-right ">24h %</th>
                                        <th scope="col " className="text-right ">7d %</th>
                                        <th scope="col " className="text-right ">marketcap<i className="fa fa-dollar ml-2"></i>
                                        </th>
                                        <th scope="col " className="text-right ">volume(24)</th>
                                        <th scope="col " className="text-right ">Last 7 Days</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ranking.map((t,i)=>{
                                            return (<tr key={i}>
                                                <td>{i+1}</td>
                                                <td className="text-strong text-left ">
                                                    <Link to={ `/chart/${t.symbol}`}>
                                                        <img className="ranking-img mr-1" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/`+t.id+'.png'} />
                                                        {t.name} <span className="mark ">                                            
                                                        {t.symbol}</span>
                                                    </Link>
                                                    </td>
                                                <td className="text-strong text-left ">${Math.floor(t.price * 100) / 100}</td>
                                                <td className={t.percent_change_24h>0?"text-success text-right":"text-danger text-right"}>{Math.floor(t.percent_change_24h*100)/100}%</td>
                                                <td className={t.percent_change_7d>0?"text-success text-right":"text-danger text-right"}>{Math.floor(t.percent_change_7d*100)/100}%</td>
                                                <td className="text-strong text-right ">${Math.round(t.market_cap)}</td>
                                                <td className="text-strong text-right ">${Math.round(t.volume_24h)}</td>
                                                <td className="chart "> 
                                                    <img className={t.percent_change_7d>0?"bCltOL isUp":"bCltOL"}  src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${t.id}.svg`} />
                                                </td>
                                            </tr>);
                                        })
                                    }
                                </tbody>
                            </table>
                        )    
                    }
                    
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
                                                    <a href="/">SandwichSAFU</a>
                                                </li>
                                                <li>
                                                    <a href="/">SandwichTools</a>
                                                </li>
                                                <li>
                                                    <a href="/">SandwichSwap</a>
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

export default Home;