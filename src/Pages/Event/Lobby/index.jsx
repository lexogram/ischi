/**
 * src/Pages/Event/index.jsx
 */



import React, { useContext } from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { EventContext } from '../../../Contexts';
import { ISCHI } from '../../../Constants';
import { LogOut } from './LogOut';
import { Start } from './Start';


export const Lobby = () => {
  const {
    emoji,
    packs,     // [ {<as sampler>}, ... ], // may be empty
    openPack,  // <function>
    packFolder // <folder of current pack>
  } = useContext(EventContext)
  
  const { t } = useTranslation()

  // let title
  // if (source === "sampler") {
  //   packs = samplers
  //   title = t("pack.sampler")
  // } else {
  //   title = <Trans
  //     i18nKey={`pack.for.${type}`}
  //     values={{ owner }}
  //     defaults="Packs created for {{owner}}"
  //   />
  // }

  const packList = packs.map( pack => {
    const { name, folder, thumbnail, total } = pack

    let src
    if (thumbnail?.source) {
      src = thumbnail.source
    } else if (folder) {
      src = `${ISCHI}/${folder}/images/${thumbnail}`
    }

    return (
      <li
        key={pack.name}
        onClick={() => openPack(pack)}
      >
        <img src={src} alt={name} title={name} />
        <div className="description">
          <h3>{name}</h3>
          <span>
            <Trans
              i18nKey="pack.total"
              values={{ total }}
              defaults=" ({{total}} cards)"
            />
          </span>
        </div>
        <Start emoji={emoji}/>
      </li>
    )
  })

  if (!packList.length) {
    packList.push(<li key="none">{t("pack.none")}</li>)
  }

  return (
    <div className="lobby">
      {/* <h3>{title}</h3> */}
      <ul>{packList}</ul>
      <LogOut />
    </div>
  )
}