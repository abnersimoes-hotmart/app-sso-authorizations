import React, { useState, ReactNode, useEffect, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

import Step from './Step'
import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import { getPropertiesValues } from './OnboardingSteps'

import { useVulcanoContext } from 'src/VulcanoContext'

import './style.scss'

interface IOnboarding {
  isOpen: boolean,
  handleIsOpen: (Event) => void
}

interface IStepProperties {
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

const Onboarding = ({ isOpen, handleIsOpen }: IOnboarding) => {
  const [currentStep, setCurrentStep] = useState(1)
  const { t } = useTranslation()
  const { user: { profile: { name = t('general.user') } } } = useVulcanoContext()
  const [stepsProps, setStepsProps] = useState<IStepProperties>()

  const setLocalStorageOnboardingOption = () => {
    localStorage.setItem('showMarketOnboarding', 'false')
    handleIsOpen(false)
  }

  const handleCloseModal = () => {
    handleIsOpen(false)
    setLocalStorageOnboardingOption()
  }

  const getCurrentStepInformation = useCallback(() => {
    const properties = getPropertiesValues({ currentStep, name, t })

    if (properties) {
      setStepsProps(properties)
    }
  }, [currentStep, name, t])

  useEffect(() => {
    getCurrentStepInformation()
  }, [getCurrentStepInformation])

  const handleNextStep = () => {
    if (currentStep === 3) {
      handleCloseModal()
      setCurrentStep(1)
    } else {
      setCurrentStep(currentStep + 1)
      getCurrentStepInformation()
    }
  }

  return (
    <Modal
      className="hot-dropdocked"
      isOpen={isOpen}
      onClose={handleCloseModal}>
      <ModalBody
        className="onboarding-modal hot-modal__dialog _w-full _p-0">
        <Step
          handleNextStep={handleNextStep}
          handleIsOpen={handleCloseModal}
          currentStep={currentStep}
          hasCancelButton={stepsProps?.hasCancelButton}
          nextButtonLabel={stepsProps?.nextButtonLabel}
          stepTitle={stepsProps?.stepTitle}
          className={stepsProps?.className}
          description={stepsProps?.description}
          listContent={stepsProps?.listContent}
          image={stepsProps?.image || ''}
          imageAlt={stepsProps?.imageAlt}
          cancelButtonLabel={stepsProps?.cancelButtonLabel} />
      </ModalBody>
    </Modal>
  )
}

export default Onboarding
