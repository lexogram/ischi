/**
 * src/Routes/Event/Register.jsx
 */


import React from 'react'
import { useParams } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { QRCode } from '../../Components/QRCode';


export const Register = () => {
  const { t } = useTranslation()

  const { host, player } = useParams()
  const link = "https://lexogram.github.io/ischi/#/event/nevzorovyh"

  if (!host) {
    return <h1>{t("event.none")}</h1>
  }

  const event = host[0].toUpperCase() + host.slice(1)
  const subText = player
    ? <h3><Trans
      i18nKey="event.hello"
      values={{ player }}
      defaults="Hello {{player}}! It's too early to register"
    /></h3>
    : <h3>{t("event.start-date")}</h3>
  
  
  return (
    <div
      style={{ flexDirection: "column", textAlign: "center" }}
    >
      <QRCode link={link}/>
      <h1><Trans
        i18nKey="event.welcome"
        values={{ event }}
        defaults="Welcome to the {{event}} event"
        components={{ tag: <span /> }}
      /></h1>
      {subText}
    </div>
  )
}