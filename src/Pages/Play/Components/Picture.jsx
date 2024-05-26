/**
 * src/Components/Picture.jsx
 */


import React, { useContext } from 'react'
import { GameContext } from '../../../Contexts'
import { getBestFit } from '../../Create/Panels/Cards/getFit'

const EMOJI_REGEX = /(.{1,2}_)(.*)/ // some emojis are double-byte


export const Picture = ({
  index,
  path,
  useFileName,
  href,
  cx,
  cy,
  r,
  crop,
  rotation,
  match
}) => {
  const {
    clickImage, // function
    lastClick,  // { cardIndex, href }
    foundBy     // user_name
  } = useContext(GameContext)

  const circle = { cx, cy, r }
  const origin = `${cx} ${cy}`

  const x = cx - r
  const y = cy - r
  const width = r * 2
  const square = { x, y, width, height: width }

  const defId = `card_${index}${href}`

  const cropPath = crop ? { clipPath: `url(#${defId})` } : {}
  const showStamp = match && foundBy
  const colour = "#0099" // <<< HARD-CODED >>>
  const found = lastClick.cardIndex === -1

  const imageClicked = lastClick.href === href
                  && ( lastClick.cardIndex === index
                    || found
                     )
  const className = imageClicked && !crop
    ? "shadow"
    : ""
  const style = found
    ? { pointerEvents: "none", cursor: "default" }
    : { cursor: "pointer" }


  const clickPicture = () => {
    clickImage( index, href )
  }


  const emojiFreeFoundBy = (() => {
    const match = EMOJI_REGEX.exec(foundBy)
    if (match) {
      return match[2]
    }
    return foundBy
  })()


  const content = (useFileName)
    ? getTextElement()
    : <image
        href={path + href}
        {...square}
        {...cropPath}
        transform={`rotate(${rotation})`}
        transform-origin={origin}
        className={className}
      />


  function getTextElement() {
    const name = href.replace(/\.\w+$/, "")
    const { x, y, size } = getBestFit(name, width)

    return (
        <text
          x={square.x + x}
          y={square.y + y}
          fontSize={size}
          fill="#000"
          transform={`rotate(${rotation})`}
          transform-origin={origin}
        >
          {name}
        </text>
    )
  }


  return (
    <g
      style={style}
      onClick={clickPicture}
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
      {crop && imageClicked && <circle
        {...circle}
        fill="#0000"
        stroke={colour}
        strokeWidth="1"
      />}
      { showStamp && <g>
          <text
            x={cx}
            y={cy}
            fill={colour}
            stroke="#fff"
            strokeWidth="0.1"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={r / 2.5}
            fontWeight="bold"
            transform={`rotate(${rotation})`}
            transform-origin={origin}
          >
            {emojiFreeFoundBy}
          </text>
          <circle
            {...circle}
            fill="#0000"
            stroke={colour}
            strokeWidth="1"
          />
        </g>
      }
    </g>
  )
}