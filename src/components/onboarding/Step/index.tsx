import React, { ReactNode } from 'react'

import { isMediumOrLowerScreen } from 'utils/constants'
import { useTranslation } from 'react-i18next'

import { Button, Icon } from 'components/basic'

import './style.scss'

interface IOnboardinStep {
  handleNextStep: (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleIsOpen: (event: React.MouseEvent<HTMLButtonElement>) => void,
  currentStep: number,
  hasCancelButton?: boolean,
  nextButtonLabel?: string | ReactNode,
  stepTitle: string | ReactNode,
  className?: string,
  description?: string | ReactNode,
  listContent?: Array<string>,
  image: string,
  imageAlt?: string,
  cancelButtonLabel?: string | ReactNode
}

const Step = ({
  handleNextStep,
  handleIsOpen,
  currentStep,
  hasCancelButton = false,
  nextButtonLabel = '',
  stepTitle,
  className = '',
  description = '',
  listContent = [],
  image,
  imageAlt = '',
  cancelButtonLabel = ''
}: IOnboardinStep) => {
  const { t } = useTranslation()

  return (
    <div className="hot-row _d-flex">
      {
        isMediumOrLowerScreen ? (
          <>
            <div className="hot-col-12 _d-flex _justify-content-center _mt-5">
              <img alt={imageAlt} src={image} />
            </div>
            <div className="hot-col-12 _p-5">
              <h3>
                {stepTitle}
              </h3>
              {
                description && (
                  <p>{description}</p>
                )
              }
              {
                listContent.length > 0 && (
                  <ul className="modal-list _p-0">
                    {
                      listContent.map((listElement, index) => {
                        return (
                          <li key={`list-${currentStep}-element-${index}`}>
                            {t(listElement)}
                          </li>
                        )
                      })
                    }
                  </ul>
                )
              }
              <div className="_w-full _justify-content-center">
                <div className="hot-col-12 _d-flex _my-3 _justify-content-center">
                  <Button
                    type="button"
                    variation="primary"
                    onClick={handleNextStep}>
                    <div className={`_d-flex _align-items-center _justify-content-center ${className}`}>
                      <div>
                        {nextButtonLabel}
                      </div>
                      <div>
                        <Icon
                          className="_ml-2"
                          type="regular"
                          iconName="arrow-right"
                          fontSize={2} />
                      </div>
                    </div>
                  </Button>
                </div>
                {
                  hasCancelButton
                  && <div className="hot-col-12 _d-flex _justify-content-center">
                    <Button
                      onClick={handleIsOpen}>
                      {cancelButtonLabel}
                    </Button>
                  </div>
                }
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="hot-col-6 _py-6 _pl-8">
              <div className="onboarding-description">
                <h3>
                  {stepTitle}
                </h3>
                {
                  description && (
                    <p>{description}</p>
                  )
                }
                {
                  listContent.length > 0 && (
                    <ul className="modal-list _p-0">
                      {
                        listContent.map((listElement, index) => {
                          return (
                            <li key={`list-${currentStep}-element-${index}`}>
                              {t(listElement)}
                            </li>
                          )
                        })
                      }
                    </ul>
                  )
                }
              </div>
              <div className="_d-flex _align-items-end">
                <Button
                  type="button"
                  className="_my-3 _mr-3"
                  variation="primary"
                  onClick={handleNextStep}>
                  <div className={`_d-flex _align-items-center _justify-content-center ${className}`}>
                    <div>
                      {nextButtonLabel}
                    </div>
                    <div>
                      <Icon
                        className="_ml-2"
                        type="regular"
                        iconName="arrow-right"
                        fontSize={2} />
                    </div>
                  </div>
                </Button>
                {
                  hasCancelButton && (
                    <Button
                      className="_my-3 _mr-3"
                      onClick={handleIsOpen}>
                      {cancelButtonLabel}
                    </Button>
                  )
                }
              </div>
            </div>
            <div className="hot-col-6 _d-flex _justify-content-end steps-image _p-0">
              <img alt={imageAlt} src={image} className="_w-full" />
            </div>
          </>
        )
      }
    </div>
  )
}

export default Step
