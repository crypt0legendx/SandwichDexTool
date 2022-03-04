import "../../style/css/dashboard2.css"
import "../../style/css/table.css"
import "./style.css";

import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

import {Tabs, Tab, Button} from "react-bootstrap";
import {BsArrowUp, BsArrowDown,BsArrowRight, BsClock} from 'react-icons/bs';
import {FaRegChartBar, FaRegEdit} from 'react-icons/fa';
import {VscArrowSwap} from 'react-icons/vsc';
import {MdStackedLineChart} from 'react-icons/md';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';

import IconButton from '@mui/material/IconButton';

import Skeleton from '@mui/material/Skeleton';

import FullscreenIcon from "../../assets/icons/others/screen.svg"
import TradingChart from "../../components/Chart/TradingChart";
import TrendingMarquee from "../../components/TrendingMarquee/TrendingMarquee";

import { useWeb3Context } from "../../hooks/web3";


function Chart() {

    const { chain, contractAddress } = useParams();
    const { address } = useWeb3Context();

    const [load_tokeninfo, setLoadTokeninfo] = useState(false);
    const [tokenInfo,setTokenInfo] =  useState(null);
    const [tradeBook, setTradeBook] = useState([]);
    const [yourTrade, setYourTrade] = useState([]);
    const [holders, setHolders] = useState([]);
    const [liquidities, setLiquidities] = useState([]);

    const [timeInterval] =  useState(['1H','4H','1D','1W','1M']);
    const [intervalChart, setIntervalChart] = useState("1D");

    //mobile
    const [showIndex, setShowIndex] =  useState(0);
    //dex aggregator
    const [slidePage, setSlidePage] = useState(false);
    const [percent_slide_page, setPercentSlidePage] = useState(0.1);
    


    useEffect(()=>{
        setTokenInfo(null);
        setTradeBook([]);
        setYourTrade([]);
        setHolders([]);
        setLiquidities([]);

        getTokenInfo();
        fetchTradeBook();
        fetchHolders();
        fetchLiquidity();
    },[chain,contractAddress])

    useEffect(()=>{
        if(address === ""){
            setYourTrade([]);
        }else{
            fetchYourTrade();
        }
    },[address])// eslint-disable-line react-hooks/exhaustive-deps

    const fetchTradeBook = async() =>{
        
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/bitquery/tradebook/${chain}/${contractAddress}`)
        .then(function (response) {
            setTradeBook(response.data.ethereum.dexTrades);
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
        });
    }

    const fetchYourTrade = async() =>{
        
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/bitquery/tradebook/${chain}/${contractAddress}/${address}`)
        .then(function (response) {
            setYourTrade(response.data.ethereum.dexTrades);
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
        });
    }

    const fetchHolders = async() => {
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/multi-chain-cap/holders/${chain}/${contractAddress}`)
        .then(function (response) {
            let parser = new DOMParser();
                let doc = parser.parseFromString(response.data, 'text/html');
                let trs = doc.body.getElementsByTagName("tr");
                let results=[];
                for (let i =1; i<trs.length; i++){
                    const tds=trs[i].getElementsByTagName('td');
                    const token_address = tds[1].innerText.trim();
                    const quantity = tds[2].innerText.trim();
                    const percent = tds[3].innerText.trim();
                    const value = tds[4].innerText.trim();                                        
                    
                    results.push({token_address:token_address, quantity:quantity, percent:percent, value:value});                    
                }
                setHolders(results);
            
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
        });
    }

    const fetchLiquidity = async()=> {
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/bitquery/liquidity/${chain}/${contractAddress}`)
        .then(function (response) {
            let dexTrades = response.data.ethereum.dexTrades;
            let filteredList = [];
            dexTrades.forEach((d)=>{
                const idx = filteredList.findIndex(f=>{
                    if(f.protocol !== d.protocol)
                        return false;
                    if((f.sellCurrency.name === d.sellCurrency.name&&f.buyCurrency.name === d.buyCurrency.name))
                        return true;
                    if((f.sellCurrency.name === d.buyCurrency.name&&f.buyCurrency.name === d.sellCurrency.name))
                        return true;

                    return false;
                })

                if(idx === -1){
                    filteredList.push(d);
                }
            })

            setLiquidities(filteredList);
            
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
        });
    }

    const getTokenInfo = async() => {
        setLoadTokeninfo(true);
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/bitquery/tokeninfo/${chain}/${contractAddress}`)
            .then(function (response) {
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
                setLoadTokeninfo(false);                
            })
            .catch(function (error) {
                setLoadTokeninfo(false);  
                console.log(error);
            }).finally(()=>{
        });        
    }


    const handleChangeSlide=()=>{
        setSlidePage(!slidePage);
    }

    const handleChangeSlidePercent=(e)=>{
        setPercentSlidePage(e.target.value);
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
                            {
                                load_tokeninfo?
                                <Skeleton animation="wave" width={100} height={20} />:
                                (
                                    tokenInfo!=null?
                                    <>
                                        <label>{tokenInfo.symbol}</label>
                                        <span className={tokenInfo.percent_change_24h>0?"badge ml-2 mt-1 bg-success":"badge ml-2 mt-1 bg-danger"}>{tokenInfo.percent_change_24h>0?'+':''}{Math.floor(tokenInfo.percent_change_24h * 100) / 100}%</span>
                                    </>:
                                    <Skeleton animation="wave" width={100} height={20} />
                                )
                            }
                                
                            </div>
                            {/* <div className="action"><i className="fa fa-angle-down"></i></div> */}
                        </div>
                        {
                        load_tokeninfo?
                        <Skeleton animation="wave" width={100} height={30} />:
                        (
                            tokenInfo!=null?
                            <div className={tokenInfo.percent_change_24h>0?'d-flex value text-success':'d-flex value text-danger'}>
                                ${tokenInfo.price?tokenInfo.price.toFixed(5):'-'}
                            </div>:
                            <Skeleton animation="wave" width={100} height={30} />
                        )
                        }
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
                                    {
                                    load_tokeninfo?
                                    <div className="d-flex justify-content-center">
                                        <Skeleton animation="wave" width={100} height={30} />
                                    </div>:
                                    (
                                        tokenInfo!=null?
                                        <div className="pair-detail-item-value text-success">
                                            ${tokenInfo.lastPrice?tokenInfo.lastPrice.toFixed(5):'-'}
                                            {tokenInfo.percent_change_24h>0?'+':''}
                                            {Math.floor(tokenInfo.percent_change_24h * 100) / 100}%
                                        </div>:
                                        <div className="pair-detail-item-value">-</div>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <BsArrowUp />&nbsp;24h high
                                    </div>
                                    {
                                    load_tokeninfo?
                                    <div className="d-flex justify-content-center">
                                        <Skeleton animation="wave" width={100} height={30} />
                                    </div>:
                                    (
                                        tokenInfo!=null?
                                        <div className="pair-detail-item-value">
                                            ${tokenInfo.maximum?tokenInfo.maximum.toFixed(5):'-'}
                                        </div>:
                                        <div className="pair-detail-item-value">-</div>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="col-md-3 x-divider">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <BsArrowDown />&nbsp;24h low
                                    </div>
                                    {
                                    load_tokeninfo?
                                    <div className="d-flex justify-content-center">
                                        <Skeleton animation="wave" width={100} height={30} />
                                    </div>:
                                    (
                                        tokenInfo!=null?
                                        <div className="pair-detail-item-value">
                                            ${tokenInfo.minimum?tokenInfo.minimum.toFixed(5):'-'}
                                        </div>:
                                        <div className="pair-detail-item-value">-</div>
                                    )
                                    }
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="pair-detail-item">
                                    <div className="pair-detail-item-title">
                                        <FaRegChartBar />&nbsp;24h volume
                                    </div>
                                    {
                                    load_tokeninfo?
                                    <div className="d-flex justify-content-center">
                                        <Skeleton animation="wave" width={100} height={30} />
                                    </div>:
                                    (
                                        tokenInfo!=null?
                                        <div className="pair-detail-item-value">
                                            ${Math.round(tokenInfo.volume_24h)}
                                        </div>:
                                        <div className="pair-detail-item-value">-</div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                
            <div className="row">
                <div className="col-md-12 d-flex">
                    <div className={showIndex===0?`dex-trade-container open`:`dex-trade-container`}>
                        {
                            load_tokeninfo?
                            <Skeleton className="mt-3" variant="retangle" animation="wave" width={'100%'} height={500} />:
                            (
                                tokenInfo !==null?
                                <>
                                    <div className="row">

                                        <div className="col-md-12 flex-wrap">
                                            <div className="trading-view-filter" style={{width: "100%"}}>
                                                <div className="row">
                                                    <div className="col-md-7 d-flex flex-wrap justify-content-center justify-content-md-start">
                                                        <button className="trading-filter-btn mt-1 mr-1">Time</button>
                                                        {
                                                            timeInterval.map((val,index)=>{
                                                                return <button 
                                                                key={index} 
                                                                className={intervalChart===val?`trading-filter-btn mt-1 mr-1 active`:`trading-filter-btn mt-1 mr-1`}
                                                                onClick={()=>setIntervalChart(val)}
                                                                >{val}</button>
                                                            })
                                                        }                                
                                                    </div>
                                                    <div className="col-md-5 mt-2 d-flex justify-content-center justify-content-md-end align-items-center">
                                                        <button className="trading-subnav link-btn active mr-3">Trading View</button>
                                                        <button className="trading-subnav link-btn"><img src={FullscreenIcon} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">                                
                                            {                                                
                                                    <TradingChart symbol = {tokenInfo.symbol} interval={intervalChart} />                                                
                                            }
                                            
                                        </div>
                                    </div>   
                                </>:
                                <div className="nodata-widget">
                                    <img className="nodata-img mt-4" src="../../assets/images/Portfolio/nodata.png" />
                                    <div className="msg mt-2">Comming <BsArrowRight/> Coming</div>
                                </div>
                            )
                        }
                        
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div className="dex-trade-content">
                                    <Tabs variant="pills" defaultActiveKey="trade_book" id="uncontrolled-tab-example" className="mb-3">
                                        <Tab eventKey="trade_book" title="Tradebook" className="mt-1">
                                            <div style={{width:'100%', overflowX:'auto'}}>
                                            {
                                                tradeBook.length>0?
                                                <table className="table table-striped market-trade-table ">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col " className="text-left ">Time <i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-left ">Traded<i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-left ">Token Price<i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-right ">Value<i className="fa fa-sort ml-2"></i></th>
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
                                                </table>:
                                                <div className="trade-no-content">Looks like there is no data.</div>
                                            }
                                                
                                            </div>
                                            
                                        </Tab>
                                        <Tab eventKey="your_trades" title="Your trades" className="mt-1">
                                            <div style={{width:'100%', overflowX:'auto'}}>
                                            {
                                                yourTrade.length>0?
                                                <table className="table table-striped market-trade-table ">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col " className="text-left ">Time <i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-left ">Traded<i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-left ">Token Price<i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-right ">Value<i className="fa fa-sort ml-2"></i></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            yourTrade.map((tx, index)=>{
                                                                return <tr key={index}>
                                                                            <td className="text-strong text-left ">{new Date(Number(tx.block.timestamp.unixtime)*1000).toLocaleTimeString()}</td>
                                                                            <td className="text-strong text-success text-left ">{tx.volume.toFixed(5)}&nbsp;{tx.baseCurrency.symbol}</td>
                                                                            <td className="text-strong text-left ">${(tx.tradeAmount/tx.volume).toFixed(5)}</td>
                                                                            <td className="text-strong text-right ">${tx.tradeAmount.toFixed(5)}</td>
                                                                        </tr>
                                                            })
                                                        }                                    
                                                    </tbody>
                                                </table>:
                                                <div className="trade-no-content">Looks like there is no data.</div>
                                            }
                                                
                                            </div>
                                        </Tab>
                                        <Tab eventKey="holders" title="Holders" className="mt-1">
                                            
                                            {
                                                holders.length>0?
                                                <table className="table table-striped market-trade-table ">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col " className="text-left ">Balance <i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-left ">Value<i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-left ">Percent<i className="fa fa-sort ml-2"></i></th>
                                                            <th scope="col " className="text-left ">Address<i className="fa fa-sort ml-2"></i></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            holders.map((h, index)=>{
                                                                return <tr key={index}>
                                                                            <td className="text-strong text-left ">{h.quantity}</td>
                                                                            <td className="text-strong text-success text-left ">{h.value}</td>
                                                                            <td className="text-strong text-left ">{h.percent}</td>
                                                                            <td className="text-strong text-left ">{h.token_address}</td>
                                                                        </tr>
                                                            })
                                                        }                                    
                                                    </tbody>
                                                </table>:
                                                <div className="trade-no-content">Looks like there is no data.</div>
                                            }
                                                
                                            
                                        </Tab>
                                        <Tab eventKey="details" title="Details" className="mt-1">
                                            <div className="trade-no-content">Comming Soon.</div>
                                        </Tab>
                                        <Tab eventKey="liquidity" title="Liquidity" className="mt-1">
                                        {
                                            liquidities.length>0?
                                            <div className="">
                                                {
                                                    liquidities.map((d,i)=>{
                                                        return <div key={i} className="liquidity-item">
                                                                    <div className="lp-name">{d.sellCurrency.symbol+'-'+d.buyCurrency.symbol } LP Token</div>
                                                                    <div className="protocol-name">{d.protocol}</div>
                                                                    
                                                                </div>                                                        
                                                    })
                                                }
                                            </div>:
                                            <div className="trade-no-content">Comming Soon.</div>
                                        }   
                                        </Tab>
                                        <Tab eventKey="news" title="News" className="mt-1">
                                            <div className="trade-no-content">Looks like there is no news.</div>
                                        </Tab>
                                    </Tabs>
                                </div>
                            </div>
                        </div>
                    </div>            
                    <div className={showIndex==1?`dex-aggregator-container open`:`dex-aggregator-container`}>
                        <div className="dex-aggregator-section">
                            <div className="title mt-2">
                                Sandwich Dex Aggregator                                    
                            </div>
                            <FormControl fullWidth className="mt-4 aggregator-input">
                                <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
                                <OutlinedInput
                                    
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    endAdornment={<InputAdornment position="start"><Button className="max-btn">Max</Button><Button className="token-btn">BNB</Button></InputAdornment>}
                                    label="From"
                                />
                            </FormControl>
                            <div className="d-flex justify-content-center w-100">
                                <IconButton className="mt-3 aggregator-switch-btn" variant="contained"   aria-label="switch"  size="middle">
                                    <VscArrowSwap />
                                </IconButton>                                
                            </div>                                
                            
                            <FormControl fullWidth className="mt-3 aggregator-input" >
                                <InputLabel htmlFor="outlined-adornment-amount">To</InputLabel>
                                <OutlinedInput
                                    
                                    startAdornment={<InputAdornment position="start"></InputAdornment>}
                                    endAdornment={<InputAdornment position="start"><Button className="max-btn">Max</Button><Button className="token-btn">USDT</Button></InputAdornment>}
                                    label="To"
                                />
                            </FormControl>
                            <Button className="connect-wallet-btn mt-3">Connect Wallet</Button>
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <FormControlLabel
                                    className="slidepage-check"
                                    control={
                                    <Checkbox checked={slidePage} onChange={handleChangeSlide} name="slidePage" />
                                    }
                                    label="Slidepage"
                                />
                                <div>

                                <FormControl className="slidepage-percent-input" sx={{width: '100px' }} variant="outlined">
                                    <OutlinedInput
                                        label="-"
                                        value={percent_slide_page}
                                        onChange={handleChangeSlidePercent}
                                        endAdornment={<InputAdornment position="end"><div className="unit-percent">%</div></InputAdornment>}                                                                                
                                    />                                    
                                </FormControl>
                                
                                </div>
                            </div>                                    
                            <div className="summary-card mt-4 mb-3">
                                <div className="summary-title">Summary</div>
                                <div className="summary-item mt-2">
                                    <div className="summary-item-title">BNB Price</div>
                                    <div className="summary-item-value">$416.92</div>
                                </div>
                                <div className="summary-item">
                                    <div className="summary-item-title">SANDWICH Price</div>
                                    <div className="summary-item-value">$0.92464</div>
                                </div>
                            </div>
                        </div>
                        <div className="dex-aggregator-section learn-more-section mt-3">
                            <div className="title">
                                Learn more about our tools on Sandwich
                            </div>
                            <Button className="learn-more-btn">Learn More</Button>
                        </div>                            
                    </div>
                    <div className="chart-actions">
                        <Button className={showIndex==0?`chart-action active`:`chart-action`} onClick={()=>{setShowIndex(0)}}><MdStackedLineChart /></Button>
                        <Button className={showIndex==1?`chart-action active`:`chart-action`} onClick={()=>{setShowIndex(1)}}><FaRegEdit /></Button>
                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Chart;