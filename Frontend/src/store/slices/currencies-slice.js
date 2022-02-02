import { createSlice } from '@reduxjs/toolkit'

export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    isLoading: false,
    ranking: [],
  },
  reducers: {
    changeRanking: (state, action) => {
      state.ranking = action.payload
    },

    changeLoading:(state, action) => {
        state.isLoading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  changeRanking, changeLoading } = currenciesSlice.actions

export default currenciesSlice.reducer