import { configureStore } from '@reduxjs/toolkit'
import currenciesReducer from './slices/currencies-slice'
import networkReducer from './slices/network-slice'
export default configureStore({
  reducer: {
      network:networkReducer,
      currencies:currenciesReducer
  },
})