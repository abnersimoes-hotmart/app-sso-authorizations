import React, { useEffect } from 'react'
import VulcanoProvider from 'context/VulcanoContext'
import { IUser } from 'utils/interfaces/user.interface'
import { useConsents } from 'context/ConsentsContext'
import '../cosmos'

interface IPropTypes {
  user: IUser
}

const App = ({ user }: IPropTypes) => {
  const { consents, getConsents, isConsentsLoading } = useConsents()
  const { profile } = user

  useEffect(() => {
    getConsents(profile.ucode)
  }, [profile.ucode, getConsents])

  return (
    <VulcanoProvider user={user}>
      {isConsentsLoading ? (
        <hot-loading />
      ) : (
        consents.map(({ id, serviceName, serviceInformationUrl }) => (
          <div key={id}>
            <h3>{serviceName}</h3>
            <span>{serviceInformationUrl}</span>
          </div>
        ))
      )}
    </VulcanoProvider>
  )
}

export default App
