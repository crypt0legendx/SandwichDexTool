import { createSlice } from '@reduxjs/toolkit'


export const currenciesSlice = createSlice({
  name: 'currencies',
  initialState: {
    isLoading: false,
    ranking: [],
    favourites:[],
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
})

// Action creators are generated for each case reducer function
export const {  changeRanking,changeFavourites, changeLoading } = currenciesSlice.actions

export default currenciesSlice.reducer