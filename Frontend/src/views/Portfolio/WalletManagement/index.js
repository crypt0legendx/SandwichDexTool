import {BsThreeDotsVertical, BsPlusCircleFill, BsTrash} from "react-icons/bs";
import {MdHelp, MdOutlineContentCopy, MdDelete} from "react-icons/md";
import {HiPlusCircle} from "react-icons/hi";

import {Button} from "react-bootstrap";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useWeb3Context } from "../../../hooks/web3";

function WalletManagement(){

    const { connect, disconnect, connected, address } = useWeb3Context();

    return(
        <>
            <div className="wallet-management">

                <Typography id="modal-modal-title" className="wallet-management-title" variant="h6" component="h2">
                    Wallet Management
                </Typography>
                {
                    connected?
                    <div className="account-info mt-3">
                        <div className="wallet-management-subtitle">Account&nbsp;<small><MdHelp /></small></div>
                        <div className="wallet-itmes">
                            <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                    <span className="wallet-name ml-2">{address}</span>
                                </div>                                    
                                <div className="d-flex align-items-center">
                                    <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                </div>
                            </div>
                        </div>
                    </div>:
                    <div className="no-watch-list mt-4">
                        <button className="wm-connect-btn" onClick={()=>connect()}>Connect</button> Sync and track your wallet with ease
                    </div>
                }
                                    
                
                <div className="watch-list mt-4">
                    <div className="d-flex justify-content-between">
                        <div className="wallet-management-subtitle">Watchlist&nbsp;<small><MdHelp /></small></div>
                        <Button className="add-wallet-btn">Add Wallet</Button>
                    </div>
                    <div className="wallet-itmes mt-2">
                        <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                <span className="wallet-name ml-2">{address}</span>
                            </div>                                    
                            <div className="d-flex align-items-center">
                                <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                <button className="wallet-item-action ml-1"><MdDelete /></button>
                            </div>
                        </div>
                        <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                <span className="wallet-name ml-2">{address}</span>
                            </div>                                    
                            <div className="d-flex align-items-center">
                                <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                <button className="wallet-item-action ml-1"><MdDelete /></button>
                            </div>
                        </div>
                        <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                <span className="wallet-name ml-2">{address}</span>
                            </div>                                    
                            <div className="d-flex align-items-center">
                                <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                <button className="wallet-item-action ml-1"><MdDelete /></button>
                            </div>
                        </div>
                        
                    </div>                                
                    {/* <div className="no-watch-list mt-2">
                        You can save wallets to your watchlist and come back to them later. Tap ‘+’ in the recent list or ‘Add Wallet’ to connect a wallet.
                    </div> */}
                </div>
                <div className="recently-viewed mt-4">
                    <div className="wallet-management-subtitle">Recently viewed&nbsp;<small><MdHelp /></small></div>
                    <div className="wallet-itmes mt-2">
                        <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                <span className="wallet-name ml-2">{address}</span>
                            </div>                                    
                            <div className="d-flex align-items-center">
                                <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                <button className="wallet-item-action ml-1"><HiPlusCircle /></button>
                            </div>
                        </div>
                        <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                <span className="wallet-name ml-2">{address}</span>
                            </div>                                    
                            <div className="d-flex align-items-center">
                                <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                <button className="wallet-item-action ml-1"><HiPlusCircle /></button>
                            </div>
                        </div>
                        <div className="wallet-item d-flex flex-wrap align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                                <img className="wallet-logo" src={ `https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                                <span className="wallet-name ml-2">{address}</span>
                            </div>                                    
                            <div className="d-flex align-items-center">
                                <button className="wallet-item-action"><MdOutlineContentCopy /></button>
                                <button className="wallet-item-action ml-1"><HiPlusCircle /></button>
                            </div>
                        </div>                                                                                                 
                    </div>
                    {/* <div className="no-watch-list mt-2">
                        There is no viewed history
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default WalletManagement;