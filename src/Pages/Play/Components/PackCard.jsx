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
  select, // function if isHost, or undefined
  delay: defaultDelay
}) => {
  let { name, total, folder, thumbnail } = pack
  const [ delay, setDelay ] = useState(defaultDelay)

  thumbnail = `${url}${folder}/images/${thumbnail}`

  const selectPack = () => {
    select(pack, delay)
  }

  return (
    <li
      className="pack button"
    >
     <img src={thumbnail} alt={name} />
      <div className="description">
        <h1>{name}</h1>
        <div className="count">
          <p>Total images: {total}</p>
          <Star
            votes={votes || ""}
            isUsersChoice={isUsersChoice}
            canVote={canVote}
            action={canVote ? vote : () => {}}
          />
        </div>
        { select && <>
            <div className="owner">
              <DelaySlider
                delay={delay}
                setDelay={setDelay}
              />
              <button
                onClick={selectPack}
              >
                Select
              </button>
            </div>
          </>
        }
      </div>
    </li>
  )
}