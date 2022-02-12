
import {
    RiCopperCoinLine, 
    RiHomeFill, 
    RiDonutChartLine, 
    RiBarChartBoxLine, 
    RiWallet2Line, 
    RiToolsLine, 
    RiMoreLine, 
    RiSettings2Fill,
    RiBarChart2Line,
    RiArrowDownSLine,
    RiArrowUpSLine

} from "react-icons/ri"
import {FaTelegramPlane, FaMedium, FaTwitter} from "react-icons/fa";
import {MdOutlineShowChart,MdOutlineLocalFireDepartment} from "react-icons/md";
import {Dropdown, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./Sidebar.css";

import {useSelector, useDispatch} from "react-redux";
import {changeNetwork} from "../../store/slices/network-slice";
import {changeLoading, changeRanking} from "../../store/slices/currencies-slice";

import axios from 'axios';

function Sidebar(props) {

    const network = useSelector((state) => state.network.name);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const dispatch = useDispatch();

    let pathname = window.location.pathname;

    useEffect(() => {
        pathname = window.location.pathname;
    }, [window.location.pathname]);

    const changedNetwork = async(chain) => {
        props.setOpen();
        dispatch(changeNetwork(chain));
        dispatch(changeLoading(true));
        axios.get(`http://localhost:4000/coin-market-cap/ranking/${chain}`)
        .then(function (response) {
            dispatch(changeRanking(response.data));                
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
            dispatch(changeLoading(false));
        });
    }

    const toggleSubmenu =() =>{
        setOpenSubMenu(!openSubMenu);
    }

    return ( 
        <>
            <nav id="sidebarMenu" 
                className={props.isOpen?`d-md-block bg-light sidebar p-0 show`:`d-md-block bg-light sidebar p-0`}

            >
                <div className="sidebar-sticky ">
                    <div className="setting-section justify-content-between">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" className="switch-network-btn">
                                <img className="network-logo mr-2" src={`assets/images/Networks/${network}.png`} alt="network_logo" />{network}
                            </Dropdown.Toggle>
                                <Dropdown.Menu className="network-dropdown-body"><Dropdown.Item onClick={() => changedNetwork("Ethereum")}>Ethereum</Dropdown.Item>
                                <Dropdown.Item onClick={() => changedNetwork("BSC")}>BSC</Dropdown.Item>
                                <Dropdown.Item onClick={() => changedNetwork("Polygon")}>Polygon</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="light" className="setting-btn"><RiSettings2Fill /></Button>
                    </div>
                    <ul className="nav flex-column ">
                        <li className={`${pathname.match('/home') ? 'nav-item active' : 'nav-item'}`}>
                            <Link to={'home'} className="nav-link align-items-center d-flex" onClick={()=>props.setOpen()}>
                                <RiHomeFill className="side-icon mr-3" />Home
                                <span className="sr-only ">(current)</span>
                            </Link>
                        </li>
                        <li className={`${pathname.match('/chart') ? 'nav-item active' : 'nav-item'}`}>
                            <Link to="/chart/BTC" className="nav-link " onClick={()=>props.setOpen()}>                            
                                <RiBarChartBoxLine className="side-icon mr-3" />SandwichCharts                            
                            </Link>
                        </li>
                        <li
                            className={`${(pathname.match('/currencies')||pathname.match('/trending')||pathname.match('/gainer')) ? 'nav-item active' : 'nav-item'}`}
                        >
                            <Link to={'currencies'} className="nav-link align-items-center d-flex" onClick={()=>props.setOpen()}>
                                <RiCopperCoinLine className="side-icon mr-3" />Cryptocurrencies                            
                            </Link>
                            {
                                openSubMenu?<RiArrowUpSLine onClick={()=>toggleSubmenu()} className="side-icon ml-3" />:
                                <RiArrowDownSLine onClick={()=>toggleSubmenu()} className="side-icon ml-3" />
                            }
                        </li>
                        {
                            openSubMenu&&(
                                <ul className="submenu">
                                    <Link to="/currencies" className="nav-link " onClick={()=>props.setOpen()}>
                                        <li className={`${pathname.match('/currencies') ? 'submenu-item active' : 'submenu-item'}`}>
                                            <RiBarChart2Line className="side-icon mr-3"  />Ranking
                                        </li>
                                    </Link>
                                    <Link to="/trending-tokens" className="nav-link " onClick={()=>props.setOpen()}>
                                        <li className={`${pathname.match('/trending') ? 'submenu-item active' : 'submenu-item'}`}>
                                            <MdOutlineLocalFireDepartment className="side-icon mr-3"  />Trending
                                        </li>
                                    </Link>
                                    <Link to="/gainers-losers" className="nav-link " onClick={()=>props.setOpen()}>
                                        <li className={`${pathname.match('/gainer') ? 'submenu-item active' : 'submenu-item'}`}>
                                            <MdOutlineShowChart className="side-icon mr-3"  />Gainers & Losers
                                        </li>
                                    </Link>
                                </ul>
                            )
                        }                        
                        <li className="nav-item ">
                            <a className="nav-link " href="# ">
                                <RiDonutChartLine className="side-icon mr-3" />Sandwich Tracking
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link " href="# ">
                                <RiToolsLine className="side-icon mr-3" /> Sandwich Instruments
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link " href="# ">
                                <RiWallet2Line className="side-icon mr-3" />SandwichPortfolio
                            </a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link " href="# ">
                                <RiMoreLine className="side-icon mr-3" /> Support & More
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-footer">
                    <div className="social-links  d-flex align-items-center justify-content-center">
                        <a href="#">
                            <FaTelegramPlane className="side-icon mr-4" />
                        </a>
                        <a href="#">
                            <FaTwitter className="side-icon" />
                        </a>
                        <a href="#">
                            <FaMedium className="side-icon ml-4" />
                        </a>
                    </div>
                    <div className="footer-text  d-flex align-items-center justify-content-center mt-2">
                        Term & Conditions | Privacy Policy
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;
