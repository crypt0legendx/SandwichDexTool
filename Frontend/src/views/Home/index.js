
import "../../style/css/dashboard1.css"
import "../../style/css/table.css"

import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {FaRegStar} from "react-icons/fa";
import {AiOutlineDollar, AiOutlineBarChart} from "react-icons/ai";

import axios from 'axios';

import TrendingMarquee from "../../components/TrendingMarquee/TrendingMarquee";
import TredingCard from "./MarketCapInfoCard/Treding";
import BestGainersCard from "./MarketCapInfoCard/BestGainers";
import PresaleCard from "./MarketCapInfoCard/Presale";

function Home() {

    const ranking = useSelector((state) => state.currencies.ranking);
    const isLoading = useSelector((state) => state.currencies.isLoading);
    const scanurl = useSelector((state) => state.network.scanurl);

    return ( 
        <>
            <div className="row ">
                <div className="col-md-12 d-flex ">
                    <TrendingMarquee />    
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 ">
                    <div className="composition-image mt-3 composition-back1" >
                        <img src="../../assets/images/compositions/composition_1.png " />
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
                    <div className="composition-image mt-3  composition-back2">
                        <img src="../../assets/images/compositions/composition_2.png " />
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
                    <div className="composition-image mt-3  composition-back3">
                        <img src="../../assets/images/compositions/composition_3.png " />
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
                    <TredingCard />
                </div>
                <div className="col-md-4 ">
                    <BestGainersCard />
                </div>
                <div className="col-md-4 ">
                    <PresaleCard />
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
                                        <th scope="col " className="text-left ">#</th>
                                        <th scope="col " className="text-left ">Name</th>
                                        <th scope="col " className="text-left ">Price</th>
                                        <th scope="col " className="text-right ">24h %</th>
                                        <th scope="col " className="text-right ">7d %</th>
                                        <th scope="col " className="text-right">
                                            marketcap <big><AiOutlineDollar className="ml-1" /></big>
                                        </th>
                                        <th scope="col " className="text-right d-flex align-items-center">
                                            volume(24) <big><AiOutlineBarChart className="ml-1" /></big>
                                        </th>
                                        <th scope="col " className="text-right ">Chart</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        ranking.map((t,i)=>{
                                            return (<tr key={i}>
                                                <td className="text-left">
                                                    <div className="d-flex">
                                                        <button className="star-toggle-noline-btn mr-2 inline-block">
                                                            <FaRegStar />
                                                        </button>
                                                        {i+1}
                                                    </div>
                                                </td>
                                                <td className="text-strong text-left ">                                                    
                                                    <Link to={ `/chart/${t.symbol}`}>
                                                        <div className="d-flex align-items-center">
                                                        <img className="ranking-img mr-1" src={`${scanurl}/token/`+t.logo} />
                                                        {t.name} <span className="mark ">                                            
                                                        {t.symbol}</span>
                                                        </div>
                                                    </Link>
                                                    </td>
                                                <td className="text-strong text-left ">${t.price.toFixed(2)}</td>
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
        </>
    );
}

export default Home;