import { createSlice } from '@reduxjs/toolkit'


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    browserWidth: 1600,
  },
  reducers: {
    setBrowserWidth: (state, action) => {
      state.browserWidth = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const {  setBrowserWidth } = appSlice.actions

export default appSlice.reducer