/**
 * src/Pages/Create/Panels/Dialog/OpenPack.jsx
 */


import React from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { ISCHI } from '../../../../Constants';


export const OpenPack = ({
  name,      // <username>, // used only by CreatorContext
  owner,     // <undefined | username | organization >,
  type,      // <"user" | "organization" >,
  packs,     // [ {<as sampler>}, ... ], // may be empty
  samplers,  // [
             //   { name: <string>,
             //     folder: </owner_id/folder>,
             //     thumbnail: "thumbnail.webp",
             //     count: <integer>,
             //     owner_type: "Sampler"
             //   }
             // ]
  source,    // <"packs" | "sampler">
  openPack,  // <function>
  packFolder // <folder of current pack>
}) => {  
  
  const { t } = useTranslation()

  let title
  if (source === "sampler") {
    packs = samplers
    title = t("pack.sampler")
  } else {
    title = <Trans
      i18nKey={`pack.for.${type}`}
      values={{ owner }}
      defaults="Packs created for {{owner}}"
    />
  }

  const packList = packs.map( pack => {
    const { name, folder, thumbnail, count } = pack
    const src = `${ISCHI}/${folder}/${thumbnail}`
    const className = pack.folder === packFolder
      ? "button pressed"
      : "button"
    return (
      <li
        key={pack.name}
        className={className}
        onClick={() => openPack(pack)}
      >
        <img src={src} alt="name" title="name" />
        <div>
          <h3>{name}</h3>
          <span>
            <Trans
              i18nKey="pack.count"
              values={{ count }}
              defaults=" ({{count}} cards)"
            />
          </span>
        </div>
      </li>
    )
  })

  if (!packList.length) {
    packList.push(<li key="none">{t("pack.none")}</li>)
  }

  return (
    <>
      <h3>{title}</h3>
      <ul>{packList}</ul>
    </>
  )
}