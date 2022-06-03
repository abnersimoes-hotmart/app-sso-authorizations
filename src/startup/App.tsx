import React, { useEffect } from 'react'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import Routes from './Routes'
import VulcanoProvider from 'src/VulcanoContext'
import store, { persistor } from './configuredStore'
import { Loader } from 'components/basic'
import { initRequestConfiguration } from 'utils/request'
import { IUser } from 'utils/interfaces/userInformation'
import { PostMessageTypes } from 'utils/constants'
import platformMessage from 'utils/platformMessage'

import '../cosmos'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    }
  }
})

interface IPropTypes {
  user: IUser
}

const App = ({ user }: IPropTypes) => {
  const { token } = user
  const location = useLocation()

  useEffect(() => {
    initRequestConfiguration(token)
  }, [token])

  useEffect(() => {
    platformMessage(PostMessageTypes.SCROLL_TO_TOP)
  }, [location.pathname, location.search])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <VulcanoProvider user={user}>
            <Routes />
          </VulcanoProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
