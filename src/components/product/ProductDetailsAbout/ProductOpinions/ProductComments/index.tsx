import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useVulcanoContext } from 'src/VulcanoContext'
import dayjs from 'utils/date'

import { useFetchProductCommentsQuery } from 'api/useFetchProductCommentsQuery'
import { Icon, Loader, Nav, Pagination } from 'components/basic'
import { isMediumOrLowerScreen, RouteNames } from 'utils/constants'

type TTabs = 'ALL' | 'POSITIVE' | 'NEGATIVE'

interface IProductCommentsProps {
  pagination?: boolean,
  rows?: number,
  productUcode: string,
  producerUcode: string,
  showButtonSeeMore?: boolean
}

const ProductComments = ({
  pagination = false,
  rows = 2,
  productUcode,
  producerUcode,
  showButtonSeeMore
}: IProductCommentsProps) => {
  const { t } = useTranslation()
  const { user } = useVulcanoContext()

  const locale = user.profile.locale.toLocaleLowerCase().replace('_', '-')

  const moreCommentsResultLink = `.${RouteNames.COMMENTS_RESULTS}?producerUcode=${producerUcode}&productUcode=${productUcode}`

  const tabs: TTabs[] = ['ALL', 'POSITIVE', 'NEGATIVE']
  const [activeTab, setActiveTab] = useState<TTabs>('ALL')
  const [selectedPage, setSelectedPage] = useState<number>(1)

  const fetchProductCommentsTotal = useFetchProductCommentsQuery({
    rows,
    productUcode,
    page: selectedPage,
    evaluation: 'ALL'
  })

  const { isLoading, isError, data } = useFetchProductCommentsQuery({
    rows,
    productUcode,
    page: selectedPage,
    evaluation: activeTab
  })

  const handleClickActiveTab = (tab: TTabs) => {
    setActiveTab(tab)
    setSelectedPage(1)
  }

  const handleSelectedPage = page => {
    setSelectedPage(page)
  }

  const _renderButtonSeeMore = () => {
    if (showButtonSeeMore) {
      return (
        <Link
          className={isMediumOrLowerScreen ? 'hot-button hot-button--secondary _w-full' : ''}
          to={moreCommentsResultLink}
        >
          {t('client_rating.see_all')}
          <Icon
            className="_ml-2"
            type={isMediumOrLowerScreen ? 'light' : 'regular'}
            iconName={isMediumOrLowerScreen ? 'arrow-right' : 'chevron-right'}
            width={16}
            height={16}
          />
        </Link>
      )
    }

    return null
  }

  const _renderTabListComments = () => {
    if (isLoading) {
      return <Loader />
    }

    if (isError || !data) {
      return null
    }

    if (data.total === 0) {
      return (
        <div className="_my-8 _px-2">
          <span>{t('general.no_rating')}</span>
        </div>
      )
    }

    return (
      <div className="_mt-8">
        {data.answers.map((answer, index) => (
          <div key={`${answer.userName}-${answer.date}-${index}`} className="_mb-8">
            <div>
              <Icon
                width={16}
                height={16}
                type="solid"
                iconName="star"
                className="_text-yellow-light"
              />
              <span className="_text-gray-500 _pl-2">
                {answer.rate}
              </span>
            </div>
            <div>
              <div className="_mt-2">{answer.text}</div>
              <div className="_text-2 _mt-2 _text-gray-400 _text-uppercase">
                {answer.userName}. {dayjs(answer.date).locale(locale).format('ll')}
              </div>
            </div>
          </div>
        ))}

        {
          _renderButtonSeeMore()
        }

        {pagination && data.total > 0 && (
          <div className="_d-flex _justify-content-center _pb-8">
            <Pagination
              size={rows}
              activePage={selectedPage}
              totalPages={Math.ceil(data.total / rows)}
              onChangePage={handleSelectedPage}
            />
          </div>
        )}
      </div>
    )
  }

  if (fetchProductCommentsTotal.isLoading) {
    return <Loader />
  }

  if (fetchProductCommentsTotal.isError
    || !fetchProductCommentsTotal.data
    || fetchProductCommentsTotal.data.total === 0) {
    return null
  }

  return (
    <>
      <div className="_mt-9">
        <Nav>
          {tabs.map(tab => (
            <Nav.Item
              key={tab}
              active={activeTab === tab}
              onClick={() => handleClickActiveTab(tab)}
            >
              {t(`client_rating.${tab.toLowerCase()}`)}
            </Nav.Item>
          ))}
        </Nav>
      </div>

      {
        _renderTabListComments()
      }
    </>
  )
}

export default ProductComments
