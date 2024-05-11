/**
 * src/components/ButtonOrBusy.jsx
 */


import React from 'react'
import { useTranslation } from 'react-i18next';

export const ButtonOrBusy = ({ action, disabled, message }) => {
  const { t } = useTranslation()

  const buttonOrBusy = (message) 
    ? <p>{message}</p>
    : <button
        disabled={disabled}
        onClick={action}
      >
    {t("event.register")}
  </button>

  return (
    <div className="busy-button">
      {buttonOrBusy}
    </div>
  )
}