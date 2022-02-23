import React, { useState, useEffect, ReactElement, useContext, useMemo, useCallback } from "react";
import Web3Modal from "web3modal";
import { StaticJsonRpcProvider, JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useDispatch, useSelector } from "react-redux";

import { swithNetwork } from "../../helpers/switch-network";
import { getChainIdByName, getRPCByChainID } from "../../helpers/chainHelper";

const Web3Context = React.createContext();

export const useWeb3Context = () => {
    const web3Context = useContext(Web3Context);
    if (!web3Context) {
        throw new Error("useWeb3Context() can only be used inside of <Web3ContextProvider />, " + "please declare it at a higher level.");
    }
    const { onChainProvider } = web3Context;
    
    return useMemo(() => {
        return { ...onChainProvider };
    }, [web3Context]);
};

export const useAddress = () => {
    const { address } = useWeb3Context();
    return address;
};

export const Web3ContextProvider=({ children }) => {
    const dispatch = useDispatch();
    const network = useSelector((state) => state.network.name);    

    const [connected, setConnected] = useState(false);
    const [chainID, setChainID] = useState(getChainIdByName(network));
    const [providerChainID, setProviderChainID] = useState(getChainIdByName(network));
    const [address, setAddress] = useState("");
    
    const [provider, setProvider] = useState(new StaticJsonRpcProvider(getRPCByChainID(chainID)));

    const [web3Modal, setWeb3Modal] = useState(
        new Web3Modal({
            // network:"mainnet",
            cacheProvider: true,
            providerOptions: {
                walletconnect: {
                    package: WalletConnectProvider,
                    options: {
                        rpc: {
                            chainID: getRPCByChainID(chainID),
                        },
                    },     
                },
            },
        }),
    );

    const hasCachedProvider = () => {
        if (!web3Modal) return false;
        if (!web3Modal.cachedProvider) return false;
        return true;
    };

    const _initListeners = useCallback(
        (rawProvider) => {
            if (!rawProvider.on) {
                return;
            }

            rawProvider.on("accountsChanged", () => setTimeout(() => window.location.reload(), 1));

            rawProvider.on("chainChanged", async (chain) => {
                changeNetwork(chain);
            });

            rawProvider.on("network", (_newNetwork, oldNetwork) => {
                if (!oldNetwork) return;
                window.location.reload();
            });
        },
        [provider],
    );

    const changeNetwork = async (otherChainID) => {
        const network = Number(otherChainID);

        setProviderChainID(network);
    };

    const connect = useCallback(async () => {
        const rawProvider = await web3Modal.connect();

        _initListeners(rawProvider);

        const connectedProvider = new Web3Provider(rawProvider, "any");

        const chainId = await connectedProvider.getNetwork().then(network => Number(network.chainId));
        const connectedAddress = await connectedProvider.getSigner().getAddress();

        setAddress(connectedAddress);

        setProviderChainID(chainId);

        if (chainId === getChainIdByName(network)) {
            setProvider(connectedProvider);
        }

        setConnected(true);

        return connectedProvider;
    }, [provider, web3Modal, connected]);

    const checkWrongNetwork = async () => {
        if (providerChainID !== getChainIdByName(network)) {
            const shouldSwitch = window.confirm(`Switch to ${network} Main Network`);
            if (shouldSwitch) {
                await swithNetwork(network);
                // window.location.reload();
            }
            return true;
        }

        return false;
    };

    const disconnect = useCallback(async () => {
        web3Modal.clearCachedProvider();
        setConnected(false);

        setTimeout(() => {
            window.location.reload();
        }, 1);
    }, [provider, web3Modal, connected]);

    const onChainProvider = useMemo(
        () => ({
            connect,
            disconnect,
            hasCachedProvider,
            provider,
            connected,
            address,
            chainID,
            web3Modal,
            providerChainID,
            checkWrongNetwork,
        }),
        [connect, disconnect, hasCachedProvider, provider, connected, address, chainID, web3Modal, providerChainID],
    );
    //@ts-ignore
    return <Web3Context.Provider value={{ onChainProvider }}>{children}</Web3Context.Provider>;
};
