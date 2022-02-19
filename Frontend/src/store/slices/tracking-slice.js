import { createSlice } from '@reduxjs/toolkit'

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