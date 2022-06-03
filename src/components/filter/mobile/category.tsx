import React from 'react'

import { useTranslation } from 'react-i18next'

import { useSelector } from 'react-redux'

import { getCategoryIconById } from './categoryIcons'

import { Button, Icon, Tag } from 'components/basic'
import { RootState } from 'ducks/index'

import './style.scss'

interface ICategory {
  id: number,
  name: string
}

interface IPropTypes {
  handleSelectedCategory: (category: ICategory) => void,
  selectedCategory: ICategory
}

const CategoriesMobile = ({ handleSelectedCategory, selectedCategory }:IPropTypes) => {
  const { t } = useTranslation()

  const { categoriesList } = useSelector(({ categories }: RootState) => categories)

  return (
    <>
      {categoriesList.map(category => {
        return (
          <Button
            className="categories--button _border-0 _p-0 _m-2"
            key={`category${category.id}`}
            onClick={() => handleSelectedCategory(category)}>
            <Tag
              key={`category${category.id}`}
              id={`category${category.id}`}
              dismissible={false}
              type={selectedCategory.id === category.id ? 'blue' : ''}>
              {t(category.name)}
              <Icon
                className="_ml-2"
                type="light"
                iconName={getCategoryIconById(category.id)} />
            </Tag>
          </Button>
        )
      })}
    </>
  )
}

export default CategoriesMobile
