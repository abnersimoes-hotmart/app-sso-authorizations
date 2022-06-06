/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from 'react'

export interface Consent {
  id: string
}

export type Consents = Array<Consent>

export interface ConsentsContextValues {
  consents: Consents
  getConsents: (ucode: string) => Promise<void>
  isConsentsLoading: boolean
}

export default createContext<ConsentsContextValues>({
  consents: [],
  getConsents: async () => {},
  isConsentsLoading: false
})
