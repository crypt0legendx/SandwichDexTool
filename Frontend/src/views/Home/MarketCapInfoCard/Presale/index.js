

function PresaleCard(){

    return(
        <div className="coin-marketcap-info-item ">
            <div className="d-flex justify-content-between ">
                <span className="info-item-title "><i className="fa fa-fire-flame-curved mr-2"></i>Sandwich Network Presales</span>
                <button className="btn btn-default info-view-more ">More<i className="fa fa-angle-right ml-2"></i></button>
            </div>
            <div className="d-flex justify-content-between ">
                <span className="info-item-opt-title ">Cardano&nbsp;<small>ADA</small></span>
                <span className="info-item-opt-value text-success ">+0.64%</span>
            </div>
            <div className="d-flex justify-content-between ">
                <span className="info-item-opt-title ">EOS&nbsp;<small>EOS.IO</small></span>
                <span className="info-item-opt-value text-danger ">-9.04%</span>
            </div>
            <div className="d-flex justify-content-between ">
                <span className="info-item-opt-title ">Tether&nbsp;<small>USDT</small></span>
                <span className="info-item-opt-value text-success ">+0.64%</span>
            </div>
        </div>
    )
}

export default PresaleCard;