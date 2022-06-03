import React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from 'components/basic'
import { ICategory } from 'utils/interfaces/productInformation'

import './style.scss'
interface IPropTypes {
  onChangeCategory: (category: ICategory) => void,
  categories: Array<ICategory>
  className?: string
}

const FilterCategories = ({ onChangeCategory, categories }: IPropTypes) => {
  const { t } = useTranslation()

  return (
    <div className="options-style _bg-white _mx-0 _p-4">
      {
        categories.map(category => {
          return (
            <Button
              variation="secondary"
              type="button"
              onClick={() => onChangeCategory(category)}
              key={`filter_categories_${category.id}`}
              className="category-button _border-0 _bg-white _w-full _text-left _py-1 _px-2"
              id={category.id}>
              {t(category.name)}
            </Button>
          )
        })
      }
    </div>

  )
}

export default FilterCategories
