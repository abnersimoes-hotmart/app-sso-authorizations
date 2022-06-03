import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICrumb } from 'utils/interfaces/breadcrumb'
import { RouteNames } from 'utils/constants'

const initialState: {
  breadcrumb: Array<ICrumb>
  } = {
    breadcrumb: [{
      item: 'general.title',
      link: `${RouteNames.ROOT}`,
      isActive: true
    }]
  }

const allotmentSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    setBreadcrumb: (state, action: PayloadAction<Array<ICrumb>>) => {
      state.breadcrumb = action.payload
    }
  }
})

export const { setBreadcrumb } = allotmentSlice.actions
export default allotmentSlice.reducer
