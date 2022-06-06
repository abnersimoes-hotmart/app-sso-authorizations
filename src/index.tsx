/* global ACCESS_TOKEN */
import React from 'react'
import ReactDOM from 'react-dom'
import 'assets/font-icons'
import i18n, { i18nInit } from 'config/i18n'
import { saveOnStorage } from 'utils/storage'
import startCas from './auth-cas'
import Root from './startup/Root'
import ssoApi from './api/sso'
import { setHeaderToken } from './api'

const defaultLanguage = 'pt_BR'

const token = process.env.NODE_ENV === 'development' ? ACCESS_TOKEN : ''

const setLanguage = async language => {
  await i18nInit(language)
  i18n.changeLanguage(language)
}

const setToken = token => {
  if (token) {
    setHeaderToken(ssoApi, `Bearer ${token}`)
    saveOnStorage('token', token)
  }
}

const creatingShadowDom = rootElement => {
  if (rootElement) {
    !rootElement.shadowRoot && rootElement.attachShadow({ mode: 'open' })
    rootElement.classList.add('my-shadow-root', '_d-none')
  }
}

const showRootElement = rootElement => {
  if (rootElement) {
    rootElement.classList.remove('_d-none')
  }
}

const renderCallBack = async rootElement => {
  showRootElement(rootElement)
}

const render = async (rootElement, { user, baseUrl = '/' }) => {
  // eslint-disable-next-line
  __webpack_public_path__ = baseUrl

  const { token, language = defaultLanguage } = user

  setLanguage(language.replace('-', '_'))
  setToken(token)
  creatingShadowDom(rootElement)

  const shadowRoot = rootElement && rootElement.shadowRoot

  ReactDOM.render(<Root user={user} />, shadowRoot, () => renderCallBack(rootElement))
}

const start = (): Promise<string> => {
  if (process.env.IS_CAS === 'true') {
    return new Promise((resolve, reject) => {
      startCas()
        .then((user: any) => {
          return resolve(user.id_token)
        })
        .catch(error => {
          reject(error)
        })
    })
  } else {
    return Promise.resolve(token)
  }
}

if (process.env.NODE_ENV === 'development') {
  const params = {
    user: {
      token,
      profile: {
        name: 'Usuário Lindinho',
        locale: 'PT_BR',
        id: 12744211,
        ucode: 'c9c9c3db-d3b9-467e-9d41-2d59feb1fa1f'
      }
    }
  }

  start()
    .then(result => {
      params.user.token = result
      render(document.getElementById('root'), params)
    })
    .catch(error => {
      throw error
    })
}

export default render
