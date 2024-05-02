/**
 * src/Pages/Create/Creator/Panels/Dialog/File.jsx
 */


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
import { CreatorContext } from '../../../../../Contexts'
import { OpenPack } from './OpenPack';


export const File = () => {
  const { t } = useTranslation()
  const { packs, openPack } = useContext(CreatorContext)
  // { name:  <undefined | username>,
  //   owner: <undefined | username | organization >,
  //   type: <undefined | "user" | "organization" >,
  //   packs: [ {<as sampler>}, ... ], // may be empty
  //   samplers: [
  //     { name: "Sampler",
  //       folder: "sample",
  //       thumbnail: "thumbnail.webp",
  //       count: 31,
  //       owner_type: "Sampler"
  //     }
  //   ]
  // }

  const ownedPacks = packs.name
    ? <OpenPack
        {...packs}
        source="packs"
        openPack={openPack}
      />
    : <div>
        <p>
          <Trans
            i18nKey="must-sign-in"
            defaults="Please <link>log in</link> first"
            components={{
              "link": <Link
                to="/connection"
                className="primary button"
                draggable="false"
              />
            }}
          />
        </p>
      </div>


  return (
    <div className="file">
      <h1>{t("file-title")}</h1>

      <button>{t("new-file")}</button>
      {ownedPacks}
      <OpenPack
        {...packs}
        source="sampler"
        openPack={openPack}
      />
    </div>

  )
}