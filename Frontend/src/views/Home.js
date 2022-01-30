
import "../style/css/dashboard1.css"
import "../style/css/table.css"

import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Marquee from "react-easy-marquee";

function Home() {

    const [largeTokens, setLargeTokens] = useState([]);

    useEffect(() => {
        
        getLargeTokens();
        

    }, []);

    useEffect(() => {
        console.log(largeTokens);
    }, [largeTokens]);

    const getLargeTokens = async() => {

        axios.get('http://192.168.113.22:4000/coin-market-cap')
            .then(function (response) {
                console.log('getdata');
                setLargeTokens(response.data);
                console.log(response.data);
                console.log(largeTokens);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return ( 
        <>
            <div className="row ">
                <div className="col-md-12 d-flex ">
                <Marquee className="marquee-bar" duration={50000} background="#fafafa" height="40px"  pauseOnHover={true} reverse={true}>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;1. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;2. Ethereum</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;3. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;4. Ethereum</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;5. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;6. Ethereum</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;7. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;8. Ethereum</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;1. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;2. Ethereum</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;3. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;4. Ethereum</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;5. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;6. Ethereum</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-bitcoin text-warning"></i> &nbsp;7. Bitcoin</button>
                        <button type="button " className="btn btn-primary px-md-2 coin-item mr-2"><i className="fa-brands fa-ethereum text-pink"></i> &nbsp;8. Ethereum</button>
                </Marquee>
                    
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
            <div className="row mt-3 ">
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
            </div>
            <div className="row mt-3 ">
                <div className="col-md-12 "  style={{width:'100%', overflowX:'auto'}}>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col ">#</th>
                                <th scope="col " className="text-left ">Name <i className="fa fa-sort ml-2"></i></th>
                                <th scope="col " className="text-left ">Price<i className="fa fa-sort ml-2"></i></th>
                                <th scope="col " className="text-right ">24h %</th>
                                <th scope="col " className="text-right ">7d %</th>
                                <th scope="col " className="text-right ">marketcap<i className="fa fa-dollar ml-2"></i>
                                </th>
                                <th scope="col " className="text-right ">volume(24)<i className="fa fa-chart-column ml-2"></i></th>
                                <th scope="col " className="text-right ">chart</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                largeTokens.map((t,i)=>{
                                    return (<tr key={i}>
                                        <th scope="row ">{i+1}</th>
                                        <td className="text-strong text-left ">
                                            <Link to={ `/chart/${t.symbol}`}>
                                                <img className="ranking-img mr-1" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/`+t.id+'.png'} />
                                                {t.name} <span className="mark ">                                            
                                                {t.symbol}</span>
                                            </Link>
                                            </td>
                                        <td className="text-strong text-left ">${Math.floor(t.price * 100) / 100}</td>
                                        <td className={t.percent_change_24h>0?"text-success":"text-danger"}>{t.percent_change_24h}%</td>
                                        <td className={t.percent_change_7d>0?"text-success":"text-danger"}>{t.percent_change_7d}%</td>
                                        <td className="text-strong text-right ">${Math.round(t.market_cap)}</td>
                                        <td className="text-strong text-right ">${Math.round(t.volume_24h)}</td>
                                        <td className="chart "> 
                                            <div id="chart0"></div>
                                        </td>
                                    </tr>);
                                })
                            }
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