import React, {useState} from "react";
import Marquee from "react-easy-marquee";

import "./style.css";

function TrendingMarquee() {

    const [latestTrending, setLatestTrending ] = useState([
        {name:'Bitcoin'},
        {name:'Ethereum'},
        {name:'Tether'},
        {name:'BNB'},
        {name:'BUSD'},
        {name:'Solana'},
        {name:'Doge'},
        {name:'Polygon'},
        {name:'Wrapped USDT'},
        {name:'USDC'},
    ]);

    return (
        <>
            <Marquee className="marquee-bar" duration={50000} background="#fafafa" height="50px" pauseOnHover={true} reverse={true}>
                {
                    latestTrending.map((t, i)=>{
                        return <button key={i} type="button " className="btn btn-primary px-md-2 coin-item mr-2">
                                    &nbsp;{i+1}. {t.name}
                                </button>
                    })
                }                
            </Marquee>
        </>
    );
}

export default TrendingMarquee;
