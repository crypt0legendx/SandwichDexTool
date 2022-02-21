import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {BsThreeDotsVertical, BsPlusCircleFill, BsTrash} from "react-icons/bs";
import {MdHelp, MdOutlineContentCopy, MdDelete} from "react-icons/md";
import {HiPlusCircle} from "react-icons/hi";

import {Button} from "react-bootstrap";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useWeb3Context } from "../../../hooks/web3";
import {setCurrentAddress} from "../../../store/slices/tracking-slice";

import ClickTooltip from "./ClickTooltip";

function WalletManagement(props){

    const dispatch = useDispatch();
    const browserWidth = useSelector((state) => state.app.browserWidth);

    const { connect, disconnect, connected, address } = useWeb3Context();
    const [watchList, setWatchList] = useState([]);
    const [recentList, setRecentList] = useState([]);
    const [inputAddress, setInputAddress] = useState("");

    useEffect(()=>{
        initialWalletInfo();
    },[])

    const initialWalletInfo = () =>{    
        const watch_list = JSON.parse(localStorage.getItem('watch_list'))||[];        
        const recent_list = JSON.parse(localStorage.getItem('recent_viewed_wallets'))||[];        
        setWatchList(watch_list);
        setRecentList(recent_list);
    }

    const clickedAddress = (addr) =>{
        dispatch(setCurrentAddress(addr));
        const recent_lists = [...recentList];
        if(recent_lists[recent_lists.length-1] !==addr){
            recent_lists.push(addr);
            if(recent_lists.length>5){
                setRecentList(recent_lists.slice(1, 6));
                localStorage.setItem('recent_viewed_wallets', JSON.stringify(recent_lists.slice(1, 6)));
            }else{
                setRecentList(recent_lists.slice(0, 5));
                localStorage.setItem('recent_viewed_wallets', JSON.stringify(recent_lists.slice(0, 5)));
            }
            
            
        }else{
            //if already address is existed in watch list, exception handle
        }
        props.handleClose();
    }

    const addWallet = () => {
        console.log("add");
        if(checkWallet(inputAddress)){
            //add wallet to watch list
            console.log('checked');
            const watch_lists = [...watchList];
            if(!watch_lists.includes(inputAddress)){
                console.log('push');
                watch_lists.push(inputAddress);
                setWatchList(watch_lists);
                localStorage.setItem('watch_list', JSON.stringify(watch_lists));
                
            }else{
                //if already address is existed in watch list, exception handle
            }            
        }else{
            // exception handle.
        }
    }

    const recentToWatchList = (addr) => {
        console.log("move");
        //add wallet to watch list
        console.log('checked');
        const watch_lists = [...watchList];
        if(!watch_lists.includes(addr)){
            console.log('push');
            watch_lists.push(addr);
            setWatchList(watch_lists);
            localStorage.setItem('watch_list', JSON.stringify(watch_lists));
            
        }else{
            //if already address is existed in watch list, exception handle
        }            
        
    }

    const removeWallet = (w) =>{
        console.log('removeWallet');
        let watch_lists = [...watchList];
        const idx =  watch_lists.findIndex(d=>d === w);
        if(idx!=-1){
            console.log('exist', idx);
            watch_lists.splice(idx, 1);
            setWatchList(watch_lists);
            localStorage.setItem('watch_list', JSON.stringify(watch_lists));
        }
    }

    const clearRecent = () =>{
        console.log('clear');
        let recent_lists = [recentList[recentList.length-1]];
        setRecentList(recent_lists);
        localStorage.setItem('recent_viewed_wallets', JSON.stringify(recent_lists));
    }

    const copyWallet = (w)=>{
        navigator.clipboard.writeText(w);

    }

    const changedInputValue =(e) =>{
        setInputAddress(e.target.value);
    }

    const checkWallet = (address) =>{
        if(address == "")
            return false;
        return true;
    }

    const getbBriefWalletAddress = (address)=>{
        return String(address).substring(0, 4) +"..." +String(address).substring(38);
    }

    return(
        <>
            <div className="wallet-management">

                <Typography id="modal-modal-title" className="wallet-management-title" variant="h6" component="h2">
                    Wallet Management
                </Typography>
                {
                    connected?
                    <div className="account-info mt-3">
                        <div className="wallet-management-subtitle">Account&nbsp;<small><MdHelp /></small></div>
                        <div className="wallet-items">
                            <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                    <button className="link-btn" onClick={()=>clickedAddress(address)}>
                                        <span className="wallet-name ml-2">
                                        {
                                            browserWidth>768?address:getbBriefWalletAddress(address)
                                        }
                                        </span>
                                    </button>
                                </div>                                    
                                <div className="d-flex align-items-center">
                                    <ClickTooltip onClick={()=>copyWallet(address)}><MdOutlineContentCopy /></ClickTooltip>
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
                        <Button className="add-wallet-btn" onClick={()=>addWallet()} >Add Wallet</Button>
                    </div>
                    <div className="mt-2">
                        <input className="wallet-add-input" onChange={(e)=>changedInputValue(e)} />
                    </div>                    
                    {
                        watchList.length>0&&(
                        <div className="wallet-items watch-lists mt-2">
                            {
                                [...watchList].reverse().map((w,i)=>{
                                return <div key={i} className="wallet-item d-flex flex-wrap align-items-center justify-content-between">                                            
                                            <div className="d-flex align-items-center">
                                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${w}.svg`} />
                                                <button className="link-btn" onClick={()=>clickedAddress(w)}>
                                                    <span className="wallet-name ml-2">
                                                    {
                                                        browserWidth>768?w:getbBriefWalletAddress(w)
                                                    }
                                                    </span>
                                                </button>
                                            </div>                                    
                                            <div className="d-flex align-items-center">
                                                <ClickTooltip onClick={()=>copyWallet(w)}><MdOutlineContentCopy /></ClickTooltip>
                                                <button onClick={()=>removeWallet(w)} className="wallet-item-action ml-1"><MdDelete /></button>
                                            </div>
                                        </div>    
                                })
                            }
                        </div>
                        )
                    }                                                
                    
                    {
                        watchList.length===0&&(
                        <div className="no-watch-list mt-2">
                            You can save wallets to your watchlist and come back to them later. Tap ‘+’ in the recent list or ‘Add Wallet’ to connect a wallet.
                        </div>)
                    }                                
                </div>
                <div className="recently-viewed mt-4">
                    <div className="wallet-management-subtitle">Recently viewed&nbsp;<small><MdHelp /></small></div>
                    
                    {
                        recentList.length>0&&(
                            <div className="wallet-items mt-2">
                            {
                                [...recentList].reverse().map((w,i)=>{
                                return <div key={i} className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${w}.svg`} />
                                                <button className="link-btn" onClick={()=>clickedAddress(w)}>
                                                    <span className="wallet-name ml-2">
                                                    {
                                                        browserWidth>768?w:getbBriefWalletAddress(w)
                                                    }
                                                    </span>
                                                </button>
                                            </div>                                    
                                            <div className="d-flex align-items-center">
                                                <ClickTooltip onClick={()=>copyWallet(w)}><MdOutlineContentCopy /></ClickTooltip>
                                                <button className="wallet-item-action ml-1" onClick={()=>recentToWatchList(w)}><HiPlusCircle /></button>
                                            </div>
                                        </div>                                                                                                                                         
                                })
                            }
                            {
                                recentList.length>1&&<button className="link-btn clear-btn mt-2" onClick={()=>clearRecent()}>Clear All</button>
                            }
                            
                            </div>
                        )
                    }
                    
                    {
                        recentList.length===0&&(
                        <div className="no-watch-list mt-2">
                            The last five wallets you viewed will be shown here
                        </div>
                        )
                    }                       
                </div>
            </div>
        </>
    )
}

export default WalletManagement;