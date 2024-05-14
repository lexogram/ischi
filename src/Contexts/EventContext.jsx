/**
 * EventContext.jsx
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef
} from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { WSContext } from './WSContext'
import { GameContext } from './GameContext'
import { debounce } from '../Utilities/debounce';
import { GETEVENTPACKS, FETCH_OPTIONS } from '../Constants'



export const EventContext = createContext()



export const EventProvider = ({ children }) => {
  const { t } = useTranslation()
  const {
    sendMessage,
    user_id,
    user_data,
    addMessageListener,
    removeMessageListener,
    room,
    members
  } = useContext(WSContext)

  const [ emojis, setEmojis ]             = useState([])
  const [ name, setName ]                 = useState("")
  const [ emoji, setEmoji ]               = useState("")
  const [ disabled, setDisabled ]         = useState(true)
  const [ message, setMessage ]           = useState("")
  const [ organization, setOrganization ] = useState("")
  const [ player, setPlayer ]             = useState("")
  const [ roomHost, setRoomHost ]         = useState("")
  const [ packs, setPacks ]               = useState([])
  const [ packFolder, setPackFolder ]     = useState()
  const [ noStrangers, setNoStrangers ]   = useState(true)
  const [ startTime, setStartTime ]       = useState(0)
  
  

  // console.log("user_data:", user_data);
  // {} OR
  // { choices: <array (empty if emoji is set)>
  //   dataNotRestored: <boolean>
  //   + (if a name and emoji were entered)
  //   name: <string>
  //   munged_name: <lowercase name>
  //   selected: <emoji string if a choice was made>
  //   + (if registered)
  //   emoji: <same as selected>
  // }


  const checkRef = useRef()
  const checkIfEmojiIsTaken = checkRef.current // starts undefined



  const initialize = () => {
    if (!user_id) {
      return
    }

    // There may be data restored from a previous connection
    const {
      choices:
      emojis,
      name="",
      selected="",
      emoji=""
    } = user_data

    if (emojis) {
      setName(name) // may be ""
      // Restore from data preserved on the server
      if (emojis.length) {
        // Not yet registered. Set emojis. Trigger the debounce.
        treatInitialEmojis({ content: { emojis }})
        setEmoji(selected) // may be ""

        if (name && selected) {
          // Set the Register button to the correct enabled state
          checkSoon({ name, emoji: selected })
        }

      } else if (emoji && name) {
        // emojis is empty because a player name has been registerd
        setEmoji(emoji)

        generatePlayerName(emoji, name)

      } else {
        // Empty array, no registration
        getRandomEmojis()
      }
    } else {
      // No array at all
      getRandomEmojis()
    }
  }


  // EMOJIS

  const getRandomEmojis = () => {
    if (!user_id) {
      return
    }

    sendMessage({
      recipient_id: "emojis",
      subject: "emojis"
    })
  }

  const treatInitialEmojis = ({ content }) => {
    const { emojis } = content
    if (emojis) {
      // [ [<emoji>: <owners>[]], ... ] // owners is often []
      setEmojis(emojis)
    }
    checkRef.current = debounce(checkSoon, 500)
  }


  // EMOJI+NAME AVAILABILITY

  const updateUserData = ({ target }) => {
    const { value, type } = target

    const options = { name, emoji }
    switch (type) {
      case "text":
        setName(value)
        options.name = value
        break

      case "radio":
        setEmoji(value)
        options.emoji = value
        setMessage("")
        break

      default:
        // this shouldn't happen
        return console.log(
          `Unexpected type "${type}" in updateUserData
          value: ${value}`
        )
    }

    if (!options.name || !options.emoji) {
      return
    }

    setDisabled(true) // until server request is sent and answered
    setMessage(t("event.checking"))

    // Ask the server if this combination is acceptable
    checkIfEmojiIsTaken(options) // debounced
  }

  const checkSoon = (content) => {
    sendMessage({
      recipient_id: "emojis",
      subject: "check",
      content
    })
  }

  const treatIfEmojiIsTaken = ({ content }) => {
    const { taken } = content

    if (!taken || Array.isArray(taken)) {
      // No-one (with this `name`) has taken this emoji yet
      setDisabled(false)
      setMessage("")

    } else {
      // Someone (with this `name`) has already taken this emoji
      setDisabled(true)
      setEmoji(false)
      setMessage(getTakenMessage(emoji))

      const emojiArray = emojis.find( emojiArray => (
        emojiArray[0] === emoji[0] || emojiArray[0] === emoji
      ))
      if (emojiArray) {
        emojiArray[2] = "disabled"
      }
    }
  }


  // REGISTRATION

  const register = event => { // undefined if triggered by keyDown
    event && event.preventDefault()

    const content = { name, emoji }
    setDisabled(true) // so the user can't repeat the call

    // Check if emoji is already taken (by someone with this name)
    sendMessage({
      recipient_id: "emojis",
      subject: "confirm",
      content
    })
  }

  const treatConfirmation = ({ content }) => {
    const { confirmed } = content
    if (confirmed) {
      generatePlayerName(emoji, name)
    }
  }

  const generatePlayerName = (emoji, name) => {
    setPlayer(`${emoji}_${name}`)
  }


  // EMOJI ADJUSTMENTS

  const getTakenMessage = (emoji) => {
    return `${t("event.taken")} ${t("event.another")}`.replace(
      "{{emoji}}", emoji
    )
  }

  const treatSwap = ({ content }) => {
    const {emoji: replaced, index, replacement} = content
    // console.log("swap", JSON.stringify(content, null, '  '));

    // replacement may be undefinned

    if (!replacement || replaced !== replacement[0]) {
      // The previous emoji is being replaced...
      if (emoji === replaced) {
        // ... and it was this user's current selection. Deselect
        // the replacement and disable the Register button
        setMessage(getTakenMessage(emoji))
        setDisabled(true)

      } else {
        // Just draw attention to the change
        setMessage(t("event.taken").replace("{{emoji}}", replaced))
      }
    }

    emojis.splice(index, 1, replacement) // may be undefined
    setEmojis([ ...emojis ])
  }


  // PACKS

  const getEventPacks = () => {
    if (!organization) {
      return //console.log(
      //   "organization required for getEventPacks()"
      // );
    }

    const callback = (error, packsData) => {
      if (error) {
        return console.log("getEventPacks error:", error);
      }

      setPacks(packsData)
    }


    const body = JSON.stringify(
      { query: { munged_name: organization } }
    )
    const options = {
      ...FETCH_OPTIONS,
      body
    }

    fetch(GETEVENTPACKS, options)
     .then(response => response.json())
     .then(json => callback(null, json.packs))
     .catch(callback)

  }


  const createRoom = (folder) => {
    // "folder": "663013af1db981a3f72b2e92/18-19_век"

    const content = {
      organization,
      name,
      emoji,
      folder
    }
    sendMessage({
      recipient_id: "game",
      subject: "create_event_room",
      content
    })
  }


  const roomCreated = (message) => {
    console.log("roomCreated message:", JSON.stringify(message));
    
  }


  // const roomJoined = (message) => {
  //   console.log("roomJoined message:", message);
  // }


  const joinRoom = () => {

  }


  const startGame = () => {
    const content = { room }

    sendMessage({
      recipient_id: "game",
      subject: "start_event_game",
      content
    })
  }


  const gameStarted = ({ content }) => {
    if (content.room === room) {
      // This is the game this player wants to play
      setStartTime(content.startTime)
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
      { subject: "emojis", callback: treatInitialEmojis },
      { subject: "check", callback: treatIfEmojiIsTaken },
      { subject: "confirm", callback: treatConfirmation },
      { subject: "swap", callback: treatSwap },
      { subject: "event_room_created", callback: roomCreated },
      { subject: "event_game_started", callback: gameStarted}
      // Treated by WSContext
      // { subject: "room_joined", callback: roomJoined}

    ]
    addMessageListener(listeners)

    return () => removeMessageListener(listeners)
  }


  // INITIALIZATION // INITIALIZATION // INITIALIZATION //

  useEffect(initialize, [user_id, user_data])
  useEffect(addMessageListeners) // called on every render
  useEffect(getEventPacks, [organization])


  return (
    <EventContext.Provider
      value ={{
        emojis,
        updateUserData,
        name,
        emoji,
        disabled,
        message,
        register,

        player,
        setPlayer,
        organization,
        setOrganization,

        packs,
        packFolder,

        room,
        roomHost,
        setRoomHost,
        joinRoom,
        createRoom,

        noStrangers,
        setNoStrangers,
        startTime,
        startGame
      }}
    >
      {children}
    </EventContext.Provider>
  )
}