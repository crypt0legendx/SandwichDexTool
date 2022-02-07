export function extractNameSymbol(str){
    let index=0;

    for(let i =str.length-1;i>0;i--){
        if(str[i]=='('){
            index=i;
            break;
        }
    }

    const name=str.substr(0,index);
    const symbol=str.substr(index+1, (str.length-index-2));
    return {name, symbol};
}

export function extractUSD(str){
    let index=0;

    for(let i =0;i<str.length;i++){
        if(str[i]=='B'){
            index=i;
            break;
        }
    }

    const USDPrice=str.substr(1,index-2);
    return parseFloat(USDPrice);   
}

export function extractContractAddress(link){

    const address = link.split('token')[1].substr(1);
    return address;
}

export function extractLogoUrl(link){
    const logo = link.split('token/')[1];
    return logo;
}