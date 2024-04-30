/**
 * src/contexts/I18nContext.jsx
 *
 * Preloads images for supported languages
 * Manages i18n and change of language
 *
 * - `languages` is a map of ISO 639 language codes, giving the
 *   native name for each language and a representative flag:
 *
 *   {
 *     "en": {
 *       "name": "English",
 *       "flag": "/flags/en-GB.png"
 *     },
 *     "fr": {
 *       "name": "Français",
 *       "flag": "/flags/fr-FR.png"
 *     },
 *     "kk": {
 *       "name": "Қазақ",
 *       "flag": "/flags/kk.png"
 *     },
 *     "ru": {
 *       "name": "Русский",
 *       "flag": "/flags/ru.png"
 *     }
 *   }
 *
 *   It is used by src/components/Languages.jsx to display a
 *   language chooser
 *
 * - `language` is the ISO 639 code for the current language.
 *    It is used by src/components/Languages.jsx to dim the
 *    flags of the other languages.
*/

import { createContext, useState, useEffect } from 'react'
import i18n from './I18n'

const URL = `/ischi/locales/languages.json`



export const I18nContext = createContext({})



export const I18nProvider = ({ children }) => {
  const [ languages, setLanguages ] = useState([])
  const [ language, setLanguage ] = useState(
    "ru" // navigator.language
  )


  const changeLanguage = language => {
    i18n.changeLanguage(language)
    setLanguage(language)
  }


  useEffect(() => {
    const callback = (error, languages) => {
      if (error) {
        return setLanguages(error)
      }

      setLanguages(languages)

      let lang = language

      if (!languages[lang]) {
        // language may be "co-DE". Try "co"
        lang = language.replace(/-.+/, "")
      }

      if (languages[lang]) {
        changeLanguage(lang)

      } else {
        // "co" wasn't found either. Use default.
        changeLanguage(Object.keys(languages)[0])
      }
    }
    fetchLanguages(callback)
  }, [])


  return (
    <I18nContext.Provider
      value = {{
        languages,
        language,
        changeLanguage
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}


function fetchLanguages(callback) {
  fetch(URL)
  .then(response => response.json())
  .then(json => callback(null, json))
  .catch(callback)
}