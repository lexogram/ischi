/**
 * src/Pages/Create/Panels/Dialog/Settings.jsx
 */


import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { Toggle } from './Toggle'
import { CreatorContext } from '../../../../Contexts'


export const Layout = () => {
  const { t } = useTranslation()

  const {
    customLayout,
    setCustomLayout,
    turnConstraint,
    setTurnConstraint,
    useSunburst,
    setUseSunburst,
    cropByDefault,
    setCropByDefault,
    useFileNames,
    setUseFileNames,
    alwaysUseFileNames,
    setAlwaysUseFileNames
  } = useContext(CreatorContext)



  const turnConstraintClass = customLayout
    ? ""
    : "disabled"
  const useSunburstClass = turnConstraint && customLayout
    ? ""
    : "disabled"
  const alwaysUseFileNamesClass = useFileNames
    ? ""
    : "disabled"



    // console.log("useFileNames:", useFileNames);
    // console.log("alwaysUseFileNamesClass:", alwaysUseFileNamesClass);



  return (
    <div className="settings">
      <h1>{t("layout-title")}</h1>
      <Toggle
        title={t("layout-is")}
        offText={t("identical")}
        onText={t("different")}
        checked={customLayout}
        action={setCustomLayout}
      />
      <Toggle
        className={turnConstraintClass}
        title={t("rotation-is")}
        offText={t("free")}
        onText={t("fixed")}
        checked={turnConstraint || !customLayout}
        action={setTurnConstraint}
      />
      <Toggle
        className={useSunburstClass}
        title={t("fixed-as")}
        offText={t("upright")}
        onText={t("outward")}
        checked={useSunburst}
        action={setUseSunburst}
      />
      <Toggle
        title={t("use-file-names")}
        offText={t("no")}
        onText={t("yes")}
        checked={useFileNames}
        action={setUseFileNames}
      />
      <Toggle
        className={alwaysUseFileNamesClass}
        offText={t("half-the-time")}
        onText={t("always")}
        checked={alwaysUseFileNames}
        action={setAlwaysUseFileNames}
      />
      <Toggle
        title={t("crop-by-default")}
        offText={t("no")}
        onText={t("yes")}
        checked={cropByDefault}
        action={setCropByDefault}
      />
    </div>
  )
}