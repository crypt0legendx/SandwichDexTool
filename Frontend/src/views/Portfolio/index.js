import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import { Link } from "react-router-dom";

import "./style.css";


function Portfolio() {

    const chain = useSelector((state) => state.network.name);

    return ( 
        <>
            <div className="row">
                <div className="col-md-12">
                    {/* <div className="sub-title mt-4">Portfolio</div> */}
                </div>
            </div>
            <div className="row">
                <div className="col-md-3 mt-3">
                    <div className="worth-card bg-light-gray">
                    </div>
                </div>
                <div className="col-md-8 mt-3">
                    <div className=" bg-light-gray">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="worth-card">
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="worth-card">
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="worth-card">
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-7 mt-3">
                    <div className="dominant-token-card bg-light-gray">

                    </div>
                </div>
                <div className="col-md-4 mt-3">
                    <div className="nft-token-card bg-light-gray">
                    
                    </div>
                </div>
            </div>
        </>
        );
}

export default Portfolio;