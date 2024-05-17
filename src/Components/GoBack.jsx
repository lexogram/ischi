/**
 * src/Pages/Event/Room/GoBack.jsx
 */


import React from 'react'
import { useTranslation } from 'react-i18next';
import exit from '../Assets/exit.png'


export const GoBack = ({ action, image, alt, className }) => {
  const { t } = useTranslation()

  className = `go-back ${className || ""}`
  alt = t(alt || "exit")

  return (
    <button
      className={className}
      onClick={action}
    >
      <img
        src={image || exit}
        alt={alt}
        title={alt}/>
    </button>
  )
}