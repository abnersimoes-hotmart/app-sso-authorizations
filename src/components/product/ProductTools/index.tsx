import React, { useState, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

interface ICards {
  id: string,
  text: string
}

const ProductTools = productTools => {
  const [toolsCards, setToolsCards] = useState<Array<ICards>>([])
  const { t } = useTranslation()

  const generateToolsCardsList = useCallback(() => {
    const cards = toolsCards

    if (productTools.includes('affiliationResource')) {
      cards.push({ id: 'TAG_HAS_DIVULGATION_MATERIAL', text: 'product_details.divulgation_material.title' })
    }

    if (productTools.includes('alternativePage')) {
      cards.push({ id: 'HAS_ALTERNATIVE_PAGE', text: 'product_details.tags.alternative_page' })
    }

    setToolsCards(cards)
  }, [productTools, toolsCards])

  useEffect(() => {
    generateToolsCardsList()
  }, [generateToolsCardsList])

  return (
    <div className="hot-row _d-flex _mb-8">
      <div className="hot-col-12 _d-flex _justify-content-start">
        <h3 className="_mb-4">{t('product_details.affiliate.product_tools')}</h3>
      </div>
      <div className="hot-col-12 _d-flex _justify-content-start">
        {
          toolsCards.map(tool => {
            return (
              <div key={tool.id} className="hot-col-md-2 hot-col-sm-12 _d-flex _border-gray-200 _mr-3 _bg-white _border _rounded _p-3">
                {t(tool.text)}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ProductTools
