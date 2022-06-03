import React, { ReactNode, useRef, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import './style.scss'

interface IPropTypes {
  title: string
  children: ReactNode
  className?: string
  onOpen?: () => void
  onClose?: () => void
}

const Accordion = ({ title, children, className, onClose, onOpen }: IPropTypes) => {
  const { t } = useTranslation()

  const accordionRef = useRef<any>(null)

  useEffect(() => {
    const { current } = accordionRef

    current.addEventListener('open', onOpen)
    current.addEventListener('close', onClose)

    return () => {
      current.removeEventListener('open', onOpen)
      current.removeEventListener('close', onClose)
    }
  }, [onOpen, onClose])

  return (
    <div className={`accordion-collapse ${className}`}>
      <hot-collapse ref={accordionRef}>
        {t(title)}
        <div slot="collapsed" className="accordion-collapse--overflow _rounded-bottom _p-3">
          {children}
        </div>
      </hot-collapse>
    </div>
  )
}

export default Accordion
