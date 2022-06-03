import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import 'config/requestRegister'
import 'assets/font-icons'

import i18n, { i18nInit } from 'src/config/i18n'
import { initRequestConfiguration } from 'utils/request'
import { saveOnStorage } from 'utils/storage'

import Main from './startup/App'

function normalizeInitials(initials) {
  const [part1, part2] = initials.split('-')

  if (part2) {
    return `${part1.toLowerCase()}_${part2.toUpperCase()}`
  }

  return part1.toLowerCase()
}

export async function waitingLang(userLanguage) {
  const lng = userLanguage || 'en'
  const resource = await import(`src/language/${normalizeInitials(lng)}.json`)

  return resource
}

const setToken = token => {
  if (token) {
    saveOnStorage('token', token)
  }
}

const vulcanoBaseName = window.location.pathname.match(/(.*accounts\/settings)/g)

const App = ({ user }: any) => {
  const { token, language = 'en' } = user

  useEffect(() => {
    setToken(token)
    initRequestConfiguration(token)

    const init = async language => {
      await i18nInit(language)
      i18n.changeLanguage(language)
    }

    init(language)
  }, [language, token])

  return (
    <BrowserRouter basename={vulcanoBaseName ? vulcanoBaseName[0] : ''}>
      <Main user={user} />
    </BrowserRouter>
  )
}

export default App
