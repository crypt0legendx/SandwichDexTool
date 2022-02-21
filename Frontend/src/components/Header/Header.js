import React,{useEffect} from "react";
import {RiNotification2Line} from "react-icons/ri";
import {Dropdown} from "react-bootstrap";
import ConnectWallet from "../ConnectWallet";
import {useSelector, useDispatch} from "react-redux";
import {changeNetwork} from "../../store/slices/network-slice";


import "./Header.css";
import SearchComplete from "../SearchComplete";
import useInitialize from "../../hooks/useInitialize";

function Header(props) {
    const browserWidth = useSelector((state) => state.app.browserWidth);
    const network = useSelector((state) => state.network.name);    
    const dispatch = useDispatch();

    const {initializeApp} = useInitialize();

    useEffect(() => {
        console.log('refresh');
        changedNetwork("Ethereum");
    }, []);


    const changedNetwork = async(chain) => {
            let scanurl="";
            if(chain==="Ethereum"){
                scanurl="https://etherscan.io"
            }
            if(chain==="BSC"){
                scanurl="https://bscscan.com"
            }
            if(chain==="Polygon"){
                scanurl="https://polygonscan.com"
            }
            dispatch(changeNetwork({name:chain, scanurl:scanurl}));
            initializeApp(chain);            
    }
    return ( 
        <>
        <nav className="navbar navbar-expand-md fixed-top ">
            <a className="navbar-brand " href="# ">
                <img src="../../../assets/images/Logo/logo.png" alt="logo" />
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
            {
                    browserWidth<=525?
                    <button onClick={()=>props.setOpen()} className="navbar-toggler navbar-light " type="button " data-toggle="collapse " data-target="#main-navigation ">
                        <span className="navbar-toggler-icon "></span>
                    </button>:''
            }
            {
                browserWidth>1028?<SearchComplete />:''
            }
            <div className="d-flex align-items-center">
                {
                    browserWidth<=1028?<SearchComplete />:''
                }
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
                {
                    browserWidth>525?
                    <button onClick={()=>props.setOpen()} className="navbar-toggler navbar-toggler-md navbar-light " type="button " data-toggle="collapse " data-target="#main-navigation ">
                        <span className="navbar-toggler-icon "></span>
                    </button>:''         
                }
            </div>   
            
            
        </nav>
    </>
    );
}

export default Header;