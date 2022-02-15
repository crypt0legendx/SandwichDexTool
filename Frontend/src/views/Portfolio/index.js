import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Button} from "react-bootstrap";
import {BsThreeDotsVertical} from "react-icons/bs";
import {MdHelp} from "react-icons/md";
import { Link } from "react-router-dom";

import "./style.css";


function Portfolio() {

    const chain = useSelector((state) => state.network.name);

    return ( 
        <>
            <div className="row mt-3">
                <div className="col-md-12">
                    <Button id="wallet-dropdown-button">
                            0xb4...7146&nbsp;
                            <BsThreeDotsVertical />
                    </Button>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-3 mt-3">
                    <div className="worth-card bg-light-gray">
                        <div className="title">
                            Net Worth &nbsp;<MdHelp />
                        </div>
                        <div className="value">
                            $754,412.42
                        </div>
                        <div className="percent">
                            -0.07$ ($461.54)
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
                                        $754,412.42
                                    </div>
                                    <div className="percent">
                                        -0.07$ ($461.54)
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="worth-card">
                                    <div className="title">
                                        DeFi Worth
                                    </div>
                                    <div className="value">
                                        -
                                    </div>
                                    <div className="percent">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="worth-card">
                                    <div className="title">
                                        NFTS Worth
                                    </div>
                                    <div className="value">
                                        -                                        
                                    </div>
                                    <div className="percent">
                                        
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
                                    <div className="token-info-body">
                                        <div className="d-flex">
                                            <img className="p-token-logo" src="https://etherscan.io/token/images/binanceusd_32.png" />
                                            <div className="p-token-symbol">
                                                BUSD
                                            </div>
                                        </div>
                                        <div className="p-token-value">
                                            $754,412.42 (87.99%)
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="token-count">
                                    <div className="title">
                                        Tokens                                        
                                    </div>
                                    <div className="value">
                                        7                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div className="dominant-token-item">
                                    <div className="d-flex align-items-center">
                                        <img className="p-token-logo" src="https://etherscan.io/token/images/binanceusd_32.png" />
                                        <div>
                                            <div className="pd-token-name">BINANCE USD</div>
                                            <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pd-token-worth">$512,23.56</div>
                                        <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                    </div>
                                </div>
                                <div className="dominant-token-item">
                                    <div className="d-flex align-items-center">
                                        <img className="p-token-logo" src="https://etherscan.io/token/images/binanceusd_32.png" />
                                        <div>
                                            <div className="pd-token-name">BINANCE USD</div>
                                            <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pd-token-worth">$512,23.56</div>
                                        <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                    </div>
                                </div>
                                <div className="dominant-token-item">
                                    <div className="d-flex align-items-center">
                                        <img className="p-token-logo" src="https://etherscan.io/token/images/binanceusd_32.png" />
                                        <div>
                                            <div className="pd-token-name">BINANCE USD</div>
                                            <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pd-token-worth">$512,23.56</div>
                                        <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                    </div>
                                </div>
                                <div className="dominant-token-item">
                                    <div className="d-flex align-items-center">
                                        <img className="p-token-logo" src="https://etherscan.io/token/images/binanceusd_32.png" />
                                        <div>
                                            <div className="pd-token-name">BINANCE USD</div>
                                            <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pd-token-worth">$512,23.56</div>
                                        <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                    </div>
                                </div>
                                <div className="dominant-token-item">
                                    <div className="d-flex align-items-center">
                                        <img className="p-token-logo" src="https://etherscan.io/token/images/binanceusd_32.png" />
                                        <div>
                                            <div className="pd-token-name">BINANCE USD</div>
                                            <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="pd-token-worth">$512,23.56</div>
                                        <div className="pd-token-value">-0.1%$ ($461.54)</div>
                                    </div>
                                </div>
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