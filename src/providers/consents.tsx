import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { showErrorAlert } from 'utils/toast'
import { getSsoConsents } from 'services/sso'
import ConsentsContext, { Consents } from 'state/consents'

const ConsentsProvider: React.FC = ({ children }) => {
  const [consents, setConsents] = useState<Consents>([])
  const [isConsentsLoading, setIsConsentsLoading] = useState(true)
  // const { t } = useTranslation()

  const getConsents = async (ucode: string) => {
    try {
      setIsConsentsLoading(true)
      const data = await getSsoConsents(ucode)

      setConsents(data as Consents)
    } catch (err) {
      console.log({ err })
      // showErrorAlert(t('errorMessages.generic'))
    } finally {
      setIsConsentsLoading(false)
    }
  }

  const value = {
    consents,
    getConsents,
    isConsentsLoading
  }

  return <ConsentsContext.Provider value={value}>{children}</ConsentsContext.Provider>
}

export default ConsentsProvider
