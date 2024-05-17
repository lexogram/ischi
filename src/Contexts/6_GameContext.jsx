/**
 * GameContext.jsx
 * description
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'

import { WSContext } from './2_WSContext'
import { GETPACKS, DELAY_ARRAY } from '../Constants'
const DEFAULT_DELAY = DELAY_ARRAY[2][0]



export const GameContext = createContext()



export const GameProvider = ({ children }) => {
  const {
    BASE_URL,    // for getting files from Express server
    sendMessage,
    addMessageListener,
    removeMessageListener,
    room
  } = useContext(WSContext)
  const [ packData, setPackData ] = useState([])
  const [ votes, setVotes ] = useState({})
  const [ usersVote, setUsersVote ] = useState("")
  const [ gameData, setGameData ] = useState()
  const [ lastClick, setLastClick ] = useState({})
  const [ score, setScore ] = useState({})
  const [ foundBy, setFoundBy ] = useState()
  const [ delay, setDelay ] = useState(DEFAULT_DELAY)
  const [ gameOver, setGameOver ] = useState(false)
  const [ gameEnded, setGameEnded ] = useState(false)
  const [ startTime, setStartTime ] = useState(0)
  


  // SELECTING A PACK // SELECTING A PACK // SELECTING A PACK //

  const fetchPackData = () => {
    ;(async() => {
      const query = { owner_type: "None" }
      const headers = {
        "Content-Type": "application/json"
      }
      const method = "POST"
      const credentials = "include"
      const body = JSON.stringify({ query })

      const options = {
        headers,
        method,
        credentials,
        body
      }


      try {
        const response = await fetch(GETPACKS, options)
        const data = await response.json()

        setPackData(data.packs)

      } catch (error) {
        console.log("getPacks error:", error);
      }
    })()
  }


  const vote = pack_name => {
    setUsersVote(pack_name)

    const message = {
      recipient_id: "game",
      subject: "vote",
      content: { pack_name, room }
    }

    sendMessage(message)
  }


  const updateVotes = ({ content }) => {
    setVotes({ ...votes, ...content })
  }


  const select = (pack, delay) => {
    const { folder } = pack
    const message = {
      recipient_id: "game",
      subject: "select_pack",
      content: { folder, room, delay }
    }

    setDelay(delay)

    sendMessage(message)
  }


  const roomCreated = ({ content }) => {
    const { gameData } = content // also folder, room, createdTime
    loadGameData({ content: gameData })
  }


  const loadGameData = ({ content }) => {
    const { lastClick, foundBy, startTime } = content
    setGameData(content)
    setLastClick(lastClick)
    setFoundBy(foundBy)
    setStartTime(startTime)
    setScore({})
  }


  // GAME PLAY / GAME PLAY / GAME PLAY / GAME PLAY / GAME PLAY //

  const clickImage = ( cardIndex, href ) => {
    if ( lastClick.href === href
      && lastClick.cardIndex !== cardIndex
       ) {
      sendMessage({
        recipient_id: "game",
        subject: "match",
        content: { href, room }
      })

      cardIndex = -1 // both images have been found
    }

    setLastClick({ cardIndex, href })
  }


  const matchFound = ({ content }) => {
    const {
      href,
      user_name,
      score,
    } = content

    setFoundBy(user_name)
    // Highlight the images found by someone, and block the mouse
    setLastClick({ cardIndex: -1, href })

    setScore(score)
  }


  const requestNextCard = () => {
    sendMessage({
      recipient_id: "game",
      subject: "request_next_card",
      content: room
    })
  }


  const showNextCard = ({ content }) => {
    setGameData({ ...gameData, index: content })

    // Forget any clicks applied to the previous cards
    setLastClick({})

    if (content === "game_over") {
      setGameOver(true)

    } else {
      setFoundBy()
    }
  }


  // LEAVING AND ENDING THE GAME // LEAVING AND ENDING THE GAME //


  /** Sent by a player who is not the room_host. A message with
   *  the subject "user_left_game" will be sent to all remaining
   *  members in the room. A message "left_game" will be sent to
   *  the player who is leaving.
   */
  const leaveGame = () => {
    sendMessage({
      recipient_id: "game",
      subject: "leave_event_game",
      content: { room }
    })
  }



  /** Sent by the room_host when leaving a room. All players in
   *  the room will receive a "game_ended_by_host" message,
   *  treated by this script. The WSContext for each player will
   *   receive a "room_closing" message.
   */
  const endGame = () => {
    sendMessage({
      recipient_id: "game",
      subject: "end_event_game",
      content: { room }
    })
  }


  /** Personal confirmation that the server has treated the
   *  "leave_event_game" message sent by leaveGame.
   */
  const leftGame = message => {
    setGameEnded(true)
  }


  /** The server has treated the "leave_event_game" message sent
   *  by another user (not the host).
   */
  const userLeftGame = ({ content }) => {
    console.log(`The player ${content.user_name} has left the game.`)

  }



  /** The host (who may be this player) has left the room and
   *  the room
   */
  const gameEndedByHost = (message) => {
    setGameEnded(true)
  }


  // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES //


  /**
   * addMessageListeners() is called on every single render,
   * because any incoming messages must have access to the scope
   * of the current render.
   * removeMessageListener() is therefore also called just before
   * the next render, to clear out listener callbacks that are no
   * longer valid.
   */
  const addMessageListeners = () => {
    const listeners = [
      { subject: "votes", callback: updateVotes },
      { subject: "gameData", callback: loadGameData },
      { subject: "match_found", callback: matchFound },
      { subject: "show_next_card", callback: showNextCard },

      { subject: "event_room_created", callback: roomCreated },
      { subject: "left_game", callback: leftGame },
      { subject: "user_left_game", callback: userLeftGame },
      { subject: "game_ended_by_host", callback: gameEndedByHost }
    ]
    addMessageListener(listeners)

    return () => removeMessageListener(listeners)
  }


  // INITIALIZATION // INITIALIZATION // INITIALIZATION //

  useEffect(fetchPackData, [])   // called only on first render
  useEffect(addMessageListeners) // called on every render

  return (
    <GameContext.Provider
      value ={{
        BASE_URL,
        packData,
        usersVote,
        votes,
        vote,
        delay,
        select,
        gameData,
        clickImage,
        lastClick,
        foundBy,
        startTime,
        setStartTime,
        requestNextCard,
        score,
        gameOver,
        setGameOver,
        leaveGame,
        endGame,
        gameEnded,
        setGameData
      }}
    >
      {children}
    </GameContext.Provider>
  )
}