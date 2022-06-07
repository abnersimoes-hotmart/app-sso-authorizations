import React, { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ConsentsProvider from 'context/ConsentsContext'
import VulcanoProvider from 'context/VulcanoContext'
import { IUser } from 'utils/interfaces/user.interface'

const vulcanoBaseName = window.location.pathname.match(/(.*accounts\/settings)/g)
const App = lazy(() => import('./App'))

interface IPropTypes {
  user: IUser
}

const Root = ({ user }: IPropTypes) => (
  <Suspense fallback={null}>
    <h1>OPA</h1>
    <BrowserRouter basename={vulcanoBaseName ? vulcanoBaseName[0] : ''}>
      <VulcanoProvider user={user}>
        <ConsentsProvider>
          <App />
        </ConsentsProvider>
      </VulcanoProvider>
    </BrowserRouter>
  </Suspense>
)

export default Root
