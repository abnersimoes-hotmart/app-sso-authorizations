import React, { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { IUser } from 'utils/interfaces/userInformation'

const vulcanoBaseName = window.location.pathname.match(/(.*market)/g)
const App = lazy(() => import('./App'))

interface IPropTypes {
  user: IUser
}

const Root = ({ user }: IPropTypes) => (
  <Suspense fallback={null}>
    <BrowserRouter basename={vulcanoBaseName ? vulcanoBaseName[0] : ''}>
      <App user={user} />
    </BrowserRouter>
  </Suspense>
)

export default Root
