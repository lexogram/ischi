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



export const EventContext = createContext()



export const EventProvider = ({ children }) => {
  const { t } = useTranslation()
  const {
    socketIsOpen,
    sendMessage,
    user_id,
    addMessageListener,
    removeMessageListener,
    room,
    members
  } = useContext(WSContext)
  const [ emojis, setEmojis ] = useState([])
  const [ name, setName ] = useState("")
  const [ emoji, setEmoji ] = useState("")
  const [ disabled, setDisabled ] = useState(true)
  const [ message, setMessage ] = useState("")
  const [ avatar, setAvatar ] = useState("")


  const checkRef = useRef()
  const checkIfEmojiIsTaken = checkRef.current // starts undefined



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

  function checkSoon(content) {
    sendMessage({
      recipient_id: "emojis",
      subject: "check",
      content
    })
  }

  function treatIfEmojiIsTaken({ content }) {
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

  function treatConfirmation({ content }) {
    const { confirmed } = content
    if (confirmed) {
      setAvatar(`${emoji} ${name}`)
    }
  }



  function getTakenMessage(emoji) {
    return `${t("event.taken")} ${t("event.another")}`.replace(
      "{{emoji}}", emoji
    )
  }

  function treatSwap( error, payload ) {
    const {emoji: replaced, index, replacement} = payload
    console.log("swap", JSON.stringify(payload, null, '  '));

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
      { subject: "swap", callback: treatSwap }
    ]
    addMessageListener(listeners)

    return () => removeMessageListener(listeners)
  }


  // INITIALIZATION // INITIALIZATION // INITIALIZATION //

  useEffect(getRandomEmojis, [user_id])
  useEffect(addMessageListeners) // called on every render

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
        avatar
      }}
    >
      {children}
    </EventContext.Provider>
  )
}