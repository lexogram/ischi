/**
 * Card.jsx
 */

import React, { useContext } from 'react'
import { CreatorContext } from '../../../../../Contexts'
import { Picture } from "./Picture"



export const Card = ({ card, cardIndex, dimensions, isPreview }) => {
  const {
    total, // required for crop-circle-XXX defId
    images, // [ ..., { source, selfScale }, ...]
    layouts, // { <layoutName>: [ {...card position...}, ...]}
    getURL,
    customLayout,
    cropByDefault,
    turnConstraint,
    useSunburst,
    getSunburstAngle,
    tweakIndices
} = useContext(CreatorContext)
  const { cx: cardX, cy: cardY, r: cardR } = dimensions
  const ratio = cardR / 50 // 1 for Creator | 9.8 for Preview

  const { images: cardImages, cardScale, layoutName } = card
  const layout = customLayout
    ? layouts[layoutName]
    : layouts[Object.keys(layouts)[0]]

  let tweakIndex
  const pictures = cardImages.map(( imageData, slotIndex ) => {
    const { imageIndex, specificScale } = imageData
    const display = images[imageIndex]

    if (display) {
      // { source: <string | File object>, selfcale: <number> }
      const { source, selfScale, crop: imageCrop } = display

      // console.log("source:", source)
      // <string url>
      // OR
      // { name: "cobra.png",
      //   lastModified: 1702048092580,
      //   webkitRelativePath: "images/reptile/cobra.png",
      //   size: 33562,
      //   type: "image/png"
      // }
      const href = source // getURL(source)
      // console.log("href:", href);
      // blob:http://domain:port/r4nd0m-ha5h
      // <string url>

      const scale = selfScale * cardScale * specificScale

      const layoutData = layout[slotIndex]

      let { cx, cy, r } = layoutData
      cx *= ratio
      cx += cardX
      cy *= ratio
      cy += cardY
      r *= (ratio * scale)

      // console.log("layoutData", layoutData);
      // { "cx": 17.054, "cy": 34.442, "r": 11.566, fill: #080 }

      const rotation = (turnConstraint || !customLayout)
        ? useSunburst
          ? getSunburstAngle(layoutData, imageData)
          : 0
        : imageData.rotation

      const crop = imageCrop === 0
        ? cropByDefault
        : imageCrop

      // We need to use `total` here, because all SVGs might be in
      // the same scope
      const defId = `crop-circle-${cardIndex*total + imageIndex}`
      const indices = {
        cardIndex,
        slotIndex
      }

      if ( tweakIndices
        && tweakIndices.cardIndex === cardIndex
        && tweakIndices.slotIndex === slotIndex
        ) {
        tweakIndex = slotIndex
      }

      const pictureData = {
        ...imageData, // offsetX, offsetY, zIndex
        indices,
        href,
        cx,
        cy,
        r,
        rotation,   // overwrites ...imageData
        scale,
        crop,     // overwrites ...imageData
        defId,
        isPreview,
        tweaks: imageData,
        ratio
      }

      return (
        <Picture
          key={defId}
          {...pictureData}
        />
      )
    }
  })



  if (tweakIndex !== undefined) {
    pictures.push(pictures.splice(tweakIndex, 1)[0])
  }

  if (isPreview) {
    return (
      <>
        <circle
          cx={cardX}
          cy={cardY}
          r={cardR}
          fill="#fff"
        />
        {pictures}
      </>
    )
  }

  return (
    <svg
      key={"card_"+cardIndex}
      viewBox="0 0 100 100"
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