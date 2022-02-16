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