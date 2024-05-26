/**
 * Picture.jsx
 */

import React, { useContext } from "react";
import { CreatorContext } from "../../../../Contexts";
import { Tweaker } from "./Tools/Tweaker";



export const Picture = ({
  cx,
  cy,
  r,
  defId,
  useFileName,
  href,
  name,
  tweaks,
  rotation,
  fill,
  offset=0,
  crop,
  isPreview,
  indices,
  ratio
}) => {
  const {
    showTweaker,
    tweakIndices
  } = useContext(CreatorContext)

  // Define dimensions of crop-circle
  cx += offset + (tweaks.offsetX * ratio)
  cy += offset + (tweaks.offsetY * ratio)

  const circle = { cx, cy, r }
  const origin = `${cx} ${cy}`

  // Define dimensions of square image
  const x = cx - r
  const y = cy - r
  const width = r * 2
  const square = { x, y, width, height: width }

  // Tweaker
  const toggleTweaker = ({ type }) => {
    const tweakIndices = (type === "mouseenter")
     ? indices
     : 0

    showTweaker(tweakIndices)
  }

  const displayTweaker = tweakIndices
    && tweakIndices.cardIndex === indices.cardIndex
    && tweakIndices.slotIndex === indices.slotIndex

  // Create a clipPath prop that can be ignored if unneeded
  const cropPath = crop ? { clipPath: `url(#${defId})` } : {}

  // SNEAKY: use className to pass indices to the Tweaker
  // component if a mouseDown on the Tweaker is released over
  // this Picture
  const { cardIndex, slotIndex} = indices
  const className = `picture card-${cardIndex} slot-${slotIndex}`

  const content = (useFileName)
    ? 
        <text
          {...square}
          fill="#000"
          transform={`rotate(${rotation})`}
          transform-origin={origin}
        >
          {name}
        </text>
    : <image
        href={href}
        {...square}
        {...cropPath}
        transform={`rotate(${rotation})`}
        transform-origin={origin}
      />

  return (
    <g
      className={className}
    >
      <defs>
        <clipPath
          id={defId}
        >
          <circle
            {...circle}
          />
        </clipPath>
      </defs>
      {content}
      { !isPreview &&
      <circle
        className="crop-circle"
        {...circle}
        fill={fill}
        onMouseEnter={toggleTweaker}
      />}
      { displayTweaker && <Tweaker
        {...circle}
        {...indices}
        {...tweaks}
        rotation={rotation}
        crop={crop}
        onMouseLeave={toggleTweaker}
      />}
    </g>
  )
}


// clip-path={`url(#${defId})`}