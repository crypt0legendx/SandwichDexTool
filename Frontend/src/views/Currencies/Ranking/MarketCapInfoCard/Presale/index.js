import { useState } from "react";


function PresaleCard(){

    const [presales, setPresales] =  useState([
        {
            name:'-',
            symbol:'-',
            logo:'token_empty.png',
            percent_change_24h:'-'
        },
        {
            name:'-',
            symbol:'-',
            logo:'token_empty.png',
            percent_change_24h:'-'
        },
        {
            name:'-',
            symbol:'-',
            logo:'token_empty.png',
            percent_change_24h:'-'
        }
    ])

    return(
        <div className="coin-marketcap-info-item ">
            <div className="d-flex justify-content-between ">
                <span className="info-item-title "><i className="fa fa-fire-flame-curved mr-2"></i>Sandwich Network Presales</span>
                <button className="btn btn-default info-view-more ">More<i className="fa fa-angle-right ml-2"></i></button>
            </div>
            {
                presales.slice(0,3).map((t,i)=>{
                    return <div key={i} className="d-flex justify-content-between mt-1">
                                <span className="info-item-opt-title ">
                                    <span className="dash-overview-num">{i+1}</span>&nbsp;
                                    <img className="trending-dash-logo ml-2 mr-2" src={`../../../assets/icons/others${t.logo}.png`} />
                                    {t.name}&nbsp;
                                    <small>{t.symbol}</small>
                                </span>
                                <span className={t.percent_change_24h>0?`info-item-opt-value text-success`:`info-item-opt-value text-danger`}>
                                    {t.percent_change_24h>0?'+':''}{t.percent_change_24h}%</span>
                                
                            </div>        
                })
            }
        </div>
    )
}

export default PresaleCard;