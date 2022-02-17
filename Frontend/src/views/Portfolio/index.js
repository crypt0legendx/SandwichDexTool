import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import axios from 'axios';

import {Button} from "react-bootstrap";
import {BsThreeDotsVertical} from "react-icons/bs";
import {MdHelp} from "react-icons/md";
import { Link } from "react-router-dom";

import "./style.css";


function Portfolio() {

    const chain = useSelector((state) => state.network.name);
    const [dominantToken, setDominantToken] = useState(null);
    const [tokens, setTokens] = useState([]);
    const [totalTokenCount, setTotalTokenCount] = useState(0);
    const [holdings, setHoldings] = useState({totalsWorth:null, tokensWorth:null, defiWorth:null, nftWorth:null});
    const [selectedAddress, setAddress] = useState("0xb4d78a81bb7f6d01dd9d053bff002e33aa2f7146");

    useEffect(()=>{
        getBalances();
        getHoldings();
    },[selectedAddress, chain]);

    const getBalances = () =>{

        axios.get(`http://localhost:4000/third-api/balances-overview/${chain}/${selectedAddress}`)
            .then(function (response) {
                console.log('getBalances');
                console.log(response.data);
                setDominantToken(response.data.dominantToken);
                setTokens(response.data.tokens);
                setTotalTokenCount(response.data.totalTokensCount);
                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
        });        
        
    }

    const getHoldings = () =>{

        axios.get(`http://localhost:4000/third-api/holdings-account/${chain}/${selectedAddress}`)
            .then(function (response) {
                console.log('getHoldings');
                console.log(response.data);
                setHoldings(response.data);
                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
        });        
        
    }


    const getbBriefWalletAddress = (address)=>{
        return String(address).substring(0, 4) +"..." +String(address).substring(38);
    }



    return ( 
        <>
            <div className="row mt-3">
                <div className="col-md-12">
                    <Button id="wallet-dropdown-button">
                            {getbBriefWalletAddress(selectedAddress)}&nbsp;
                            <BsThreeDotsVertical />
                    </Button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 mt-3">
                    <div className="worth-card bg-light-gray">
                        <div className="title">
                            Net Worth &nbsp;<MdHelp />
                        </div>
                        <div className="value">
                            {
                                holdings.totalWorth?'$'+holdings.totalWorth.toFixed(2):'-'
                            }
                        </div>
                        <div className="percent">
                            {
                                holdings.totalWorth?
                                <span className={holdings.changes.totalWorth.percentage>=0?'text-success':'text-danger'}>
                                    {holdings.changes.totalWorth.percentage+'%'}&nbsp;
                                    (${holdings.changes.totalWorth.value})
                                </span>:''
                                
                            }                            
                        </div>
                    </div>
                </div>
                <div className="col-md-8 mt-3">
                    <div className=" bg-light-gray">
                        <div className="row">                            
                            <div className="col-md-4">
                                <div className="worth-card">
                                    <div className="title">
                                        Tokens Worth
                                    </div>
                                    <div className="value">
                                        {
                                            holdings.tokensWorth?'$'+holdings.tokensWorth.toFixed(2):'-'
                                        }
                                    </div>
                                    <div className="percent">
                                        {
                                            holdings.tokensWorth?
                                            <span className={holdings.changes.tokensWorth.percentage>=0?'text-success':'text-danger'}>
                                                {holdings.changes.tokensWorth.percentage+'%'}&nbsp;
                                                (${holdings.changes.tokensWorth.value})
                                            </span>:''
                                            
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="worth-card">
                                    <div className="title">
                                        DeFi Worth
                                    </div>
                                    <div className="value">
                                        {
                                            holdings.defiWorth?'$'+holdings.defiWorth.toFixed(2):'-'
                                        }
                                    </div>
                                    <div className="percent">
                                        {
                                            holdings.defiWorth?
                                            <span className={holdings.changes.defiWorth.percentage>=0?'text-success':'text-danger'}>
                                                {holdings.changes.defiWorth.percentage+'%'}&nbsp;
                                                (${holdings.changes.defiWorth.value})
                                            </span>:''
                                            
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="worth-card">
                                    <div className="title">
                                        NFTS Worth
                                    </div>
                                    <div className="value">
                                        {
                                            holdings.nftWorth?'$'+holdings.nftWorth.toFixed(2):'-'
                                        }                               
                                    </div>
                                    <div className="percent">
                                        {
                                            holdings.nftWorth?
                                            <span className={holdings.changes.nftWorth.percentage>=0?'text-success':'text-danger'}>
                                                {holdings.changes.nftWorth.percentage+'%'}&nbsp;
                                                (${holdings.changes.nftWorth.value})
                                            </span>:''
                                            
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7 mt-3">
                    <div className="dominant-token-card bg-light-gray">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="token-info">
                                    <div className="title">
                                        Dominant Token
                                    </div>
                                    {
                                            dominantToken!=null?
                                            <div className="token-info-body">
                                        
                                                <div className="d-flex align-items-center">
                                                    <img className="p-token-logo" src={dominantToken.logoUrl} />
                                                    <div className="p-token-symbol ml-2">
                                                        {dominantToken.token.toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="p-token-value">
                                                    ${dominantToken.value} ({dominantToken.percentage})
                                                </div>
                                            </div>:
                                            <div className="token-info-body">-</div>
                                    }
                                    
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="token-count">
                                    <div className="title">
                                        Tokens                                        
                                    </div>
                                    <div className="value">
                                        {totalTokenCount}                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12 overview-tokens-list">
                                {
                                    tokens.slice(0, 5).map((d,i)=>{
                                        return <div className="dominant-token-item" key={i}>
                                                    <div className="d-flex align-items-center">
                                                        <img className="p-token-logo" src={d.images.thumb} />
                                                        <div className="ml-2">
                                                            <div className="pd-token-name">{d.title.toUpperCase()}</div>
                                                            <div className="pd-token-value">{d.amount.toFixed(4)}&nbsp;{d.token.toUpperCase()}&nbsp;•&nbsp;${d.nominalValueFiat.coinPriceFiat}</div>                                                             
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="pd-token-worth">${d.value.toFixed(4)}</div>
                                                        <div 
                                                        className={parseFloat(d.change.status)>=0?"pd-token-value text-right text-success":"pd-token-value text-right text-danger"}>
                                                            {d.change.status}&nbsp; (${d.change.value})
                                                        </div>
                                                    </div>
                                                </div>
                                    })
                                }
                                
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <Button className="p-open-token-btn mt-4">Open Tokens</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="nft-token-card bg-light-gray">
                        <div className="title">NFT</div>
                        <div className="no-data">
                            <img className=" mt-4" src="assets/images/Portfolio/nodata.png" />
                            <div className="nodata-description mt-4">
                                No NFTS detected in this wallet
                            </div>
                            <Button className="discover-nft-btn mt-5">Discover NFTs</Button>
                        </div>
                    </div>                    
                </div>
            </div>
        </>
        );
}

export default Portfolio;