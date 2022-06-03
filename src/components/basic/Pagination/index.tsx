import React from 'react'

import { Icon } from 'components/basic'
import { DefaultIconSize } from 'utils/constants'
import createRangeArray from 'utils/createRangeArray'

const BUTTONS_AVAILABLE_PAGES = 5

interface IPropTypes {
  onChangePage: (page: number) => void
  size: number
  activePage: number
  totalPages: number
  className?: string
}

const Pagination = ({ onChangePage, className = '', size, activePage, totalPages }: IPropTypes) => {
  const getButtonNumberBasedOnActivePage = () => {
    return activePage - (activePage % BUTTONS_AVAILABLE_PAGES)
  }

  const getFirstButtonNumber = () => {
    return activePage <= BUTTONS_AVAILABLE_PAGES ? 1 : getButtonNumberBasedOnActivePage()
  }

  const firstButton = getFirstButtonNumber()
  const getPagesInButtons = (firstButton, totalPages) => {
    if (totalPages < BUTTONS_AVAILABLE_PAGES) {
      return createRangeArray(1, totalPages + 1, 1)
    } else if (firstButton + BUTTONS_AVAILABLE_PAGES > totalPages) {
      return createRangeArray(totalPages - 4, totalPages + 1, 1)
    } else if (firstButton - 1 <= 0) {
      return createRangeArray(1, 6, 1)
    } else {
      return createRangeArray(firstButton, firstButton + 6, 1)
    }
  }

  const handleChangeSelectedPage = selectedPage => {
    if (selectedPage <= 0) {
      onChangePage(1)
    } else if (selectedPage >= totalPages) {
      onChangePage(totalPages)
    } else {
      onChangePage(selectedPage)
    }
  }

  const renderPagesInButton = (pagesInButtons: number[] = []) => {
    return pagesInButtons.map(page => {
      const isActivePage = activePage === page

      return (
        <hot-pagination-item
          key={page}
          class={`${isActivePage ? 'hot-pagination__item--active' : ''}`}
          onClick={() => handleChangeSelectedPage(page)}
        >
          {page}
        </hot-pagination-item>
      )
    })
  }

  const renderPages = (totalPages, firstButton) => {
    if (totalPages < BUTTONS_AVAILABLE_PAGES) {
      firstButton = 1
    } else if (activePage % BUTTONS_AVAILABLE_PAGES === 0) {
      firstButton = activePage
    } else {
      firstButton = activePage - (activePage % BUTTONS_AVAILABLE_PAGES)
    }
    const pagesInButtons: number[] = getPagesInButtons(firstButton, totalPages)

    return [...renderPagesInButton(pagesInButtons)]
  }

  return (
    <hot-pagination class={`${className} hot-pagination--${size}`.trim()}>
      <hot-pagination-item
        class={`${activePage - 1 <= 0 ? 'hot-pagination__item--disabled' : ''}`}
        onClick={() => handleChangeSelectedPage(activePage - 1)}
        disabled={activePage - 1 <= 0}
      >
        <Icon type="regular" iconName="chevron-left" fontSize={DefaultIconSize} className="_p-0" />
      </hot-pagination-item>

      {renderPages(totalPages, firstButton)}

      <hot-pagination-item
        class={`${activePage === totalPages ? 'hot-pagination__item--disabled' : ''}`}
        onClick={() => handleChangeSelectedPage(activePage + 1)}
        disabled={activePage === totalPages}
      >
        <Icon type="regular" iconName="chevron-right" fontSize={DefaultIconSize} className="_p-0" />
      </hot-pagination-item>
    </hot-pagination>
  )
}

export default Pagination
