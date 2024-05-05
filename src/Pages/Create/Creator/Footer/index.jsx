/**
 * src/Pages/Create/Creator/Footer/index.jsx
 */


import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { CreatorContext } from '../../../../Contexts'
import { UserContext } from '../../../../Contexts'
import { Button } from './Button'


export const Footer = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const {
    activeTab,
    setActiveTab,
    setDialog
  } = useContext(CreatorContext)
  const { user } = useContext(UserContext)


  const showFile = () => {
    if (activeTab === "help") {
      setActiveTab("gallery")
    }

    setDialog("file")
  }


  const selectImages = () => {
    setActiveTab("gallery")
    setDialog("images")
  }


  const goToLogin = () => {
    navigate('/connection')
  }


  const save = () => {
    setDialog("save")
  }


  const print = () => {
    navigate('/print')
  }


  const showSettings = () => {
    setActiveTab("cards")
    setDialog("layout")
  }


  return (
    <div className="footer">
      <div>
      <Button
          text={t("choose-file")}
          role="file"
          action={showFile}
        />
        <Button
          text={t("choose-images")}
          role="images"
          action={selectImages}
        />
      </div>
      <div>
        { user
        ? <Button
            text={t("choose-save")}
            action={save}
          />
        : <Button
            className="primary"
            text={t("choose-sign-in")}
            action={goToLogin}
          />
        }
        <Button
          text={t("choose-print")}
          action={print}
        />
      </div>
      <div>
        <Button
          text={t("choose-layout")}
          role="layout"
          action={showSettings}
        />
      </div>
    </div>
  )
}