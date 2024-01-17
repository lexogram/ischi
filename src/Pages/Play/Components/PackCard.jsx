/**
 * src/Components/PackCard.jsx
 */


import React, { useState } from 'react'
import { Star } from './Star'
import { DelaySlider } from '../Components/DelaySlider'



export const PackCard = ({
  url,
  pack,
  votes,
  isUsersChoice,
  canVote,
  vote,
  select, // function if isOwner, or undefined
  delay: defaultDelay
}) => {
  const { name, count, thumbnail } = pack
  const [ delay, setDelay ] = useState(defaultDelay)

  const selectPack = () => {
    select(pack.name, delay)
  }

  return (
    <li
      className="pack"
    >
      <h1>{name}</h1>
      <p>Total images: {count}</p>
      <img src={url + thumbnail} alt={name} />
      <Star
        votes={votes || ""}
        isUsersChoice={isUsersChoice}
        canVote={canVote}
        action={canVote ? vote : () => {}}
      />
      { select && <>
          <DelaySlider
            delay={delay}
            setDelay={setDelay}
          />
          <button
            onClick={selectPack}
          >
            Select
          </button>
        </>
      }
    </li>
  )
}