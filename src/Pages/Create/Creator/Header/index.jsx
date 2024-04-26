/**
 * src/Pages/Create/Creator/TitleBar.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../Contexts'

import { Title } from './Title'
import { Tab } from './Tab'
import image from '../../../../Assets/image.png'
import card from '../../../../Assets/card.png'


export const Header = (props) => {
  const { columns } = useContext(LayoutContext)


  return (
    <div id="titlebar">
      <Title />
      <div className="buttons">
        {!columns && <Tab
          role="gallery"
          content={<img src={image} alt="image" />}
        />}
         {!columns && <Tab
          role="cards"
          content={<img src={card} alt="card" />}
        />}
        <Tab
          role="help"
          content={<span>?</span>}
        />
      </div>
    </div>
  )
}