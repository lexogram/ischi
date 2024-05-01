/**
 * src/Pages/Create/Creator/TitleBar.jsx
 */


import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CreatorContext } from '../../../../Contexts'

import { Title } from './Title'
import { Tab } from './Tab'
import image from '../../../../Assets/image.png'
import card from '../../../../Assets/card.png'


export const Header = () => {
  const { t } = useTranslation()
  const { columns } = useContext(CreatorContext)


  return (
    <div className="header">
      <Title />
      <div className="buttons">
        {!columns && <Tab
          role="gallery"
          content={<img src={image} alt="image" />}
          title={t("gallery")}
        />}
        {!columns && <Tab
          role="cards"
          content={<img src={card} alt="card" />}
          title={t("cards")}
        />}
        <Tab
          role="help"
          content={<span>?</span>}
          title={t("help")}
        />
      </div>
    </div>
  )
}