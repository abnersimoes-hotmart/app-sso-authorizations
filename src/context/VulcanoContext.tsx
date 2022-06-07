import React, { createContext, useContext, ReactNode } from 'react'
import { IUser } from 'utils/interfaces/user.interface'

const VulcanoContext = createContext({
  user: { token: '', profile: { id: 0, locale: '', name: '', ucode: '' } }
})

export const useVulcanoContext = () => useContext(VulcanoContext)

interface IPropTypes {
  user: IUser
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
