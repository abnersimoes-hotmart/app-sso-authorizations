import React, { useMemo } from 'react'

import { Form } from 'components/basic'
import { useTranslation } from 'react-i18next'

import { ILanguage } from 'ducks/filters/filtesrInterfaces'

interface IPropTypes {
  handleSelectedLanguage: (language: string) => void,
  selectedLanguage: string,
  languages: Array<ILanguage>
}

interface IRadioInfo {
  id: string,
  label: string,
  isChecked: boolean
}

const LanguageMobile = ({ handleSelectedLanguage, languages, selectedLanguage }: IPropTypes) => {
  const { t } = useTranslation()

  const languagesList = useMemo(() => {
    const list: Array<IRadioInfo> = languages.map(language => {
      return (
        {
          id: language.id,
          label: t(`language.${language.id}`),
          isChecked: selectedLanguage === language.id
        }
      )
    })

    return list
  }, [languages, selectedLanguage, t])

  return (
    <Form.RadioGroup
      radios={languagesList}
      group="language"
      onChangeHandler={handleSelectedLanguage} />
  )
}

export default LanguageMobile
