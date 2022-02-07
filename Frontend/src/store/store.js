import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './slices/network-slice'
import currenciesReducer from './slices/currencies-slice'
import tredingsReducer from './slices/trendings-slice'
export default configureStore({
  reducer: {
      network:networkReducer,
      currencies:currenciesReducer,
      trendings:tredingsReducer
  },
})