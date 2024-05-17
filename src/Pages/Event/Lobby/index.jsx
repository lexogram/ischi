/**
 * src/Pages/Event/Lobby/index.jsx
 */



import React, { useContext } from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { EventContext } from '../../../Contexts';
import { ISCHI } from '../../../Constants';
import { GoBack } from '../../../Components/GoBack';
import { Start } from './Start';

import leave from '../../../Assets/leave.png'


const TITLE = "ищи"


export const Lobby = () => {
  const {
    packs,
    logOut
  } = useContext(EventContext)
  
  const { t } = useTranslation()

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
        <Start folder={pack.folder}/>
      </li>
    )
  })

  if (!packList.length) {
    packList.push(<li key="none">{t("pack.none")}</li>)
  }


  return (
    <div className="lobby">
      <h1 className='title'>{TITLE}</h1>
      <ul>{packList}</ul>
      <GoBack
        image={leave}
        action={logOut}
        alt="re-enter"
      />
    </div>
  )
}