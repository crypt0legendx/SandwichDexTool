import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import axios from 'axios';

import {Button} from "react-bootstrap";
import {MdHelp} from "react-icons/md";
import Skeleton from '@mui/material/Skeleton';

function PortfolioTokens(){

    const chain = useSelector((state) => state.network.name);
    const [selectedAddress, setAddress] = useState("0xb4d78a81bb7f6d01dd9d053bff002e33aa2f7146");
    
    const [load_holding, setLoadHolding] =  useState(true);
    const [holdings, setHoldings] = useState({totalsWorth:null, tokensWorth:null, defiWorth:null, nftWorth:null});
    const [load_tokens, setLoadTokens] = useState(false);
    const [tokens, setTokens] = useState([]);

    useEffect(()=>{
        if(selectedAddress!=""){
            getTokens();            
        }        
    },[selectedAddress, chain]);

    const getTokens = () =>{

        setLoadTokens(true);
        axios.get(`http://localhost:4000/third-api/balances-overview/${chain}/${selectedAddress}/all`)
            .then(function (response) {
                console.log('getTokens');                
                setTokens(response.data.tokens);
                setLoadTokens(false);
                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
        });        
        
    }

    return (
        <>
            <div className="row">
                <div className="col-md-6 mt-3">
                    <div className="worth-card bg-light-gray">
                        <div className="title">
                            Tokens Worth &nbsp;<MdHelp />
                        </div>
                        <div className="value">                            
                            {
                                load_holding?
                                <Skeleton animation="wave" width={100} height={30} />:
                                holdings.totalWorth?'$'+holdings.totalWorth.toFixed(2):'-'
                            }
                            
                        </div>
                        <div className="percent">
                            {   load_holding?
                                <Skeleton animation="wave" width={100} height={15} />:
                                (
                                    holdings.totalWorth?
                                    <span className={holdings.changes.totalWorth.percentage>=0?'text-success':'text-danger'}>
                                        {holdings.changes.totalWorth.percentage+'%'}&nbsp;
                                        (${holdings.changes.totalWorth.value})
                                    </span>:''
                                )                                
                            }                                                    
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mt-3">
                    <div className="worth-card bg-light-gray">
                        <div className="title">
                            DeFi Worth &nbsp;<MdHelp />
                        </div>
                        <div className="value">                            
                            {
                                load_holding?
                                <Skeleton animation="wave" width={100} height={30} />:
                                holdings.totalWorth?'$'+holdings.totalWorth.toFixed(2):'-'
                            }
                            
                        </div>
                        <div className="percent">
                            {   load_holding?
                                <Skeleton animation="wave" width={100} height={15} />:
                                (
                                    holdings.totalWorth?
                                    <span className={holdings.changes.totalWorth.percentage>=0?'text-success':'text-danger'}>
                                        {holdings.changes.totalWorth.percentage+'%'}&nbsp;
                                        (${holdings.changes.totalWorth.value})
                                    </span>:''
                                )                                
                            }                                                    
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7 mt-3">
                    <div className="dominant-token-card bg-light-gray">                        
                        <div className="row mt-2">
                            <div className="col-md-12 overview-tokens-list">
                                {
                                    load_tokens?
                                    (new Array(5).fill(0).map((d,i)=>{
                                        return <div className="dominant-token-item" key={i}>
                                                    <div className="d-flex align-items-center">
                                                        <Skeleton animation="wave" variant="circular" width={30} height={30} />
                                                        <div className="ml-2">
                                                            <div className="pd-token-name">
                                                                <Skeleton animation="wave" width={100} height={12} />
                                                            </div>
                                                            <div className="pd-token-value mt-1">
                                                                <Skeleton animation="wave" width={100} height={5} />
                                                            </div>                                                             
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="pd-token-worth">
                                                            <Skeleton animation="wave" width={50} height={10} />
                                                        </div>
                                                        <div className="pd-token-value text-right mt-1">
                                                            <Skeleton animation="wave" width={50} height={5} />
                                                        </div>
                                                    </div>
                                                </div>
                                    })):
                                    (tokens.map((d,i)=>{
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
                                                        {
                                                            d.change&&
                                                            <div className={parseFloat(d.change.status)>=0?"pd-token-value text-right text-success":"pd-token-value text-right text-danger"}>
                                                                {d.change.status}&nbsp; (${d.change.value})
                                                            </div>
                                                        }
                                                        
                                                    </div>
                                                </div>
                                    }))
                                }
                                
                                
                            </div>
                        </div>                        
                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="nft-token-card bg-light-gray">
                        <div className="title">DeFi Saving</div>
                        <div className="no-data">
                            <img className=" mt-4" src="../assets/images/Portfolio/nodata.png" />
                            <div className="nodata-description mt-4">
                                No deposits detected for this wallet
                            </div>
                            <Button className="discover-nft-btn mt-5">Discover DeFi</Button>
                        </div>
                    </div>                    
                </div>
            </div>
        </>
    )
}


export default PortfolioTokens