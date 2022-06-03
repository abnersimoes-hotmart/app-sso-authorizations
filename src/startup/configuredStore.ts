import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage/session'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'

import ducks from 'ducks/index'

const blacklist = ['pricingBrazil']

const persistConfig = {
  key: 'root',
  storage,
  blacklist
}

const persistedReducer = persistReducer(persistConfig, ducks)
let middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({ level: 'info', collapsed: true })

  middlewares = [...middlewares, logger]
}

const store = createStore(persistedReducer, compose(
  applyMiddleware(...middlewares)
))

export const persistor = persistStore(store)

export default store
