const getHexChainIdByName=(network)=>{
    if(network === "Ethereum")
        return 1;
    if(network === "BSC")
        return 38;
    if(network === "Polygon")
        return 89

    return 1;
}

const getChainInfo=(network)=>{
    
    if(network === "BSC")
        return {
            chainId: "0x38",
            chainName: "Binance Smart Chain",
            rpcUrls:["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com/"],
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18,
            },
        };
    if(network === "Polygon")
        return {
            chainId: "0x89",
            chainName: "Polygon Mainnet",
            rpcUrls:["https://polygon-rpc.com/"],
            blockExplorerUrls:["https://polygonscan.com/"],
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
            },
        }

    return {};
}

const switchRequest = (hexChainId) => {
    return window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${hexChainId}` }],
        
    });
};

const addChainRequest = (data) => {
    return window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
            {
                chainId: data.chainId,
                chainName: data.chainName,
                rpcUrls: data.rpcUrls,
                blockExplorerUrls: data.blockExplorerUrls,
                nativeCurrency: data.nativeCurrency,
            },
        ],
    });
};

export const swithNetwork = async (network) => {
    const hexChainId = getHexChainIdByName(network);

    if (window.ethereum) {
        try {
            await switchRequest(hexChainId);
        } catch (error) {
            if (error.code === 4902) {
                try {
                    const chainInfo = getChainInfo(network);
                    await addChainRequest(chainInfo);
                    await switchRequest(hexChainId);
                } catch (addError) {
                    console.log(error);
                }
            }
            console.log(error);
        }
    }
};
