/**
 * src/Pages/Create/Creator/Panels/Dialog/File.jsx
 */


import React, { useContext } from 'react'
// import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
import { UserContext } from '../../../../../Contexts'


export const File = () => {
  const { user } = useContext(UserContext)
  const { t } = useTranslation()


  const open = user
    ? <div>Open Saved File</div>
    : <div>
        <p>
          <Trans
            i18nKey="must-sign-in"
            defaults="Please <link>log in</link> first"
            components={{
              "link": <a
                href="/connection-out"
                className="primary button"
                draggable="false"
              />
            }}
          />
        </p>
      </div>


  return (
    <div className="file">
      <h1>File</h1>

      <button>{t("new-file")}</button>
      <div className="open">{open}</div>
      <button>{t("open-sampler")}</button>
    </div>

  )
}