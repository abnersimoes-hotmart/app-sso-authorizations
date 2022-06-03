import React, { useEffect } from 'react'

import VulcanoProvider from 'src/VulcanoContext'
import { Button } from 'components/basic'
import { initRequestConfiguration } from 'utils/request'
import { IUser } from 'utils/interfaces/userInformation'

import '../cosmos'

interface IPropTypes {
  user: IUser
}

const App = ({ user }: IPropTypes) => {
  const { token } = user

  useEffect(() => {
    initRequestConfiguration(token)
  }, [token])

  return (
    <VulcanoProvider user={user}>
      <Button>TESTE</Button>
    </VulcanoProvider>
  )
}

export default App
