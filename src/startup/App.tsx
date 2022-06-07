import React, { useEffect } from 'react'
import { useConsents } from 'context/ConsentsContext'
import { useVulcanoContext } from 'context/VulcanoContext'
import '../cosmos'

const App = () => {
  const { consents, getConsents, isConsentsLoading } = useConsents()
  const { user } = useVulcanoContext()
  const { profile } = user

  useEffect(() => {
    getConsents(profile.ucode)
  }, [profile.ucode, getConsents])

  return (
    <>
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
    </>
  )
}

export default App
