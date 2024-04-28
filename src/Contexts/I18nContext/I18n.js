/**
 * src/contexts/i18n.js
 */


import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'

const options = {
  debug: false,
  fallbackLng: ["en"],
  interpolation: {
    escapeValue: false
  },
  backend: {
    loadPath: `ischi/locales/{{lng}}/{{ns}}.json`
  }
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init(options)
  

export default i18n