import React, { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import ConsentsProvider from 'src/providers/consents'

import { IUser } from 'utils/interfaces/userInformation'

const vulcanoBaseName = window.location.pathname.match(/(.*accounts\/settings)/g)
const App = lazy(() => import('./App'))

interface IPropTypes {
  user: IUser
}

const Root = ({ user }: IPropTypes) => (
  <Suspense fallback={null}>
    <BrowserRouter basename={vulcanoBaseName ? vulcanoBaseName[0] : ''}>
      <ConsentsProvider>
        <App user={user} />
      </ConsentsProvider>
    </BrowserRouter>
  </Suspense>
)

export default Root
