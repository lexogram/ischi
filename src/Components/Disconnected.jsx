/**
 * src/Pages/Disconnected.jsx
 */


import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import disconnected from '../Assets/disconnected.svg'


const DELAY = 1000


export const Disconnected = () => {
  const { t } = useTranslation()
  const [ showButton, setShowButton ] = useState(false)
  

  useEffect(() => {
    setTimeout(
      () => setShowButton(true),
      DELAY
    )
  }, [])


  const reloadPage = () => {
    location.reload()
  }


  const className = showButton ? "primary" : "hidden"


  return (
    <div id="disconnected">
      <img src={disconnected} />
      <button
        onClick={reloadPage}
        className={className}
      >
        {t("try-again")}
      </button>
    </div>
  )
}