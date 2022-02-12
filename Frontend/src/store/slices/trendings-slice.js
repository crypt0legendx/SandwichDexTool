import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const getTrendings =  createAsyncThunk("trendings/getTrendings", async()=>{
    console.log('get_trendings');
    const response = await axios.get(`http://localhost:4000/coin-market-cap/trending`);
    console.log(response.data);
    return response.data;
            
})

export const getGainersLosers =  createAsyncThunk("trendings/getGainersLosers", async()=>{
  console.log('get_gainers_losers');
  const response = await axios.get(`http://localhost:4000/coin-market-cap/gainers-losers`);
  console.log(response.data);
  return response.data;
          
})

export const trendingsSlice = createSlice({
  name: 'trendings',
  initialState: {
    latest: [],
    gainers:[],
    losers:[],

  },
  reducers: {
    changeTredings: (state, action) => {
      state.latest = action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getTrendings.fulfilled,(state, action)=>{
      state.latest = action.payload
    })
    builder.addCase(getGainersLosers.fulfilled,(state, action)=>{
      state.gainers = action.payload.gainers;
      state.losers = action.payload.losers;
    })
  }
})

// Action creators are generated for each case reducer function
export const {  changeTredings } = trendingsSlice.actions

export default trendingsSlice.reducer