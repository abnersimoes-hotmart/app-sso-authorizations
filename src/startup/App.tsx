import React, { useEffect } from 'react'

import VulcanoProvider from 'src/VulcanoContext'
import { Button } from 'components/basic'
import { initRequestConfiguration } from 'utils/request'
import { IUser } from 'utils/interfaces/userInformation'

import '../cosmos'
import useConsents from 'hooks/useConsents'

interface IPropTypes {
  user: IUser
}

const App = ({ user }: IPropTypes) => {
  const { consents, getConsents, isConsentsLoading } = useConsents()
  const {
    token,
    profile: { ucode }
  } = user

  useEffect(() => {
    getConsents(ucode)
    // getSsoConsents(ucode).then((res: unknown) => console.log(res))
  }, [ucode])

  useEffect(() => {
    if (!isConsentsLoading) {
      console.log({ consents })
    }
  }, [isConsentsLoading, consents])

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
