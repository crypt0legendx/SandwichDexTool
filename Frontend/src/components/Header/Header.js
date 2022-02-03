import React,{useEffect} from "react";
import axios from 'axios';
import {RiNotification2Line, RiSearchLine} from "react-icons/ri";
import {Dropdown} from "react-bootstrap";
import ConnectWallet from "../ConnectWallet";
import {useSelector, useDispatch} from "react-redux";
import {changeNetwork} from "../../store/slices/network-slice";
import {changeLoading, changeRanking} from "../../store/slices/currencies-slice";

import "./Header.css";

function Header(props) {
    const network = useSelector((state) => state.network.name);
    const dispatch = useDispatch();

    useEffect(() => {
        changedNetwork("Ethereum");
    }, [props]);

    const changedNetwork = async(chain) => {
            dispatch(changeNetwork(chain));
            dispatch(changeLoading(true));
            axios.get(`http://localhost:4000/coin-market-cap/${chain}`)
            .then(function (response) {
                dispatch(changeRanking(response.data));                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
                dispatch(changeLoading(false));
            });
    }
    return ( 
        <>
        <nav className="navbar navbar-expand-md fixed-top ">
            <a className="navbar-brand " href="# ">
                <img src="../../assets/images/logo/logo.png " alt="logo" />
            </a>
            
            <div className="collapse navbar-collapse " id="main-navigation ">
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <a className="nav-link" href="# ">Dashboard</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " href="# ">Trade</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link " href="# ">Chart</a>
                    </li>                   
                </ul>
            </div>
            <button onClick={()=>props.setOpen()} className="navbar-toggler navbar-light " type="button " data-toggle="collapse " data-target="#main-navigation ">
                <span className="navbar-toggler-icon "></span>
            </button>
            <div className = "search">
                <input className="search-field" placeholder="Search..." />
            </div>
            <div className="d-flex">
                <button type="button " className="btn btn-default search-btn "><RiSearchLine /></button>
                <button type="button " className="btn btn-default notification-btn "><RiNotification2Line /></button>
                <Dropdown className="mr-2 ml-2 d-flex align-items-center network-dropdown">
                    <Dropdown.Toggle id="dropdown-basic" className="header-switch-network-btn">
                        <img className="network-logo mr-2" src={`../../assets/images/Networks/${network}.png`} alt="network_logo" />{network}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="network-dropdown-body">
                        <Dropdown.Item onClick={() => changedNetwork("Ethereum")}>Ethereum</Dropdown.Item>
                        <Dropdown.Item onClick={() => changedNetwork("BSC")}>BSC</Dropdown.Item>
                        <Dropdown.Item onClick={() => changedNetwork("Polygon")}>Polygon</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ConnectWallet />
            </div>            
            
        </nav>
    </>
    );
}

export default Header;