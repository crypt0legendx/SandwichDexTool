import { createSlice } from '@reduxjs/toolkit'

//0xb4d78a81bb7f6d01dd9d053bff002e33aa2f7146
export const trackingSlice = createSlice({
  name: 'tracking',
  initialState: {
    currentAddress: "",
  },
  reducers: {
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {  setCurrentAddress } = trackingSlice.actions

export default trackingSlice.reducer