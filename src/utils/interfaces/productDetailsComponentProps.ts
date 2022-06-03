import { ReactNode } from 'react'

export interface IProductDetailsComponentProps {
  componentProps: {
    generateAffiliationRuleTag: () => ReactNode,
    generateAffiliationTypeTag: () => ReactNode,
    generateCookiesTags: (cookieDuration: number) => ReactNode,
    generateTag: (name: string, label: string) => ReactNode,
    handleClickBuyProduct: () => void,
    handleCloseModal: () => void,
    handleCommissionType: () => ReactNode,
    isBookmarked: boolean,
    handleToggleBookmarked: () => void,
    isCommissionModalOpen: boolean,
    language: string,
    pullSessionId: string
  }
}
