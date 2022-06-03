import React from 'react'
import { useTranslation } from 'react-i18next'

import formatUserLocale from 'utils/userLocaleFormat'
import { useVulcanoContext } from 'src/VulcanoContext'
import { Accordion, Icon, Sidebar } from 'components/basic'

import { helpFAQList } from './helpFAQList'

import { sendInteractionEvent } from 'utils/gaEvent'

import './style.scss'

interface IPropTypes {
  isOpen?: boolean,
  onClose: () => void
}


const HelpFAQ = ({ isOpen, onClose }: IPropTypes) => {
  const { t } = useTranslation()

  const { user } = useVulcanoContext()

  const faqList = helpFAQList(formatUserLocale(user.profile.locale))

  const handlerOpenCollapse = title => {
    sendInteractionEvent({
      eventAction: 'Click:FAQ:Question',
      eventLabel: t(title)
    })
  }

  return (
    <Sidebar className="help-faq" isOpen={isOpen} onClose={onClose}>
      <Sidebar.Header className="help-faq__title bg-gray-100">
        <h1 className="_text-6 _text-gray-500 _mb-0 _d-flex _justify-content-between _align-items-center">
          <Icon
            type="regular"
            fontSize={4}
            iconName="question-circle"
            className="_mr-2"
          />
          <strong>{t('general.learn_more')}</strong>
        </h1>
      </Sidebar.Header>
      <Sidebar.Body className="help-faq__content _px-4 _py-3">
        <h2 className="_text-4 _text-blue _text-capitalize _font-weight-bold">{t('help.title')}</h2>
        {faqList.map(item => (
          <Accordion
            key={item.id}
            title={item.title}
            className="_mb-2"
            onOpen={() => handlerOpenCollapse(item.title)}
          >
            {item.content}
          </Accordion>
        ))}
      </Sidebar.Body>
    </Sidebar>
  )
}

export default HelpFAQ
