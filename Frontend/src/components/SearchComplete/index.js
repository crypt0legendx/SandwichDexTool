import { useEffect, useState } from "react";
import { RiSearchLine, RiStarSLine, RiStarSFill} from "react-icons/ri";
import { FaRegStar, FaStar} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";

import {changeFavourites} from '../../store/slices/currencies-slice';
import useFavoriteHelper from "../../hooks/useFavoriteHelper";

import "./style.css";


const SearchComplete = () => {

  const [searchText, setSearchText] = useState("");
  const [activeCat, setActiveCategory] =useState("trending");
      
  const favourites = useSelector((state) => state.currencies.favourites);
  const trendings =  useSelector((state) => state.trendings.latest);

  const {toggleFavouriteToken, isFavourite} = useFavoriteHelper();

  const [filteredTrendings, setFilteredTrendings] = useState([]);
  const [filteredTokens, setFilteredTokens] = useState([]);

  const dispatch = useDispatch();
  

  useEffect(()=>{
    let ntrendings=[];
    trendings.forEach(t => {
      if(t.platform!=null){
        if(t.platform.slug=='ethereum'||t.platform.slug=='bnb'||t.platform.slug=='matic'){
          ntrendings.push(t);
        }
      }
    });
    setFilteredTrendings(ntrendings);
  },[trendings])


  useEffect(()=>{
    
    document.addEventListener('click',(e)=>{
      let tokenSearch = document.getElementById('token-search');
    
      if(!tokenSearch.contains(e.target)){
        let suggestionList = document.getElementById('suggestion-list');
        suggestionList.className="suggestion-list hide-suggestion";          
        if(document.getElementById('search-wrapper').classList.contains('open')){
          document.getElementById('search-wrapper').classList.remove('open');
        }
      }      
    })

    window.addEventListener('resize',(e)=>{
        setSuggestionRect();      
    });
  })

  const openSearch = () =>{
      document.getElementById('search-wrapper').className = "search open";
      showSuggest();   
  }

  const showSuggest = ()=>{
    document.getElementById('suggestion-list').classList.remove("hide-suggestion");
    setSuggestionRect();
  }

  const setSuggestionRect = () =>{
    let searchField = document.getElementById('search-field');
    
    let suggestionList = document.getElementById('suggestion-list');
    suggestionList.style.left=searchField.offsetLeft+'px';
    suggestionList.style.top=Number(searchField.offsetTop+50)+'px';
    suggestionList.style.width = searchField.offsetWidth+'px';
  }

  const changedSearchValue =(e) =>{
    setSearchText(e.target.value);
  }

  const getChainBySlug = (slug)=>{
    let chain = 'Other';
    if(slug=='bnb')
      chain = 'BSC'
    if(slug=='ethereum')
      chain = 'Ethereum'
    if(slug=='matic')
      chain = 'Polygon'

    return chain
  }
  const presetFavouriteToken = (tokenInfo)=>{

    const chain = getChainBySlug(tokenInfo.platform.slug);

    toggleFavouriteToken(
      {
        contractAddress:tokenInfo.platform.token_address,
        name:tokenInfo.name,
        symbol:tokenInfo.symbol,
        logo:`https://s2.coinmarketcap.com/static/img/coins/64x64/${tokenInfo.id}.png`,
        chain:chain

      }
    )
  }

   return (
    <>
      <div id="token-search">
        {/* <div className="backdrop"></div> */}
        <div id="search-wrapper" className = "search">
          <input 
          id="search-field" 
          className="search-field" 
          placeholder="Search..." 
          onFocus={()=>showSuggest()}
          onChange={(e)=>changedSearchValue(e)}
            />
          <div id="suggestion-list" className="suggestion-list hide-suggestion">
            <div className="suggestion-list-content">
                {
                  searchText==""&&(
                    <div className="category-bar">
                      <button 
                      className={activeCat=='trending'?`suggestion-category active cursor-pointer mr-1`:`suggestion-category cursor-pointer mr-1`}
                      onClick={()=>{setActiveCategory('trending')}}
                      >Trendings</button>
                      <button 
                      className={activeCat=='favorites'?`suggestion-category active cursor-pointer mr-1`:`suggestion-category cursor-pointer mr-1`}
                      onClick={()=>{setActiveCategory('favorites')}}
                      >Favorites</button>
                    </div>
                  )
                }
                {activeCat=="trending"&&filteredTrendings.map((data, index)=>{
                  return <div key={index} className="filtered-token-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button className={isFavourite(data.platform.token_address)?`star-toggle-button active`:`star-toggle-button`}
                            onClick={()=>{presetFavouriteToken(data)}}
                        >
                          <FaRegStar />
                        </button>
                        <img className="token-logo ml-2" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${data.id}.png`} alt="token-logo"/>
                        <div className="d-flex flex-column ml-2 justify-content-center">
                          <div className="token-name">{data.name}</div>
                          <div className="token-symbol">{data.symbol}</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="token-price"></div>
                        <div className={`token-platform ${getChainBySlug(data.platform.slug)}`}>{getChainBySlug(data.platform.slug)}</div>
                      </div>                                        
                  </div>
                })}
                {activeCat=="favorites"&&favourites.map((data, index)=>{
                  return <div key={index} className="filtered-token-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button className="star-toggle-button active" onClick={()=>toggleFavouriteToken(data)}>
                          <FaRegStar />
                        </button>
                        <img className="token-logo ml-2" src={data.logo} alt="token-logo"/>
                        <div className="d-flex flex-column ml-2 justify-content-center">
                          <div className="token-name">{data.name}</div>
                          <div className="token-symbol">{data.symbol}</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="token-price"></div>
                        <div className={`token-platform ${data.chain}`}>{data.chain}</div>
                      </div>                                        
                  </div>
                })}

            </div>
          </div>
        </div>
        <button id="search-btn" type="button " className="btn btn-default search-btn" onClick={()=>openSearch()}><RiSearchLine /></button>
      </div>
    </>
  );
};
export default SearchComplete;