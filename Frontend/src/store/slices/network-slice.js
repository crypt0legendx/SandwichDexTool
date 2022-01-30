import { createSlice } from '@reduxjs/toolkit'

export const networkSlice = createSlice({
  name: 'network',
  initialState: {
    name: "BSC",
  },
  reducers: {
    changeNetwork: (state, action) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  changeNetwork } = networkSlice.actions

export default networkSlice.reducer