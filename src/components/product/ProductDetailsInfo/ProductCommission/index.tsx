import React from 'react'

import { isMediumOrLowerScreen } from 'utils/constants'
import { useTranslation } from 'react-i18next'
import { useVulcanoContext } from 'src/VulcanoContext'
import { ICommission } from 'utils/interfaces/productInformation'
import { getMoneyFormat } from 'utils/priceFormat'
import { Accordion, Table, Tag } from 'components/basic'

import './style.scss'

interface IPropTypes {
  commissions: Array<ICommission>
}

const ProductCommission = ({ commissions }: IPropTypes) => {
  const { t } = useTranslation()
  const { user: { profile: { locale } = {} } } = useVulcanoContext()

  return (
    <div>
      {
        isMediumOrLowerScreen ? (
          commissions.map(plan => {
            const currency = plan.currencyValue.currencyCode
            const formatedPrice = getMoneyFormat(
              plan.currencyValue.value,
              currency,
              locale
            )

            const formatedSalesGain = getMoneyFormat(
              plan.standardCommissionValue,
              currency,
              locale
            )

            const formatedRecurrentGain = getMoneyFormat(
              plan.recurringCommissionValue,
              currency,
              locale
            )

            return (
              <Accordion className="_my-4" key={plan.name} title={plan.name}>
                <div className="_d-flex _align-items-center _my-2">
                  <strong>{t('general.price')}: </strong>
                  <Tag
                    className="_ml-3"
                    id={`price-${plan.name}`}
                    dismissible={false}>
                    {formatedPrice}
                  </Tag>
                </div>
                <div className="_d-flex _align-items-center _my-2">
                  <strong>{t('product_details.gain_per_sale')}: </strong>
                  <Tag
                    className="_ml-3"
                    id={`price-${plan.name}`}
                    type="green"
                    dismissible={false}>
                    {formatedSalesGain}
                  </Tag>
                </div>
                <div className="_d-flex _align-items-center _my-2">
                  <strong>{t('product_details.recurrent_gain')}: </strong>
                  <Tag
                    className="_ml-3"
                    id={`price-${plan.name}`}
                    type="green"
                    dismissible={false}>
                    {formatedRecurrentGain}
                  </Tag>
                </div>
              </Accordion>
            )
          })
        ) : (
          <Table
            border="bordered"
            hover={true}
            striped={true}
            className="_bg-white _p-3">
            <Table.Header>
              <Table.Tr>
                <Table.Th className="_pr-2 details-table">{t('general.name')}</Table.Th>
                <Table.Th className="_pr-2 details-table">{t('general.price')}</Table.Th>
                <Table.Th className="_pr-2 details-table">{t('product_details.gain_per_sale')}</Table.Th>
                <Table.Th className="_pr-2 details-table">{t('product_details.recurrent_gain')}</Table.Th>
              </Table.Tr>
            </Table.Header>
            <Table.Body className="commissions-table">
              {
                commissions.map((plan, index) => {
                  const currency = plan.currencyValue.currencyCode
                  const formatedPrice = getMoneyFormat(
                    plan.currencyValue.value,
                    currency,
                    locale
                  )
                  const formatedSalesGain = getMoneyFormat(
                    plan.standardCommissionValue,
                    currency,
                    locale
                  )

                  const formatedRecurrentGain = getMoneyFormat(
                    plan.recurringCommissionValue,
                    currency,
                    locale
                  )

                  return (
                    <Table.Tr key={`plan_${index}`}>
                      <Table.Td className="_pr-2 details-table"><div className="_w-full plan-name">{plan.name}</div></Table.Td>
                      <Table.Td className="details-table text-center">{formatedPrice}</Table.Td>
                      <Table.Td className="details-table text-center">{formatedSalesGain}</Table.Td>
                      <Table.Td className="details-table text-center">{formatedRecurrentGain}</Table.Td>
                    </Table.Tr>
                  )
                })
              }
            </Table.Body>
          </Table>
        )
      }
    </div>
  )
}

export default ProductCommission
