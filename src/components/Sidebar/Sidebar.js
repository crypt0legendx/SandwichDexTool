
import {
    RiCopperCoinLine, 
    RiHomeFill,
    RiBarChartBoxLine, 
    RiWallet2Line,
    RiMoreLine,
    RiBarChart2Line,
    RiArrowDownSLine,
    RiArrowUpSLine

} from "react-icons/ri"
import {FaTelegramPlane, FaMedium, FaTwitter} from "react-icons/fa";
import {MdOutlineShowChart,MdOutlineLocalFireDepartment} from "react-icons/md";
import {Dropdown} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useEffect, useState, useCallback} from "react";
import "./Sidebar.css";

import {useSelector, useDispatch} from "react-redux";
import {changeNetwork} from "../../store/slices/network-slice";
import ConnectWallet from "../ConnectWallet";
import SearchComplete from "../SearchComplete";
import useInitialize from "../../hooks/useInitialize";

function Sidebar(props) {

    const dispatch = useDispatch();

    const browserWidth = useSelector((state) => state.app.browserWidth);
    
    const network = useSelector((state) => state.network.name);
    const {initializeApp} = useInitialize();

    const [openSubMenu1, setOpenSubMenu1] = useState(false);
    const [openSubMenu2, setOpenSubMenu2] = useState(false);
    const [refreshVal, setRefreshVal] = useState(1);
    

    let pathname = window.location.pathname;

    const handleAutoClose = useCallback(e => {
        let sidebarMenu = document.getElementById('sidebar-sticky');
        let sidebarBrand = document.getElementById('sidebar-brand');
        if(e.target){
            if(sidebarBrand.contains(e.target)){
                return;
            }
            if(!sidebarMenu.contains(e.target)&&props.isOpen){
                if(e.target.classList){
                    if(!e.target.classList.contains('side-icon')){
                        if(browserWidth<=1028){
                            setOpenState();
                        }
                    }
                }else{
                    if(browserWidth<=1028){
                        setOpenState();
                    }
                }
                                                        
            }
        }
    }, [browserWidth]);
    
    useEffect(() => {
        document.addEventListener("click", handleAutoClose);
        return () => {
            document.removeEventListener("click", handleAutoClose);
        };
    }, [handleAutoClose]);


    useEffect(() => {
        pathname = window.location.pathname;
    }, [window.location.pathname]);

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
            setOpenState();
    }

    const toggleSubmenu1 =() =>{
            if(openSubMenu1 == false){
                setOpenSubMenu2(false);        
            }
            setOpenSubMenu1(!openSubMenu1);
            
    }

    const toggleSubmenu2 =() =>{
        if(openSubMenu2 === false){
            setOpenSubMenu1(false);        
        }
        setOpenSubMenu2(!openSubMenu2);
    }

    const setOpenState = () =>{        
        
        if(browserWidth <= 1028&&props.isOpen){
            if(openSubMenu1){
                setOpenSubMenu1(!openSubMenu1);
            }
            if(openSubMenu2){
                setOpenSubMenu2(!openSubMenu2);
            }
            props.setOpen();
        }
        setRefreshVal(refreshVal+1);
    }
    return ( 
        <>
            <nav id="sidebarMenu" 

                className={props.isOpen?"d-md-block sidebar p-0":"d-md-block sidebar sidebar-collapse p-0"}

            >
                <div id="sidebar-brand" className="sidebar-brand d-flex align-items-center">
                    <span className="side-collapsible">
                        {
                            props.isOpen?
                            <svg onClick={()=>props.setOpen()} viewBox="0 0 24 24" width="24px" color="textSubtle" xmlns="http://www.w3.org/2000/svg" className="active-bars">
                                <path d="M4 18H15C15.55 18 16 17.55 16 17C16 16.45 15.55 16 15 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H12C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H15C15.55 8 16 7.55 16 7C16 6.45 15.55 6 15 6H4C3.45 6 3 6.45 3 7ZM20.3 14.88L17.42 12L20.3 9.12C20.69 8.73 20.69 8.1 20.3 7.71C19.91 7.32 19.28 7.32 18.89 7.71L15.3 11.3C14.91 11.69 14.91 12.32 15.3 12.71L18.89 16.3C19.28 16.69 19.91 16.69 20.3 16.3C20.68 15.91 20.69 15.27 20.3 14.88Z"></path>
                            </svg>:
                            <svg onClick={()=>props.setOpen()} viewBox="0 0 24 24" width="24px" color="textSubtle" xmlns="http://www.w3.org/2000/svg" className="collapsed-bars">
                                <path d="M4 18H20C20.55 18 21 17.55 21 17C21 16.45 20.55 16 20 16H4C3.45 16 3 16.45 3 17C3 17.55 3.45 18 4 18ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM3 7C3 7.55 3.45 8 4 8H20C20.55 8 21 7.55 21 7C21 6.45 20.55 6 20 6H4C3.45 6 3 6.45 3 7Z"></path>
                            </svg>
                        }
                                            
                    </span>
                    <img className="ml-3 sidebar-logo" src="../../../assets/images/Logo/logo.png" alt="logo" />
                </div>
                <div id = "sidebar-sticky" className="sidebar-sticky ">
                    
                    {
                        props.isOpen&&(
                            browserWidth<=768&&
                            <ConnectWallet />
                        )
                    }
                        {
                            props.isOpen&&(
                                <div className="setting-section justify-content-between">
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className="switch-network-btn">
                                        <img className="network-logo mr-2" src={`../../assets/images/Networks/${network}.png`} alt="network_logo" />{network}
                                    </Dropdown.Toggle>
                                        <Dropdown.Menu className="network-dropdown-body"><Dropdown.Item onClick={() => changedNetwork("Ethereum")}>Ethereum</Dropdown.Item>
                                        <Dropdown.Item onClick={() => changedNetwork("BSC")}>BSC</Dropdown.Item>
                                        <Dropdown.Item onClick={() => changedNetwork("Polygon")}>Polygon</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {
                                    browserWidth<=768?<SearchComplete />:''
                                }
                                </div>
                            )
                        }                        
                    
                    <ul className="nav flex-column ">
                        <li className={`${pathname.match('/home') ? 'nav-item active' : 'nav-item'}`}>
                            <Link to={'home'} className="nav-link align-items-center d-flex" onClick={()=>setOpenState()}>
                                <RiHomeFill className="side-icon" />{props.isOpen&&<span className="ml-3">Home</span>}
                                
                            </Link>
                        </li>
                        <li className={`${pathname.match('/chart') ? 'nav-item active' : 'nav-item'}`}>
                            <Link to="/chart/Ethereum/0xdac17f958d2ee523a2206206994597c13d831ec7" className="nav-link " onClick={()=>setOpenState()}>                            
                                <RiBarChartBoxLine className="side-icon" />{props.isOpen&&<span className="ml-3">SandwichCharts</span>}                            
                            </Link>
                        </li>
                        <li
                            className={`${(pathname.match('/currencies')||pathname.match('/trending')||pathname.match('/gainer')) ? 'nav-item active' : 'nav-item'}`}
                        >
                            <div className="nav-link align-items-center d-flex  justify-content-between">
                                <Link to={'currencies'} className="d-flex align-items-center">
                                    <RiCopperCoinLine className="side-icon" />{props.isOpen&&<span className="ml-3">Cryptocurrencies</span>}                                                                
                                </Link>
                                {
                                    props.isOpen&&(
                                        openSubMenu1?<RiArrowUpSLine onClick={()=>toggleSubmenu1()} className="side-icon ml-3" />:
                                        <RiArrowDownSLine onClick={()=>toggleSubmenu1()} className="side-icon ml-3" />
                                    )
                                    
                                }
                            </div>
                            
                            
                        </li>
                        {
                            <div className={(props.isOpen&&openSubMenu1)?'wrapper-sub open1':'wrapper-sub'}>
                            
                                
                                <ul className="submenu">
                                    <Link to="/currencies" className="nav-link " onClick={()=>setOpenState()}>
                                        <li className={`${pathname.match('/currencies') ? 'submenu-item active' : 'submenu-item'}`}>
                                            <RiBarChart2Line className="side-icon"  />{props.isOpen&&<span className="ml-3">Ranking</span>}
                                        </li>
                                    </Link>
                                    <Link to="/trending-tokens" className="nav-link " onClick={()=>setOpenState()}>
                                        <li className={`${pathname.match('/trending') ? 'submenu-item active' : 'submenu-item'}`}>
                                            <MdOutlineLocalFireDepartment className="side-icon"  />{props.isOpen&&<span className="ml-3">Trending</span>}
                                        </li>
                                    </Link>
                                    <Link to="/gainers-losers" className="nav-link " onClick={()=>setOpenState()}>
                                        <li className={`${pathname.match('/gainer') ? 'submenu-item active' : 'submenu-item'}`}>
                                            <MdOutlineShowChart className="side-icon"  />{props.isOpen&&<span className="ml-3">Gainers & Losers</span>}
                                        </li>
                                    </Link>
                                </ul>
                                
                            
                            </div>
                        }                        
                        <li className={`${pathname.match('/portfolio') ? 'nav-item active' : 'nav-item'}`}>
                            <Link to={'portfolio/overview'} className="nav-link align-items-center d-flex" onClick={()=>setOpenState()}>
                                <RiWallet2Line className="side-icon" />{props.isOpen&&<span className="ml-3">SandwichPortfolio</span>}
                            </Link>
                        </li>                                            
                        <li className="nav-item ">
                            <div className="nav-link align-items-center d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <RiMoreLine className="side-icon" /> {props.isOpen&&<span className="ml-3">Support & More</span>}                                
                                </div>                                
                                {
                                    props.isOpen&&(
                                        openSubMenu2?<RiArrowUpSLine onClick={()=>toggleSubmenu2()} className="side-icon ml-3" />:
                                        <RiArrowDownSLine onClick={()=>toggleSubmenu2()} className="side-icon ml-3" />
                                    )
                                    
                                }
                            </div>                            
                            
                        </li>
                        {
                            <div className={(props.isOpen&&openSubMenu2)?'wrapper-sub open2':'wrapper-sub'}>                                                        
                                <ul className="submenu">
                                    <a href="https://sandwich.network/token/" rel="noreferrer" target="_blank" className="nav-link ">
                                        <li className="submenu-item">
                                            {props.isOpen&&<span className="ml-4">Token</span>}
                                        </li>
                                    </a>
                                    <a href="https://docs.sandwich.network/support" rel="noreferrer" target="_blank" className="nav-link ">
                                        <li className="submenu-item">
                                            {props.isOpen&&<span className="ml-4">Support</span>}
                                        </li>
                                    </a>

                                    <a href="https://docs.sandwich.network/" rel="noreferrer" target="_blank" className="nav-link ">
                                        <li className="submenu-item">
                                            {props.isOpen&&<span className="ml-4">Docs</span>}
                                        </li>
                                    </a>
                                    <a href="https://sandwich.network/tutorials/" rel="noreferrer" target="_blank" className="nav-link ">
                                        <li className="submenu-item">
                                            {props.isOpen&&<span className="ml-4">Tutorials</span>}
                                        </li>
                                    </a>
                                    <a href="https://medium.com/@sandwichnetwork" rel="noreferrer" target="_blank" className="nav-link ">
                                        <li className="submenu-item">
                                            {props.isOpen&&<span className="ml-4">Blog</span>}
                                        </li>
                                    </a>
                                    <a href="https://sandwich.network/submit/" rel="noreferrer" target="_blank" className="nav-link ">
                                        <li className="submenu-item">
                                            {props.isOpen&&<span className="ml-4">Submit idea</span>}
                                        </li>
                                    </a>
                                </ul>                                                            
                            </div>
                        }
                    </ul>
                </div>
                <div className="sidebar-footer">
                    {
                        props.isOpen&&(
                            <>
                                <div className="social-links  d-flex align-items-center justify-content-center">
                                    <a href="https://twitter.com/NetworkSandwich" target="_blank">
                                        <FaTelegramPlane className="side-icon mr-4" />
                                    </a>
                                    <a href="https://t.me/SandwichNetwork"  target="_blank">
                                        <FaTwitter className="side-icon" />
                                    </a>
                                    <a href="https://medium.com/@sandwichnetwork"  target="_blank">
                                        <FaMedium className="side-icon ml-4" />
                                    </a>
                                </div>
                                <div className="footer-text  d-flex align-items-center justify-content-center mt-2">
                                    Term & Conditions | Privacy Policy
                                </div>
                            </>
                        )
                    }                    
                </div>
            </nav>
        </>
    );
}

export default Sidebar;
