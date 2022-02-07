import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';



export const getTrendings =  createAsyncThunk("trendings/getTrendings", async()=>{
    console.log('get_trendings');
    const response = await axios.get(`http://localhost:4000/coin-market-cap/trending`);
    console.log(response.data);
    return response.data;
            
})

export const trendingsSlice = createSlice({
  name: 'trendings',
  initialState: {
    data: [],
  },
  reducers: {
    changeTredings: (state, action) => {
      state.data = action.payload
    },
  },
  extraReducers:(builder)=>{
    builder.addCase(getTrendings.fulfilled,(state, action)=>{
      state.data = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
export const {  changeTredings } = trendingsSlice.actions

export default trendingsSlice.reducer