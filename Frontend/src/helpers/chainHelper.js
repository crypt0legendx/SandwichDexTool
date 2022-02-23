export function getChainIdByName(str){
    let chainId =1;
    if(str == "Ethereum"){
        chainId = 1;
    }

    if(str == "BSC"){
        chainId = 56;
    }

    if(str == "Polygon"){
        chainId = 137;
    }

    return chainId;
}


export function getRPCByChainID(chainId){
    let rpc = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    if(chainId ==1){
        rpc = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    }

    if(chainId==56){
        rpc ="https://bsc-dataseed.binance.org/";
    }

    if(chainId ==137){
        rpc = "https://polygon-rpc.com/";
    }

    return rpc;
}