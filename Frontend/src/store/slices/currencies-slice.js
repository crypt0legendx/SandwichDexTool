import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const getPresaleTokens =  createAsyncThunk("currencies/getPresaleTokens", async()=>{
    console.log('get_presale_tokens');
    const response = await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/third-api/presale-tokens`);
    console.log(response.data);
    return response.data;
            
})

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    isLoading: false,
    ranking: [],
    favourites:[],
    presaleTokens:[],
    InvalidCMC:[
      'aCRV','wMANA','BSC-USD','IOTA','PAX'
    ]
  },
  reducers: {
    changeRanking: (state, action) => {
      state.ranking = action.payload
    },

    changeFavourites: (state, action) => {
      state.favourites = action.payload
    },

    changeLoading:(state, action) => {
        state.isLoading = action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getPresaleTokens.fulfilled,(state, action)=>{
      if(action.payload){
        state.presaleTokens = action.payload
      }      
    })
  }
})

// Action creators are generated for each case reducer function
export const {  changeRanking,changeFavourites, changeLoading } = currenciesSlice.actions

export default currenciesSlice.reducer