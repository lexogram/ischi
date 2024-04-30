/**
 * src/Pages/Create/Creator/Panels/Dialog/Settings.jsx
 */


import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { Toggle } from './Toggle'
import { CreatorContext } from '../../../../../Contexts'


export const Layout = () => {
  const { t } = useTranslation()

  const {
    customLayout,
    setCustomLayout,
    turnConstraint,
    setTurnConstraint,
    turnOut,
    setTurnOut,
    defaultCrop,
    setDefaultCrop
  } = useContext(CreatorContext)

  
  const turnOutClass = turnConstraint ? "" : "disabled"
  

  return (
    <div className="settings">
      <h1>{t("layout-title")}</h1>
      <Toggle
        prop="custom"
        title={t("layout-is")}
        offText={t("identical")}
        onText={t("different")}
        checked={customLayout}
        action={setCustomLayout}
      />
      <Toggle
        prop="rotation"
        title={t("rotation-is")}
        offText={t("free")}
        onText={t("fixed")}
        checked={turnConstraint}
        action={setTurnConstraint}
      />
      <Toggle
        className={turnOutClass}
        prop="direction"
        title={t("fixed-as")}
        offText={t("upright")}
        onText={t("outward")}
        checked={turnOut}
        action={setTurnOut}
      />
      <Toggle
        prop="crop"
        title={t("crop-by-default")}
        offText={t("no")}
        onText={t("yes")}
        checked={defaultCrop}
        action={setDefaultCrop}
      />
    </div>
  )
}