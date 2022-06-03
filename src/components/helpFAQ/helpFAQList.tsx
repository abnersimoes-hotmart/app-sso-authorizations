import React from 'react'
import { Translation } from 'react-i18next'

import { helpFAQLinks } from './helpFAQLinks'

export const helpFAQList = (locale: string) => {
  return [
    {
      id: 1,
      title: 'help.question_1.question_temperature_rate_blueprint',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_1.answer_temperature')} <a href={helpFAQLinks.question_1[0][locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a>.</p>
                <p>{t('help.question_1.answer_blueprint')} <a href={helpFAQLinks.question_1[1][locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a>.</p>
                <p>{t('help.question_1.answer_rating')} <a href={helpFAQLinks.question_1[2][locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a>.</p>
              </>
            )
          }
        </Translation>
      )
    }, {
      id: 2,
      title: 'help.question_2.question_affiliation_type',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_2.answer_affiliation_type')}</p>
                <ul className="_pl-3">
                  <li>{t('help.question_2.answer_open_affiliation')}</li>
                  <li>{t('help.question_2.answer_moderated_affiliation')}</li>
                </ul>
                <p><a href={helpFAQLinks.question_2[locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a></p>
              </>
            )
          }
        </Translation>
      )
    }, {
      id: 3,
      title: 'help.question_3.question_commission_type',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_3.answer_commissioned_sales')}</p>
                <ul className="_pl-3">
                  <li>{t('help.question_3.answer_last_click')}</li>
                  <li>{t('help.question_3.answer_first_click')}</li>
                  <li>{t('help.question_3.answer_multiple_clicks')}</li>
                </ul>
                <p><a href={helpFAQLinks.question_3[locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a></p>
              </>
            )
          }
        </Translation>
      )
    }, {
      id: 4,
      title: 'help.question_4.question_commission_sale',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_4.answer_commission_sale')}</p>
                <p><a href={helpFAQLinks.question_4[locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a></p>
              </>
            )
          }
        </Translation>
      )
    }, {
      id: 5,
      title: 'help.question_5.question_other_currencies',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_5.answer_currency_determined')}</p>
                <ul className="_pl-3">
                  <li>{t('help.question_5.answer_currency_country')}</li>
                  <li>{t('help.question_5.answer_currency_offer')}</li>
                  <li>{t('help.question_5.answer_currency_purchase')}</li>
                </ul>
                <p>{t('help.question_5.answer_commission_paid')}</p>
                <p><a href={helpFAQLinks.question_5[locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a></p>
              </>
            )
          }
        </Translation>
      )
    }, {
      id: 6,
      title: 'help.question_6.question_affiliation_request',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_6.answer_responsibility_producer')} <a href="https://app-vlc.hotmart.com/products/affiliate" target="_blank" rel="noreferrer">{t('help.question_6.answer_orders_sent')}</a></p>
                <p><a href={helpFAQLinks.question_6[locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a></p>
              </>
            )
          }
        </Translation>
      )
    }, {
      id: 7,
      title: 'help.question_7.question_automatic_cancellation',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_7.answer_automatic_cancellation')}</p>
                <p><a href={helpFAQLinks.question_7[locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a></p>
              </>
            )
          }
        </Translation>
      )
    }, {
      id: 8,
      title: 'help.question_8.question_quantity_products',
      content: (
        <Translation>
          {
            t => (
              <>
                <p>{t('help.question_8.answer_quantity_products')}</p>
                <p><a href={helpFAQLinks.question_8[locale]} target="_blank" rel="noreferrer">{t('general.know_more')}</a></p>
              </>
            )
          }
        </Translation>
      )
    }
  ]
}

