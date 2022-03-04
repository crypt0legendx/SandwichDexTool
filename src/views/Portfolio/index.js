import React, {useState, useEffect} from "react";
import {  Outlet} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import {Button} from "react-bootstrap";
import {BsThreeDotsVertical} from "react-icons/bs";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {setCurrentAddress} from "../../store/slices/tracking-slice";
import WalletManagement from "./WalletManagement";


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
  };

function Portfolio() {

    const dispatch = useDispatch();

    const chain = useSelector((state) => state.network.name);
    const selectedAddress = useSelector((state) => state.tracking.currentAddress);   

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(()=>{
        initialWalletInfo();
    },[])

    const initialWalletInfo = () =>{
        
        let recentList = JSON.parse(localStorage.getItem('recent_viewed_wallets'))||[];                
        if(recentList.length===0){
            dispatch(setCurrentAddress(""))
        }else{
            dispatch(setCurrentAddress(recentList[recentList.length-1]));
        }
    }
    
    const getbBriefWalletAddress = (address)=>{
        return String(address).substring(0, 4) +"..." +String(address).substring(38);
    }


    return ( 
        <>
            <div className="row mt-3">
                <div className="col-md-12">
                    <Button  onClick={handleOpen} id="wallet-dropdown-button">
                            {
                                selectedAddress!=""?
                                getbBriefWalletAddress(selectedAddress):
                                "No Wallet"
                            }&nbsp;
                            <BsThreeDotsVertical />
                    </Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        className="wallet-management-modal"
                    >                    
                        <Box sx={style}>
                            <WalletManagement handleClose={handleClose} />                            
                        </Box>
                    </Modal>
                </div>
            </div>            
            <Outlet  />
            
            
        </>
        );
}

export default Portfolio;