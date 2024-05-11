/**
 * src/Pages/Event/Welcome/ChooseLanguage.jsx
 */


import React from 'react'
import { useTranslation } from 'react-i18next';
import { Languages } from '../../../Components/Languages';


export const ChooseLanguage = () => {
  const { t } = useTranslation()

  return (
    <div className="languages">
      <h3>{t("event.choose-language")}</h3>
      <Languages />
    </div>
  )
}