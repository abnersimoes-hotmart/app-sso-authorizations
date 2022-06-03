import React, { useState } from 'react'

import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import ModalHeader from 'components/basic/Modal/Header'

import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useVulcanoContext } from 'src/VulcanoContext'
import { getMoneyFormat } from 'utils/priceFormat'
import { Tag, Button, Table } from 'components/basic'
import { RootState } from 'ducks/index'

import './style.scss'

const ProductOffers = () => {
  const { t } = useTranslation()
  const { user: { profile: { locale } = {} } } = useVulcanoContext()
  const { details: { productDetails: { offers } } } = useSelector(({ product }: RootState) => product)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const maxOffersToShowOnDetailsPage = 4

  const openOffersModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const renderOfferTable = isInsideModal => {
    const offersToDisplay = isInsideModal ? offers : offers.slice(0, maxOffersToShowOnDetailsPage)

    return (
      <Table
        border="bordered"
        className="_p-3 table-cell-width">
        <Table.Header>
          <Table.Tr>
            <Table.Th className="_pr-2">{t('product_details.offers.table.offer')}</Table.Th>
            <Table.Th className="_pr-2">{t('product_details.offers.table.price')}</Table.Th>
            <Table.Th className="_pr-2">{t('product_details.offers.table.active_recovery')}</Table.Th>
          </Table.Tr>
        </Table.Header>
        <Table.Body>
          {
            offersToDisplay.map((offer, index) => {
              return (
                <Table.Tr key={`offer_${index}`}>
                  <Table.Td className="_pr-2">{offer.offerDescription}</Table.Td>
                  <Table.Td className="details-table text-center">
                    {
                      getMoneyFormat(offer.price.value, offer.price.currencyCode, locale)
                    }
                  </Table.Td>
                  <Table.Td className="details-table text-center">
                    {
                      offer.recoveryWithSmartInstallment ? (
                        <Tag
                          key="tag_recovery_activated"
                          id="tag_recovery_activated"
                          type="blue"
                          dismissible={false}
                          className="_mr-3">
                          {t('product_details.offers.table.activated')}
                        </Tag>
                      ) : (
                        <Tag
                          key="tag_recovery_deactivated"
                          id="tag_recovery_deactivated"
                          dismissible={false}
                          className="_mr-3">
                          {t('product_details.offers.table.deactivated')}
                        </Tag>
                      )
                    }
                  </Table.Td>
                </Table.Tr>
              )
            })
          }
        </Table.Body>
      </Table>
    )
  }

  return (
    <div className="hot-row _my-7">
      <div className="hot-col-md-6 hot-col-sm-12 _text-break">
        <h3>{t('product_details.offers.title')}</h3>
        <p>{t('product_details.offers.description')}</p>
        <h5>{t('product_details.offers.sales_recovery.title')}</h5>
        <p>{t('product_details.offers.sales_recovery.description')}</p>
      </div>
      <div className="hot-col-md-6 hot-col-sm-12 _text-break">
        {
          renderOfferTable(false)
        }
        {
          offers.length >= maxOffersToShowOnDetailsPage && (
            <Button
              onClick={openOffersModal}
              variation="primary">
              {t('product_details.offers.see_more_offers')}
            </Button>
          )
        }
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}>
          <ModalHeader>
            <h4 className="_mb-0">
              {t('product_details.offers.title')}
            </h4>
          </ModalHeader>
          <ModalBody className="hot-modal__dialog _w-full _p-4">
            {
              renderOfferTable(true)
            }
          </ModalBody>
        </Modal>
      </div>
    </div>
  )
}

export default ProductOffers
