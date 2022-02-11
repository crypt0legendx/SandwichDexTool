

import {useSelector, useDispatch} from "react-redux";
import {FaSortUp} from "react-icons/fa";

import "../style.css";
import { Link } from "react-router-dom";

function TredingCard(){

    const tredings = useSelector((state) => state.trendings.latest);


    return(
        <div className="coin-marketcap-info-item ">
            <div className="d-flex justify-content-between ">
                <span className="info-item-title "><i className="fa fa-fire-flame-curved mr-2"></i>Trending</span>
                <Link to="/trending-tokens">
                    <button className="btn btn-default info-view-more cursor-pointer ">
                        More<i className="fa fa-angle-right ml-2"></i>
                    </button>
                </Link>
            </div>
            {
                tredings.slice(0,3).map((t,i)=>{
                    return <div key={i} className="d-flex justify-content-between mt-1">
                                <span className="info-item-opt-title ">
                                    <span className="dash-overview-num">{i+1}</span>&nbsp;
                                    <img className="trending-dash-logo ml-2 mr-2" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${t.id}.png`} />
                                    {t.name}&nbsp;
                                    <small>{t.symbol}</small>
                                </span>
                                <span className={t.percent_change_24h>0?`info-item-opt-value text-success`:`info-item-opt-value text-danger`}>
                                    {t.percent_change_24h>0?'+':''}{t.percent_change_24h.toFixed(2)}%</span>
                                
                            </div>        
                })
            }
        </div>
    )
}

export default TredingCard;