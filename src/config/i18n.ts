import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const formatLanguage = (language: string) => language.slice(0, 2).toLowerCase() + language.slice(2)

export const i18nInit = async (language: string): Promise<any> => {
  const languageFileName = language.includes('-') ? language.replace('-', '_') : formatLanguage(language)

  const resources = {
    [language]: {
      translation: await import(`src/language/${languageFileName}.json`)
    }
  }

  return i18n.use(initReactI18next).init({
    resources,
    lng: language,
    load: 'currentOnly',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
}

export default i18n
