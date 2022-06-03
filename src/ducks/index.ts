import { combineReducers } from 'redux'

import categories from './categories'
import filters from './filters'
import product from './product'
import breadcrumb from './breadcrumb'

const appReducer = combineReducers({
  categories,
  filters,
  product,
  breadcrumb
})

export type RootState = ReturnType<typeof appReducer>

export default (state, action) => {
  return appReducer(state, action)
}
