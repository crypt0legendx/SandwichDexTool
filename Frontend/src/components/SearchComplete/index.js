import { useEffect, useState } from "react";
import { RiSearchLine, RiStarSLine, RiStarSFill} from "react-icons/ri";
import { FaRegStar, FaStar} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';

import { Link } from "react-router-dom";

import { extractNameSymbol } from "../../helpers/scrape";
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
    if(e.target.value!=""){
      axios.get(`http://localhost:4000/multi-chain-cap/search-tokens/${e.target.value}`)
        .then(function (response) {
            let datas = response.data;
            let searchedTokens = [];
            if(datas[0].length>0){
                for(let i =0; i<datas[0].length;i++){
                  if(datas[0][i].includes('Addresses')||datas[0][i].includes('Labels')||datas[0][i].includes("Tokens (ERC 721)"))
                    break;
                  const splitRslt = datas[0][i].split("\t");
                  
                  if(splitRslt[0]!="Tokens (ERC 20)"){
                    const {name,symbol} = extractNameSymbol(splitRslt[0]);
                    searchedTokens.push(
                      {
                        name: name,
                        symbol: symbol,
                        contractAddress: splitRslt[1],
                        logo:splitRslt[5]==""?'https://etherscan.io/images/main/empty-token.png':`https://etherscan.io/token/images/${splitRslt[5]}`,
                        chain:'Ethereum'
                      }
                    )
                  }                                    
                }                
            }
            if(datas[1].length>0){
              for(let i =0; i<datas[1].length;i++){
                if(datas[1][i].includes('Addresses')||datas[1][i].includes('Labels')||datas[1][i].includes("Tokens (ERC 721)"))
                  break;
                const splitRslt = datas[1][i].split("\t");
                
                if(splitRslt[0]!="Tokens (BEP 20)"){
                  const {name,symbol} = extractNameSymbol(splitRslt[0]);
                  searchedTokens.push(
                    {
                      name: name,
                      symbol: symbol,
                      contractAddress: splitRslt[1],
                      logo:splitRslt[5]==""?'https://bscscan.com/images/main/empty-token.png':`https://bscscan.com/token/images/${splitRslt[5]}`,
                      chain:'BSC'
                    }
                  )
                }                                    
              }
            }
            if(datas[2].length>0){
              for(let i =0; i<datas[2].length;i++){
                if(datas[2][i].includes('Addresses')||datas[2][i].includes('Labels')||datas[2][i].includes("Tokens (ERC 721)"))
                  break;
                const splitRslt = datas[2][i].split("\t");
                
                if(splitRslt[0]!="Tokens (ERC 20)"){
                  const {name,symbol} = extractNameSymbol(splitRslt[0]);
                  searchedTokens.push(
                    {
                      name: name,
                      symbol: symbol,
                      contractAddress: splitRslt[1],
                      logo:splitRslt[5]==""?'https://polygonscan.com/images/main/empty-token.png':`https://polygonscan.com/token/images/${splitRslt[5]}`,
                      chain:'Polygon'
                    }
                  )
                }                                    
              }
            }

            setFilteredTokens(searchedTokens);
        })
        .catch(function (error) {
            console.log(error);
        }).finally(()=>{
        });
    }

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
            autoComplete="off"
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
                {searchText==""&&activeCat=="trending"&&filteredTrendings.map((data, index)=>{
                  return <div key={index} className="filtered-token-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button className={isFavourite(data.platform.token_address)?`star-toggle-button active`:`star-toggle-button`}
                            onClick={()=>{presetFavouriteToken(data)}}
                        >
                          <FaRegStar />
                        </button>
                        <Link to={ `/chart/${getChainBySlug(data.platform.slug)}/${data.platform.token_address}`}>
                          <div className="d-flex align-items-center">
                            <img className="token-logo ml-2" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${data.id}.png`} alt="token-logo"/>
                            <div className="d-flex flex-column ml-2 justify-content-center">
                              <div className="token-name">{data.name}</div>
                              <div className="token-symbol">{data.symbol}</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="token-price"></div>
                        <div className={`token-platform ${getChainBySlug(data.platform.slug)}`}>{getChainBySlug(data.platform.slug)}</div>
                      </div>                                        
                  </div>
                })}
                {searchText==""&&activeCat=="favorites"&&favourites.map((data, index)=>{
                  return <div key={index} className="filtered-token-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button className="star-toggle-button active" onClick={()=>toggleFavouriteToken(data)}>
                          <FaRegStar />
                        </button>
                        <Link to={ `/chart/${data.chain}/${data.contractAddress}`}>
                          <div className="d-flex align-items-center">
                            <img className="token-logo ml-2" src={data.logo} alt="token-logo"/>
                            <div className="d-flex flex-column ml-2 justify-content-center">
                              <div className="token-name">{data.name}</div>
                              <div className="token-symbol">{data.symbol}</div>
                            </div>
                          </div>
                        </Link>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="token-price"></div>
                        <div className={`token-platform ${data.chain}`}>{data.chain}</div>
                      </div>                                        
                  </div>
                })}
                {searchText!=""&&filteredTokens.map((data, index)=>{
                  return <div key={index} className="filtered-token-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button className={isFavourite(data.contractAddress)?`star-toggle-button active`:`star-toggle-button`}
                            onClick={()=>{toggleFavouriteToken(data)}}
                        >
                          <FaRegStar />
                        </button>
                        <Link to={ `/chart/${data.chain}/${data.contractAddress}`}>
                          <div className="d-flex align-items-center">
                            <img className="token-logo ml-2" src={data.logo} alt="token-logo"/>
                            <div className="d-flex flex-column ml-2 justify-content-center">
                              <div className="token-name">{data.name}</div>
                              <div className="token-symbol">{data.symbol}</div>
                            </div>
                          </div>
                        </Link>
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