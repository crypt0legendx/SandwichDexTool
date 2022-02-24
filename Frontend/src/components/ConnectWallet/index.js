import { useEffect, useState } from "react";
import { useWeb3Context } from "../../hooks/web3";

import {useSelector, useDispatch} from "react-redux";

import { getChainIdByName } from "../../helpers/chainHelper";

import "./style.css";

function ConnectWallet() {

    const network = useSelector((state) => state.network.name);    
    const { connect, disconnect, connected, web3, providerChainID, checkWrongNetwork, address } = useWeb3Context();
    const [isConnected, setConnected] = useState(connected);

    let buttonText = "ConnectWallet";
    let clickFunc = connect;
    let buttonStyle = {};

    if (isConnected) {
        buttonText = String(address).substring(0, 6) +"..." +String(address).substring(38);
        clickFunc = disconnect;
    }

    if (isConnected && providerChainID !== getChainIdByName(network)) {
        buttonText = "Wrong Network";
        buttonStyle = { backgroundColor: "rgb(255, 67, 67)", color: "#ffffff" };
        clickFunc = () => {
            checkWrongNetwork();
        };
    }

    useEffect(() => {
        setConnected(connected);
    }, [web3, connected]);

    return (
        <button type="button " className="btn btn-primary connect-wallet-btn " style={buttonStyle} onClick={clickFunc}>
            {buttonText}
        </button>
    );
}

export default ConnectWallet;
