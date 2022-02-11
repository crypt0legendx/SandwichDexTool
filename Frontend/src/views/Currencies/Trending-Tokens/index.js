import "../../../style/css/table.css"

import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";

import {FaRegStar, FaStar} from "react-icons/fa";
import {AiOutlineDollar, AiOutlineBarChart} from "react-icons/ai";

import useFavoriteHelper from "../../../hooks/useFavoriteHelper";


function TrendingTokens() {

    const {toggleFavouriteToken, isFavourite} = useFavoriteHelper();

    const chain = useSelector((state) => state.network.name);
    const trendings =  useSelector((state) => state.trendings.latest);
    const [filteredTrendings, setFilteredTrendings] = useState([]);

    useEffect(()=>{
        console.log('Trendings', chain);
        let ntrendings=[];
        let slug ="";
        if(chain==="Ethereum")
            slug="ethereum";
        if(chain==="BSC")
            slug="bnb";
        if(chain==="Polygon")
            slug="matic";
        trendings.forEach(d => {
            if(d.platform!=null&&d.platform.slug == slug){
              ntrendings.push(d);
            }
        });
        setFilteredTrendings(ntrendings);
    },[trendings, chain])


    return ( 
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="sub-title mt-4">Find Your Next Investment</div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                <div className="sub-description mt-1">Browse trending tokens on {chain}</div>
                </div>
            </div>            
        
            <div className="row mt-4 ">
                <div className="col-md-12 d-flex flex-wrap ">                    
                    <button className="btn btn-default table-sort-btn active mt-2 mr-1 ">Trending</button>
                    <button className="btn btn-default table-sort-btn  mt-2 mr-1 ">Most Viewed</button>
                    <button className="btn btn-default table-sort-btn mt-2 mr-1 ">Promoted</button>                    
                </div>
            </div>
            <div className="row">
                <div className="col-md-12"  style={{width:'100%', overflowX:'auto', textAlign:'center'}}>
                <table className="table mt-2">
                    <thead>
                        <tr>
                            <th scope="col " className="text-left ">#</th>
                            <th scope="col " className="text-left ">Name</th>
                            <th scope="col " className="text-left ">Price</th>
                            <th scope="col " className="text-right ">24h %</th>
                            <th scope="col " className="text-right ">7d %</th>
                            <th scope="col " className="text-right">
                                marketcap <big><AiOutlineDollar className="ml-1  " /></big>
                            </th>
                            <th scope="col " className="text-right d-flex align-items-center">
                                volume(24) <big><AiOutlineBarChart className="ml-1" /></big>
                            </th>
                            <th scope="col " className="text-right ">Chart</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredTrendings.slice(0,10).map((t,i)=>{
                                return (<tr key={i}>
                                    <td className="text-left td-no">
                                        <div className="d-flex">
                                            <button 
                                            className={
                                                isFavourite(t.platform.token_address)?`star-toggle-noline-btn active mr-2 inline-block`:
                                                `star-toggle-noline-btn mr-2 inline-block`
                                            }
                                                onClick={()=>{toggleFavouriteToken({
                                                    contractAddress:t.platform.token_address,
                                                    name:t.name,
                                                    symbol:t.symbol,
                                                    chain:chain,
                                                    logo:`https://s2.coinmarketcap.com/static/img/coins/64x64/${t.id}.png`,
                                                })}}
                                            >
                                                {
                                                    isFavourite(t.platform.token_address)?<FaStar />:
                                                    <FaRegStar />
                                                }
                                                
                                            </button>
                                            {i+1}
                                        </div>
                                    </td>
                                    <td className="text-strong text-left ">                                                    
                                        <Link to={ `/chart/${t.symbol}/${t.contractAddress}`}>
                                            <div className="d-flex align-items-center">
                                            <img className="ranking-img mr-1" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${t.id}.png`} />
                                            {t.name} <span className="mark ">                                            
                                            {t.symbol}</span>
                                            </div>
                                        </Link>
                                        </td>
                                    <td className="text-strong text-left ">${t.price.toFixed(2)}</td>
                                    <td className={parseFloat(t.percent_change_24h)>0?"text-success text-right":"text-danger text-right"}>{t.percent_change_24h}</td>
                                    <td className={parseFloat(t.percent_change_7d)>0?"text-success text-right":"text-danger text-right"}>{t.percent_change_7d}</td>
                                    <td className="text-strong text-right ">{t.market_cap}</td>
                                    <td className="text-strong text-right ">{t.volume_24h}</td>
                                    <td className="chart "> 
                                        <img className={parseFloat(t.percent_change_7d)>0?"bCltOL isUp":"bCltOL"}  src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${t.id}.svg`} />
                                    </td>
                                </tr>);
                            })
                        }
                    </tbody>
                </table>
                </div>
            </div>
        </>
        );

}

export default TrendingTokens;