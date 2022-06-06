import React, { createContext, useCallback, useContext, useState } from 'react'
import { getSsoConsents } from 'services/consents'
import { IConsents } from 'utils/interfaces/consent.interface'

export interface IConsentsContextValues {
  consents: IConsents
  getConsents: (ucode: string) => Promise<void>
  isConsentsLoading: boolean
}

const ConsentsContext = createContext<IConsentsContextValues>({
  consents: [],
  getConsents: async () => await Promise.resolve(),
  isConsentsLoading: false
})

export const useConsents = () => useContext(ConsentsContext)

const ConsentsProvider: React.FC = ({ children }) => {
  const [consents, setConsents] = useState<IConsents>([])
  const [isConsentsLoading, setIsConsentsLoading] = useState(true)

  const getConsents = useCallback(async (ucode: string) => {
    try {
      setIsConsentsLoading(true)
      const data = await getSsoConsents(ucode)

      setConsents(data as IConsents)
    } catch (err) {
      console.error(err)
    } finally {
      setIsConsentsLoading(false)
    }
  }, [])

  const value = {
    consents,
    getConsents,
    isConsentsLoading
  }

  return <ConsentsContext.Provider value={value}>{children}</ConsentsContext.Provider>
}

export default ConsentsProvider
