import { useEffect, useState } from "react";
import { RiSearchLine, RiStarSLine, RiStarSFill} from "react-icons/ri";
import { FaRegStar, FaStar} from "react-icons/fa";

import "./style.css";

const SearchComplete = () => {
      
  const [filteredTokens, setFilteredTokens] = useState([
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'433.43', platform:'Polygon'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'Polygon'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'Ethereum'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'Ethereum'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
    {id:4943, name:'Dai', symbol:'DAI', price:'23.43', platform:'BSC'},
  ]);
  
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

   return (
    <>
      <div id="token-search">
        {/* <div className="backdrop"></div> */}
        <div id="search-wrapper" className = "search">
          <input id="search-field" className="search-field" placeholder="Search..." onFocus={()=>showSuggest()} />
          <div id="suggestion-list" className="suggestion-list hide-suggestion">
            <div className="suggestion-list-content">
                {filteredTokens.map((data, index)=>{
                  return <div key={index} className="filtered-token-item d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <button className="star-toggle-button">
                          <FaRegStar />
                        </button>
                        <img className="token-logo ml-2" src={`https://s2.coinmarketcap.com/static/img/coins/64x64/`+data.id+'.png'} alt="token-logo"/>
                        <div className="d-flex flex-column ml-2 justify-content-center">
                          <div className="token-name">{data.name}</div>
                          <div className="token-symbol">{data.symbol}</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <div className="token-price">${data.price}</div>
                        <div className={`token-platform ${data.platform}`}>{data.platform}</div>
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