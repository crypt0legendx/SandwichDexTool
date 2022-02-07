import { createSlice } from '@reduxjs/toolkit'

export const networkSlice = createSlice({
  name: 'network',
  initialState: {
    name: "Ethereum",
    scanurl:"https://etherscan.io"
  },
  reducers: {
    changeNetwork: (state, action) => {
      state.name = action.payload.name;
      state.scanurl=action.payload.scanurl;
    },
  },
})

// Action creators are generated for each case reducer function
export const {  changeNetwork } = networkSlice.actions

export default networkSlice.reducer