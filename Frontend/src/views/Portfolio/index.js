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
                <div className="col-md-3">

                </div>
                <div className="col-md-9">
                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-7">

                </div>
                <div className="col-md-5">
                    
                </div>
            </div>
        </>
        );
}

export default Portfolio;