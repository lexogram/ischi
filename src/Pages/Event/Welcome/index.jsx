/**
 * src/Pages/Event/Welcome.jsx
 */


import React, { useContext } from 'react'
import { EventContext } from '../../../Contexts';
import { Trans, useTranslation } from 'react-i18next';
import { ChooseLanguage } from './ChooseLanguage'
import { Register } from './Register';


export const Welcome = () => {
  const { organization, player } = useContext(EventContext)
  // TODO: use name instead of event in h1 element

  const { t } = useTranslation()
  const event = t("event.name")

  return (
    <div className="welcome">
      <h1><Trans
        i18nKey="event.welcome"
        values={{ event }}
        defaults="Welcome to {{event}}"
      /></h1>
      <ChooseLanguage />
      <Register />
    </div>
    
  )
}