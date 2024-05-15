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

import { WSContext } from './WSContext'
import { GETPACKS, DELAY_ARRAY } from '../Constants'
const DEFAULT_DELAY = DELAY_ARRAY[2][0]



export const GameContext = createContext()



export const GameProvider = ({ children }) => {
  const {
    BASE_URL,    // for getting files from Express server
    sendMessage,
    addMessageListener,
    removeMessageListener,
    room,
    members
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


  const loadGameData = ({ content }) => {
    setGameData(content)    
    setLastClick(content.lastClick)
    setScore({})
    setFoundBy(content.foundBy)
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

    // // Ensure that every member has the correct score attached to
    // // their name even if their name is not unique
    // const names = Object.values(members)
    // const unique = names.filter(name => {
    //   return (names.indexOf(name) === names.lastIndexOf(name))
    // })

    // const entries = Object.entries(members)

    // let tally = entries.reduce((tally, [uuid, name]) => {
    //   if (unique.indexOf(name) < 0) {
    //     name = name + "-" + uuid.slice(0,3)
    //   }
    //   tally[name] = score[uuid] || 0
    //   return tally
    // }, {})
    // setScore(tally)

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
      { subject: "show_next_card", callback: showNextCard }
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
        requestNextCard,
        score,
        setGameData,
        gameOver,
        setGameOver
      }}
    >
      {children}
    </GameContext.Provider>
  )
}