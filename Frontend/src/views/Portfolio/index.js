import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import axios from 'axios';
import { Link } from "react-router-dom";

import { useWeb3Context } from "../../hooks/web3";

import {Button} from "react-bootstrap";
import {BsThreeDotsVertical, BsPlusCircleFill} from "react-icons/bs";
import {MdHelp, MdOutlineContentCopy} from "react-icons/md";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Skeleton from '@mui/material/Skeleton';


import "./style.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '660px',
    maxWidth:'96%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

function Portfolio() {

    const { connect, disconnect, connected, address } = useWeb3Context();

    const chain = useSelector((state) => state.network.name);
    const [dominantToken, setDominantToken] = useState(null);
    const [tokens, setTokens] = useState([]);
    const [totalTokenCount, setTotalTokenCount] = useState(0);
    const [holdings, setHoldings] = useState({totalsWorth:null, tokensWorth:null, defiWorth:null, nftWorth:null});
    const [load_holding, setLoadHolding] = useState(false);
    const [load_tokens, setLoadTokens] = useState(false);


    const [selectedAddress, setAddress] = useState("0xb4d78a81bb7f6d01dd9d053bff002e33aa2f7146");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        if(selectedAddress!=""){
            getBalances();
            getHoldings();
        }        
    },[selectedAddress, chain]);

    const getBalances = () =>{

        setLoadTokens(true);
        axios.get(`http://localhost:4000/third-api/balances-overview/${chain}/${selectedAddress}`)
            .then(function (response) {
                console.log('getBalances');
                console.log(response.data);
                setDominantToken(response.data.dominantToken);
                setTokens(response.data.tokens);
                setTotalTokenCount(response.data.totalTokensCount);
                setLoadTokens(false);
                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
        });        
        
    }
    const getHoldings = () =>{

        setLoadHolding(true);
        axios.get(`http://localhost:4000/third-api/holdings-account/${chain}/${selectedAddress}`)
            .then(function (response) {
                console.log('getHoldings');
                console.log(response.data);
                setHoldings(response.data);
                setLoadHolding(false);
                
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
                    <Button  onClick={handleOpen} id="wallet-dropdown-button">
                            {getbBriefWalletAddress(selectedAddress)}&nbsp;
                            <BsThreeDotsVertical />
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box className="wallet-management"  sx={style}>
                            <Typography id="modal-modal-title" className="wallet-management-title" variant="h6" component="h2">
                                Wallet Management
                            </Typography>
                            {
                                connected?
                                <div className="account-info mt-3">
                                    <div className="wallet-management-subtitle">Account&nbsp;<small><MdHelp /></small></div>
                                    <div className="wallet-itmes">
                                        <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                                <span className="wallet-name ml-2">{address}</span>
                                            </div>                                    
                                            <div className="d-flex align-items-center">
                                                <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>:
                                <div className="no-watch-list mt-4">
                                    <button className="wm-connect-btn" onClick={()=>connect()}>Connect</button> Sync and track your wallet with ease
                                </div>
                            }
                                                
                            
                            <div className="watch-list mt-4">
                                <div className="d-flex justify-content-between">
                                    <div className="wallet-management-subtitle">Watchlist&nbsp;<small><MdHelp /></small></div>
                                    <Button className="add-wallet-btn">Add Wallet</Button>
                                </div>
                                <div className="wallet-itmes mt-2">
                                    <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                            <span className="wallet-name ml-2">{address}</span>
                                        </div>                                    
                                        <div className="d-flex align-items-center">
                                            <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                            <button className="wallet-item-action ml-1"><BsThreeDotsVertical /></button>
                                        </div>
                                    </div>
                                    <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                            <span className="wallet-name ml-2">{address}</span>
                                        </div>                                    
                                        <div className="d-flex align-items-center">
                                            <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                            <button className="wallet-item-action ml-1"><BsThreeDotsVertical /></button>
                                        </div>
                                    </div>
                                    <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                            <span className="wallet-name ml-2">{address}</span>
                                        </div>                                    
                                        <div className="d-flex align-items-center">
                                            <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                            <button className="wallet-item-action ml-1"><BsThreeDotsVertical /></button>
                                        </div>
                                    </div>
                                    <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                            <span className="wallet-name ml-2">{address}</span>
                                        </div>                                    
                                        <div className="d-flex align-items-center">
                                            <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                            <button className="wallet-item-action ml-1"><BsThreeDotsVertical /></button>
                                        </div>
                                    </div>
                                </div>                                
                                {/* <div className="no-watch-list mt-2">
                                    You can save wallets to your watchlist and come back to them later. Tap ‘+’ in the recent list or ‘Add Wallet’ to connect a wallet.
                                </div> */}
                            </div>
                            <div className="recently-viewed mt-4">
                                <div className="wallet-management-subtitle">Recently viewed&nbsp;<small><MdHelp /></small></div>
                                <div className="no-watch-list mt-2">
                                    There is no viewed history
                                </div>
                            </div>
                        </Box>
                    </Modal>
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
                                load_holding?
                                <Skeleton animation="wave" width={"100%"} height={30} />:
                                holdings.totalWorth?'$'+holdings.totalWorth.toFixed(2):'-'
                            }
                            
                        </div>
                        <div className="percent">
                            {   load_holding?
                                <Skeleton animation="wave" width={"100%"} height={15} />:
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
                                            load_holding?
                                            <Skeleton animation="wave" width={"100%"} height={30} />:
                                            holdings.tokensWorth?'$'+holdings.tokensWorth.toFixed(2):'-'
                                        }
                                    </div>
                                    <div className="percent">
                                        {   load_holding?
                                            <Skeleton animation="wave" width={"100%"} height={15} />:
                                            (
                                                holdings.tokensWorth?
                                                <span className={holdings.changes.tokensWorth.percentage>=0?'text-success':'text-danger'}>
                                                    {holdings.changes.tokensWorth.percentage+'%'}&nbsp;
                                                    (${holdings.changes.tokensWorth.value})
                                                </span>:''
                                            )
                                            
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
                                        {   load_holding?
                                            <Skeleton animation="wave" width={"100%"} height={30} />:
                                            holdings.defiWorth?'$'+holdings.defiWorth.toFixed(2):'-'
                                        }
                                    </div>
                                    <div className="percent">
                                        {   load_holding?
                                            <Skeleton animation="wave" width={"100%"} height={15} />:
                                            (
                                                holdings.defiWorth?
                                                <span className={holdings.changes.defiWorth.percentage>=0?'text-success':'text-danger'}>
                                                    {holdings.changes.defiWorth.percentage+'%'}&nbsp;
                                                    (${holdings.changes.defiWorth.value})
                                                </span>:''                                            
                                            )
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
                                            {load_holding?
                                            <Skeleton animation="wave" width={"100%"} height={30} />:
                                            holdings.nftWorth?'$'+holdings.nftWorth.toFixed(2):'-'
                                        }                               
                                    </div>
                                    <div className="percent">
                                        {   load_holding?
                                            <Skeleton animation="wave" width={"100%"} height={15} />:
                                            (
                                                holdings.nftWorth?
                                                <span className={holdings.changes.nftWorth.percentage>=0?'text-success':'text-danger'}>
                                                    {holdings.changes.nftWorth.percentage+'%'}&nbsp;
                                                    (${holdings.changes.nftWorth.value})
                                                </span>:''                                            
                                            )
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
                                    { load_tokens?
                                        (
                                            <div className="token-info-body align-items-center">                                        
                                                <div className="d-flex align-items-center">
                                                    <Skeleton animation="wave" variant="circular" width={30} height={30} />
                                                    <div className="p-token-symbol ml-2">
                                                        <Skeleton animation="wave" width={100} height={20} />
                                                    </div>
                                                </div>
                                                <div className="p-token-value">
                                                    <Skeleton animation="wave" width={100} height={20} />
                                                </div>
                                            </div>
                                        ):
                                        (dominantToken!=null?
                                            (<div className="token-info-body">                                    
                                                <div className="d-flex align-items-center">
                                                    <img className="p-token-logo" src={dominantToken.logoUrl} />
                                                    <div className="p-token-symbol ml-2">
                                                        {dominantToken.token.toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="p-token-value">
                                                    ${dominantToken.value} ({dominantToken.percentage})
                                                </div>
                                            </div>):
                                            (<div className="token-info-body">-</div>)
                                        )
                                    }                                    
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="token-count">
                                    <div className="title">
                                        Tokens                                        
                                    </div>
                                    <div className="value d-flex align-items-center justify-content-center">
                                        { load_tokens?
                                          <Skeleton animation="wave" width={20} height={20} />:
                                          totalTokenCount                                        
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
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
                                    (tokens.slice(0, 5).map((d,i)=>{
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