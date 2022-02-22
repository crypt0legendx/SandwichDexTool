import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import axios from 'axios';

import {Button} from "react-bootstrap";
import {MdHelp} from "react-icons/md";
import Skeleton from '@mui/material/Skeleton';

function PortfolioTokens(){

    const chain = useSelector((state) => state.network.name);
    const selectedAddress = useSelector((state) => state.tracking.currentAddress);

    const [load_tokens, setLoadTokens] = useState(false);
    const [tokens, setTokens] = useState([]);
    const [tokens_summary, setTokensSummary] = useState(null);
    const [defies_summary, setDefiesSummary] = useState(null);

    const [load_defies, setLoadDefies] = useState(false);
    const [defies, setDefies] = useState(null);

    useEffect(()=>{
        if(selectedAddress!=""){
            getTokens();  
            setTimeout(() => {
                getDefiAssets();    
            }, 1000);          
            
        }        
    },[selectedAddress, chain]);

    const getTokens = () =>{

        setLoadTokens(true);
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/third-api/balances-overview/${chain}/${selectedAddress}/all`)
            .then(function (response) {
                console.log('getTokens');                
                setTokens(response.data.tokens);
                setTokensSummary(response.data.summary);
                setLoadTokens(false);
                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
        });        
        
    }

    const getDefiAssets = () =>{

        setLoadDefies(true);
        axios.get(`${process.env.REACT_APP_DOMAIN_URL}/third-api/defi-assets/${chain}/${selectedAddress}`)
            .then(function (response) {
                console.log('getDefies');                
                setDefies(response.data.asset);
                setDefiesSummary(response.data.totals.worth);
                setLoadDefies(false);
                
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
                                load_tokens?
                                <Skeleton animation="wave" width={100} height={30} />:
                                tokens_summary!==null?
                                (
                                    tokens_summary.nominalValueFiat.valueFiat>0?'$'+tokens_summary.nominalValueFiat.valueFiat.toFixed(2):'-'
                                ):'-'
                            }
                            
                        </div>
                        <div className="percent">
                            {   load_tokens?
                                <Skeleton animation="wave" width={100} height={15} />:
                                (
                                    tokens_summary!==null?
                                    <span className={tokens_summary.change.label=="negative"?'text-danger':'text-success'}>
                                        {tokens_summary.change.status}&nbsp;
                                        {tokens_summary.change.value>0?`($${tokens_summary.change.value})`:''}
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
                                load_defies?
                                <Skeleton animation="wave" width={100} height={30} />:
                                defies_summary!==null?
                                (
                                    defies_summary.valueFiat>0?'$'+defies_summary.valueFiat.toFixed(2):'-'
                                ):
                                '-'
                            }
                            
                        </div>
                        <div className="percent">
                            {   load_defies?
                                <Skeleton animation="wave" width={100} height={15} />:
                                (
                                    defies_summary!==null?
                                    <span className={defies_summary.change.label=="negative"?'text-danger':'text-success'}>
                                        {defies_summary.change.status}&nbsp;
                                        {defies_summary.change.value>0?`($${defies_summary.change.value})`:''}
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
                                    (
                                        tokens.length>0?
                                        (
                                            tokens.map((d,i)=>{
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
                                            })
                                        ):
                                        (
                                            <div className="no-data">
                                                <img className=" mt-4" src="../assets/images/Portfolio/nodata.png" />
                                                <div className="nodata-description mt-4">
                                                    No tokens detected for this wallet
                                                </div>                                                
                                            </div>
                                        
                                        )
                                    )
                                }
                                
                                
                            </div>
                        </div>                        
                    </div>
                </div>
                <div className="col-md-5 mt-3">
                    <div className="nft-token-card bg-light-gray">
                        <div className="title">DeFi Saving</div>
                        {
                            load_defies?
                            (new Array(5).fill(0).map((d,i)=>{
                                return <div className="dominant-token-item" key={i}>
                                            <div className="d-flex align-items-center">
                                                <Skeleton animation="wave" variant="circular" width={30} height={30} />
                                                <div className="ml-2">
                                                    <div className="pd-token-name">
                                                        <Skeleton animation="wave" width={70} height={20} />
                                                    </div>                                                                                                    
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center">
                                                <div className="pd-token-worth">
                                                    <Skeleton animation="wave" width={50} height={20} />
                                                </div>
                                                <div className="pd-token-value text-right ml-1">
                                                    <Skeleton animation="wave" variant="circular" width={20} height={20} />
                                                </div>
                                            </div>
                                        </div>
                            })):
                            (
                                defies != null?
                                (
                                    '-'
                                ):
                                <div className="no-data">
                                    <img className=" mt-4" src="../assets/images/Portfolio/nodata.png" />
                                    <div className="nodata-description mt-4">
                                        No deposits detected for this wallet
                                    </div>
                                    <Button className="discover-nft-btn mt-5">Discover DeFi</Button>
                                </div>
                            )                            
                        }                        
                    </div>                    
                </div>
            </div>
        </>
    )
}


export default PortfolioTokens