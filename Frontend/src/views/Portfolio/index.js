import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, Navigate, Link, Outlet} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import { useWeb3Context } from "../../hooks/web3";

import {Button} from "react-bootstrap";
import {BsThreeDotsVertical, BsPlusCircleFill, BsTrash} from "react-icons/bs";
import {MdHelp, MdOutlineContentCopy, MdDelete} from "react-icons/md";
import {HiPlusCircle} from "react-icons/hi";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


import WalletManagement from "./WalletManagement";
import PortfolioTokens from "./Tokens";
import PortfolioOverview from "./Overview";


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

    const chain = useSelector((state) => state.network.name);
    const [selectedAddress, setAddress] = useState("0xb4d78a81bb7f6d01dd9d053bff002e33aa2f7146");
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
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
                        <Box sx={style}>
                            <WalletManagement />                            
                        </Box>
                    </Modal>
                </div>
            </div>            
            <Outlet  />
            
            
        </>
        );
}

export default Portfolio;