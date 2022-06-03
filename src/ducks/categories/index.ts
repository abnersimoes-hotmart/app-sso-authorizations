import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import CategoryModel from './model'

const initialState: { categoriesList: Array<CategoryModel> } = {
  categoriesList: []
}

const allotmentSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategoriesList: (state, action: PayloadAction<Array<CategoryModel>>) => {
      state.categoriesList = action.payload
    }
  }
})

export const { setCategoriesList } = allotmentSlice.actions
export default allotmentSlice.reducer
