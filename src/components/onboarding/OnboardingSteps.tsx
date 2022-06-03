import React, { ReactNode } from 'react'

import { Trans } from 'react-i18next'
import { isSmallScreen } from 'utils/constants'

import FirstStepImage from 'src/assets/images/onboarding/ilustra_01.svg'
import SecondStepImage from 'src/assets/images/onboarding/ilustra_02.svg'
import ThirdStepImage from 'src/assets/images/onboarding/ilustra_03.svg'

import FirstStepImageMobile from 'src/assets/images/onboarding/mobile/mobile_onboarding_1.svg'
import SecondStepImageMobile from 'src/assets/images/onboarding/mobile/mobile_onboarding_2.svg'
import ThirdStepImageMobile from 'src/assets/images/onboarding/mobile/mobile_onboarding_3.svg'

interface IStep {
  currentStep: number,
  name: string,
  t: (string) => string
}

export const getPropertiesValues = ({ currentStep, name, t }: IStep) => {
  let hasCancelButton = false
  let nextButtonLabel = ''
  let stepTitle: string | ReactNode = ''
  let className = ''
  let description = ''
  let listContent: Array<string> = []
  let image = ''
  let imageAlt = ''
  let cancelButtonLabel = ''

  if (currentStep === 1) {
    hasCancelButton = true
    nextButtonLabel = t('onboarding.lets_go')
    stepTitle = <Trans
      i18nKey={'onboarding.first_step.title'}
      values={{
        userName: name
      }} />
    className = ''
    description = t('onboarding.first_step.description')
    listContent = []
    image = isSmallScreen ? FirstStepImageMobile : FirstStepImage
    imageAlt = t('onboarding.first_step.image_description')
    cancelButtonLabel = t('onboarding.not_now')
  } else if (currentStep === 2) {
    hasCancelButton = true
    nextButtonLabel = t('onboarding.next')
    stepTitle = t('onboarding.second_step.title')
    className = t('second-step-image')
    description = ''
    listContent = [
      'onboarding.second_step.first_topic',
      'onboarding.second_step.second_topic',
      'onboarding.second_step.third_topic',
      'onboarding.second_step.fourth_topic'
    ]
    image = isSmallScreen ? SecondStepImageMobile : SecondStepImage
    imageAlt = t('onboarding.second_step.image_description')
    cancelButtonLabel = t('onboarding.not_now')
  } else {
    hasCancelButton = false
    nextButtonLabel = t('onboarding.go_to_the_market')
    stepTitle = t('onboarding.third_step.title')
    className = ''
    description = t('onboarding.third_step.description')
    listContent = [
      'onboarding.third_step.first_topic',
      'onboarding.third_step.second_topic',
      'onboarding.third_step.third_topic'
    ]
    image = isSmallScreen ? ThirdStepImageMobile : ThirdStepImage
    imageAlt = t('onboarding.third_step.image_description')
    cancelButtonLabel = ''
  }

  const properties = {
    hasCancelButton,
    nextButtonLabel,
    stepTitle,
    className,
    description,
    listContent,
    image,
    imageAlt,
    cancelButtonLabel
  }

  return properties
}
