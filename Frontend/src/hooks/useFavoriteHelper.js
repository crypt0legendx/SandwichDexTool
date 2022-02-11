
import {useSelector, useDispatch} from "react-redux";
import {changeFavourites} from '../store/slices/currencies-slice';


const useFavoriteHelper = () => {

    const dispatch = useDispatch();
    const favourites = useSelector((state) => state.currencies.favourites);

    const toggleFavouriteToken=(tokenInfo)=>{        
        let favouriteTokens = JSON.parse(localStorage.getItem('favourites'));
        if(favouriteTokens&&favouriteTokens.length>0){
            const idx = favouriteTokens.findIndex(d=>d.contractAddress == tokenInfo.contractAddress);
            if(idx ==-1){
                favouriteTokens.push(tokenInfo);
            }else{
                favouriteTokens.splice(idx,1);
            }
        }else{
            favouriteTokens=[tokenInfo];
        }
        localStorage.setItem('favourites', JSON.stringify(favouriteTokens));

        dispatch(changeFavourites(favouriteTokens));

    }

    const isFavourite=(contractAddress)=>{
        if(favourites.length==0)
        return false;
        const idx = favourites.findIndex(d=>d.contractAddress == contractAddress);
        if(idx ==-1)
            return false;
        else
            return true;
    }

    return {toggleFavouriteToken, isFavourite}
}

export default useFavoriteHelper;