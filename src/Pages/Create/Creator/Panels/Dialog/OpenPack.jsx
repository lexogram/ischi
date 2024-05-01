/**
 * src/Pages/Create/Creator/Panels/Dialog/OpenPack.jsx
 */


import React from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { ISCHI } from '../../../../../Constants';


export const OpenPack = ({
  name,     // <username>, // used only by CreatorContext
  owner,    // <undefined | username | organization >,
  type,     // <"user" | "organization" >,
  packs,    // [ {<as sampler>}, ... ], // may be empty
  samplers, // [
            //   { name: "Sampler",
            //     folder: "sample",
            //     thumbnail: "thumbnail.webp",
            //     count: 31,
            //     owner_type: "Sampler"
            //   }
            // ]
  source    // < "packs" | "sampler" >
}) => {
  
  const { t } = useTranslation()


  const open = pack => {
    console.log("Open pack:", pack);
    
  }

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
    return (
      <li
        key={pack.name}
        className="button"
        onClick={() => open(pack)}
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