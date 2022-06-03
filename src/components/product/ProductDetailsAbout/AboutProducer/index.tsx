import React from 'react'

import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import sanitizeHtml from 'sanitize-html'
import { Badges } from 'components/general'
import { DefaultProfileImage } from 'utils/constants'

import { RootState } from 'ducks/index'

import '../style.scss'

const AboutProducer = () => {
  const { t } = useTranslation()

  const { details } = useSelector(({ product }: RootState) => product)

  return (
    <div className="hot-row _mt-md-7 _mt-sm-2">
      {details.productDetails.affiliatesProgramInformation && (
        <div className="hot-col-md-8 hot-col-sm-12 _text-break">
          <h3>{t('product_details.affiliation_rules')}</h3>
          <div
            className="text-wrapper"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(details.productDetails.affiliatesProgramInformation) }}
          />
        </div>
      )}
      <div className="hot-col-md-4 hot-col-sm-12 _text-break">
        <h3>{t('product_details.about_the_producer')}</h3>
        <div className="_d-block">
          <div className="hot-col-12 _d-flex _justify-content-start _p-0">
            <hot-avatar
              class="hot-avatar--xxl hot-avatar--circle"
              src={details.userProfile.urlPhoto || DefaultProfileImage}
            />
          </div>
          <div className="hot-col-12 _d-block _justify-content-start _p-0">
            <h5 className="hot-col-12 _d-flex _justify-content-start _p-0">{details.userProfile.name}</h5>
            <p className="hot-col-12 _d-flex _justify-content-start _p-0">
              {`${t('product_details.hotmarter_since')} ${details.userProfile.signupYear}`}
            </p>
          </div>
        </div>
        <hr />
        <div className="_d-block _justify-content-md-start _justify-content-sm-center">
          <h3>{t('general.achievements')}</h3>
          <Badges badges={details.userProfile.userBadges} />
        </div>
      </div>
    </div>
  )
}

export default AboutProducer
