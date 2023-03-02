import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  theme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    dark: (state) => {
      state.theme = 'dark'
    },
    light: (state) => {
      state.theme = 'light'
    }
  },
})

// Action creators are generated for each case reducer function
export const { dark, light } = themeSlice.actions

export default themeSlice.reducer