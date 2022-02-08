import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import {useDispatch } from "react-redux";
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Chart from "./views/chart/index";
import Home from "./views/Home/index";

import {getTrendings} from './store/slices/trendings-slice';
import ScrollToTopButton from "./components/ScrollToTopButton";



function App() {

    const dispatch = useDispatch();
    const [isOpen, setOpen] = useState(false);

    const toggleSidebar = () =>{
        console.log(isOpen);
        setOpen(!isOpen);
    }


    useEffect(()=>{
        // setInterval(()=>dispatch(getTrendings()),20000);
    })

    return ( 
        <Router>
            <Header setOpen = {toggleSidebar} />
            <div className="page-container container-full ">
                <Sidebar isOpen = {isOpen}  setOpen = {toggleSidebar} />
                <div id="page-content" className='page-content'>
                    
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/chart/:symbol/:contractAddress" element={<Chart />} />
                        {/* <Route path="/*" element={<Navigate to="/home" />} /> */}
                    </Routes>
                    
                    <footer>
                        <div className="footer_wrapper">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-xl-10 col-lg-12">
                                        <div className="footer_box_wrapper">
                                            <div className="footer_box pt_30">
                                                <div className="footer_content">
                                                    <a href="index.html">
                                                        <img src="../assets/images/Logo/logo.png" className="img-fluid" alt="" />
                                                    </a>
                                                    <p>Sandwich Network is the definite hub to start your decentralized cryptocurrency journey. Join us!</p>
                                                </div>
                                            </div>
                                            <div className="footer_box pt_30">
                                                <div className="footer_list_wrapper">
                                                    <h5>Products</h5>
                                                    <ul className="footer_list">
                                                        <li>
                                                            <a href="/launch/">SandwichBeta</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">SandwichSAFU</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">SandwichTools</a>
                                                        </li>
                                                        <li>
                                                            <a href="#">SandwichSwap</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="footer_box pt_30">
                                                <div className="footer_list_wrapper">
                                                    <h5>Support</h5>
                                                    <ul className="footer_list">
                                                        <li>
                                                            <a href="/tutorials/">Tutorials</a>
                                                        </li>
                                                        <li>
                                                            <a target="_blank" href="https://docs.sandwich.network/">Documentation</a>
                                                        </li>
                                                        <li>
                                                            <a target="_blank" href="https://docs.sandwich.network/support">Customer support</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="footer_box pt_30">
                                                <div className="footer_list_wrapper">
                                                    <h5>Social</h5>
                                                    <ul className="footer_list">
                                                        <li>
                                                            <a target="_blank" href="https://t.me/SandwichNetwork">
                                                                <i className="fab fa-telegram-plane"></i> Telegram
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a target="_blank" href="https://twitter.com/NetworkSandwich">
                                                                <i className="fab fa-twitter"></i> Twitter
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a target="_blank" href="https://medium.com/@sandwichnetwork">
                                                                <i className="fab fa-medium"></i> Medium
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="footer_last_text">
                                            <p>Copyright © 2021 Sandwich. All rights reserved</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </footer> 
                    <ScrollToTopButton refId="page-content" />
                </div>
            </div>
        </Router>
    );
}

export default App;