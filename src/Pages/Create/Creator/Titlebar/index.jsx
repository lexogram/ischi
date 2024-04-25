/**
 * src/Pages/Create/Creator/TitleBar.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../Contexts'

import { Button } from '../Button'
import { Title } from './Title'
import image from '../../../../Assets/image.png'
import card from '../../../../Assets/card.png'


export const TitleBar = (props) => {
  const { columns } = useContext(LayoutContext)


  return (
    <div id="titlebar">
      <Title />
      <div className="buttons">
        {!columns && <Button
          role="gallery"
          content={<img src={image} alt="image" />}
        />}
         {!columns && <Button
          role="cards"
          content={<img src={card} alt="card" />}
        />}
        <Button
          role="help"
          content={<span>?</span>}
        />
      </div>
    </div>
  )
}