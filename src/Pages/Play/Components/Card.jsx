/**
 * src/Components/Card.jsx
 */


import React, { useContext } from 'react'
import { GameContext } from '../../../Contexts'
import { Picture } from './Picture'


export const Card = ({ index, top, d, x, y, match }) => {
  const { BASE_URL, gameData } = useContext(GameContext)
  const {
    root,
    cardData,
    imageSources,
    layouts,
    turnConstraint,
    useSunburst,
    cropByDefault,
    customLayout
  } = gameData


  const style = {
    position: "absolute",
    width: d,
    height: d
  }

  if (top) {
    style.right = x + "px"
    style.bottom = y + "px"
  } else {
    style.left = x + "px"
    style.top = y + "px"
  }

  const {
    images,
    layoutName,
    cardScale
  } = cardData[index]

  const imageURLs = images.map( imageData => (
    imageSources[imageData.imageIndex].source
  ))
  const layout = customLayout
    ? layouts[layoutName]
    : layouts[Object.keys(layouts)[0]]


  const pictures = imageURLs.map(( href, index ) => {
    const position = layout[index]
    const { cx, cy, r } = position
    const imageData = images[index]
    let {
      specificScale,
      rotation,
      offsetX,
      offsetY,
      crop,
      useFileName
    } = imageData

    if (crop === 0) {
      crop = cropByDefault
    }
    if (turnConstraint) {
      if (useSunburst) {
        rotation = getSunburstAngle(position, imageData)
      } else {
        rotation = 0
      }
    }
    const placement = {
      cx: cx + offsetX + 50,
      cy: cy + offsetY + 50,
      r:  r * specificScale,
      crop,
      rotation
    }

    return (
      <Picture
        key={href}
        match={href === match}
        path={`${BASE_URL}ischi/${root}`}
        index={index}
        useFileName={useFileName}
        href={href}
        {...placement}
      />
    )
  })

  return (
    <svg
      key={"card_"+index}
      viewBox="0 0 100 100"
      style={style}
    >
      <circle
        cx="50"
        cy="50"
        r="50"
        fill="#fff"
      />
      {pictures}
    </svg>
  )
}



const getSunburstAngle = ({ cx, cy }, { offsetX, offsetY }) => {
  const x = cx + offsetX
  const y = cy + offsetY

  let angle = x || y
    ? (Math.atan(y / x) / Math.PI * 180) - 90
    : 0

  // Tweak for images on the left
  if (x < 0) {
    angle += 180
  }

  return angle
}