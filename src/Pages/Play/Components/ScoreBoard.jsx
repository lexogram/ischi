/**
 * src/Components/ScoreBoard.jsx
 */


import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

import { WSContext } from '../../../Contexts'
import { GameContext } from '../../../Contexts'
import { EventContext } from '../../../Contexts'

const EMOJI_REGEX = /(.*)_(.*)/

export const ScoreBoard = ({ gameOver }) => {
  const navigate = useNavigate()
  const { room_host } = useParams()

  const { t } = useTranslation()

  const { members } = useContext(WSContext)
  const { score, setGameData } = useContext(GameContext)
  // score { <user_id>: <integer> }
  // members { <user_id>: <string name> }
  // names may not be unique but user_ids will be. names may start
  // with an emoji which is (probably) unique
  const { setStartTime, setRoom } = useContext(EventContext)

  console.log("score:", score);
  console.log("members:", members);


  const returnToLobby = () => {
    // setGameData()
    setStartTime(0)
    setRoom()

    if (room_host) {
      let eventURL = location.hash.replace(room_host, "")
      eventURL = eventURL.replace(/^#/, "")
      navigate(eventURL)
    }
  }


  const memberMap = (() => {
    if (gameOver ) {
      // Use the full names
      return members
    }
    
    // The game is in progress. Just use initials
    const memberEntries = Object.entries(members)
    return memberEntries.reduce(
      ( map, [id, name] ) => {
        if (name.charCodeAt(0) > 9900) {
          // The name starts with an emoji. The whole name is
          // guaranteed to be unique, but the emojis may not be.
          const match = EMOJI_REGEX.exec(name)
          if (match) {
            // Just use the emoji
            const [ , emoji ] = match // ignore real name 
            map[id] = emoji

          } else {
            // No _ was found. Use the first character as is.
            map[id] = name[0]
          }

        } else {
          // The initial is just an ordinary letter. Use it as is.
          map[id] = name[0]
        }

        return map
      },
      {} // accumulator seed
    )
  })()



  const byScore = (a, b) => {
    if (a[1] === b[1]) {
      return a[0] > b[0]
    }

    return b[1] - a[1]
  }



  let scoreboard = Object.entries(score)
  scoreboard.sort(byScore)


  scoreboard = scoreboard.map(([ user_id, score ]) => {
    const name = memberMap[user_id]

    return (
      <li
        key={user_id}
      >
        <span className="name">{name}</span>
        <span className="score">{score}</span>
      </li>
    )
  })


  return (
    <div className={gameOver && "final-score" || "score"}>
      {gameOver && <h1>Score</h1>}
      <ul>
        {scoreboard}
      </ul>
      
      {gameOver && <button
        onClick={returnToLobby}
      >
        {t("event.play-again")}
      </button>}
    </div>
  )
}