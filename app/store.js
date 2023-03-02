import { configureStore } from '@reduxjs/toolkit'
import ThemeSlice from '../slices/ThemeSlice'

export const store = configureStore({
  reducer: { 
    theme: ThemeSlice, 
  },
})