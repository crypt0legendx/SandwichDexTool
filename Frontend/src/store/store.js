import { configureStore } from '@reduxjs/toolkit'
import networkReducer from './slices/network-slice'
export default configureStore({
  reducer: {
      network:networkReducer
  },
})