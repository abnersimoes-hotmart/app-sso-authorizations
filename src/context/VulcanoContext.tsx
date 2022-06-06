import React, { createContext, useContext, ReactNode } from 'react'

const VulcanoContext = createContext({
  user: { profile: { locale: '', name: '', email: '', id: 0 } }
})

export const useVulcanoContext = () => useContext(VulcanoContext)

interface IPropTypes {
  user: any
  children: ReactNode
}

const VulcanoProvider = ({ user, children }: IPropTypes) => {
  return (
    <VulcanoContext.Provider
      value={{
        user
      }}
    >
      {children}
    </VulcanoContext.Provider>
  )
}

export default VulcanoProvider
