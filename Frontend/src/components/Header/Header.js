import React,{useEffect} from "react";
import axios from 'axios';
import {RiNotification2Line} from "react-icons/ri";
import {Dropdown} from "react-bootstrap";
import ConnectWallet from "../ConnectWallet";
import {useSelector, useDispatch} from "react-redux";
import {changeNetwork} from "../../store/slices/network-slice";
import {changeLoading, changeRanking} from "../../store/slices/currencies-slice";
import { extractNameSymbol, extractUSD, extractContractAddress,extractLogoUrl } from "../../helpers/scrape";

import "./Header.css";
import SearchComplete from "../SearchComplete";

function Header(props) {
    const network = useSelector((state) => state.network.name);
    const InvalidCMC = useSelector((state) => state.currencies.InvalidCMC);
    const dispatch = useDispatch();

    useEffect(() => {
        changedNetwork("Ethereum");
    }, [props]);

    const changedNetwork = async(chain) => {
            let scanurl="";
            if(chain=="Ethereum"){
                scanurl="https://etherscan.io"
            }
            if(chain=="BSC"){
                scanurl="https://bscscan.com"
            }
            if(chain=="Polygon"){
                scanurl="https://polygonscan.com"
            }
            dispatch(changeNetwork({name:chain, scanurl:scanurl}));
            dispatch(changeLoading(true));
            

            axios.get(`http://localhost:4000/multi-chain-cap/toptokens/${chain}`)
            .then(function (response) {
                let results=[];
                let symbols="";
                let parser = new DOMParser();
                let doc = parser.parseFromString(response.data, 'text/html');
                let trs = doc.body.getElementsByTagName("tr");
            
                
                for (let i =1; i<trs.length; i++){
                    const tds=trs[i].getElementsByTagName('td');
                    const img = tds[1].getElementsByTagName('img')[0].src;
                    const logo = extractLogoUrl(img);
                    const a = tds[1].getElementsByTagName('a')[0].href;
                    const contractAddress = extractContractAddress(a);
                    const tname = tds[1].getElementsByTagName('a')[0].innerText.trim();
                    const {name,symbol} = extractNameSymbol(tname);
                    const price = tds[2].innerText.trim();
                    const usd_price=extractUSD(price);
                    const change = tds[3].innerText.trim();
                    const volume = tds[4].innerText.trim();
                    const marketcap =tds[5].innerText.trim();
                
                    if(!InvalidCMC.includes(symbol)){
                        symbols=symbols+','+symbol;
                    }                        
                    
                    results.push({id:1027, logo:logo, name:name, symbol:symbol, price:usd_price,percent_change_24h:change,percent_change_7d:change,market_cap:marketcap,volume_24h:volume});
                    
                }
                symbols=symbols.substring(1);
                axios.get(`http://localhost:4000/coin-market-cap/token/${symbols}`)
                    .then(async function (response) {
                        const cmc_data=response.data;
                        console.log(cmc_data);
                        results=await results.map((d,index)=>{
                            
                            const token_cmc=cmc_data.find(cd=>d.symbol.toUpperCase()==cd.symbol);
                            
                            if(token_cmc){
                                return {id:token_cmc.id, logo:d.logo, name:d.name, symbol:d.symbol, price:d.price,percent_change_24h:token_cmc.percent_change_24h,percent_change_7d:token_cmc.percent_change_7d,market_cap:d.market_cap,volume_24h:d.volume_24h}
                            }else{
                                return {id:1027, logo:d.logo, name:d.name, symbol:d.symbol, price:d.price,percent_change_24h:d.percent_change_24h,percent_change_7d:'-',market_cap:d.market_cap,volume_24h:d.volume_24h}
                            }
                        });

                        console.log(results);                
                        dispatch(changeRanking(results));
                        dispatch(changeLoading(false));
                        
                    })
                    .catch(function (error) {
                        console.log(error);
                    }).finally(()=>{

                    });                                
            })
            .catch(function (error) {
                console.log(error);
            }).finally(()=>{
                
            });
    }
    return ( 
        <>
        <nav className="navbar navbar-expand-md fixed-top ">
            <a className="navbar-brand " href="# ">
                <img src="../../assets/images/logo/logo.png " alt="logo" />
            </a>
            
            <div className="collapse navbar-collapse " id="main-navigation ">
                <ul className="navbar-nav ">
                    <li className="nav-item ">
                        <a className="nav-link" href="# ">Dashboard</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link " href="# ">Trade</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link " href="# ">Chart</a>
                    </li>                   
                </ul>
            </div>
            <button onClick={()=>props.setOpen()} className="navbar-toggler navbar-light " type="button " data-toggle="collapse " data-target="#main-navigation ">
                <span className="navbar-toggler-icon "></span>
            </button>
            <SearchComplete />
            <div className="d-flex">
                <button type="button " className="btn btn-default notification-btn "><RiNotification2Line /></button>
                <Dropdown className="mr-2 ml-2 d-flex align-items-center network-dropdown">
                    <Dropdown.Toggle id="dropdown-basic" className="header-switch-network-btn">
                        <img className="network-logo mr-2" src={`../../assets/images/Networks/${network}.png`} alt="network_logo" />{network}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="network-dropdown-body">
                        <Dropdown.Item onClick={() => changedNetwork("Ethereum")}>Ethereum</Dropdown.Item>
                        <Dropdown.Item onClick={() => changedNetwork("BSC")}>BSC</Dropdown.Item>
                        <Dropdown.Item onClick={() => changedNetwork("Polygon")}>Polygon</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ConnectWallet />
            </div>            
            
        </nav>
    </>
    );
}

export default Header;