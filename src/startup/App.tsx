import React, { useEffect } from 'react'
import VulcanoProvider from 'context/VulcanoContext'
import { Button } from 'components/basic'
import { IUser } from 'utils/interfaces/user.interface'
import { useConsents } from 'context/ConsentsContext'
import '../cosmos'

interface IPropTypes {
  user: IUser
}

const App = ({ user }: IPropTypes) => {
  const { consents, getConsents, isConsentsLoading } = useConsents()
  const {
    profile: { ucode }
  } = user

  useEffect(() => {
    getConsents(ucode)
  }, [ucode, getConsents])

  useEffect(() => {
    if (!isConsentsLoading) {
      console.log({ consents })
    }
  }, [isConsentsLoading, consents])

  return (
    <VulcanoProvider user={user}>
      <Button>TESTE</Button>
    </VulcanoProvider>
  )
}

export default App
