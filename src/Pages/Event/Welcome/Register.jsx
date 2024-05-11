/**
 * src/components/Register.jsx
 */


import React, {
  useState,
  useEffect,
  useRef,
  useContext
} from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { EventContext } from '../../../Contexts';

import { EmojiSelector } from './EmojiSelector'
import { ButtonOrBusy } from './ButtonOrBusy'
import { debounce } from '../../../Utilities/debounce'

const texts = {
  instruction: "Enter your name and choose an avatar:",
  loading: "Loading avatars...",
  checking: "Checking if this avatar is already taken...",
  taken: "Someone else chose {{emoji}} first.",
  same_name: "Someone else with the name \"{{name}}\" is already using {{emoji}}.",
  another: "Please use a different avatar.",
  score: "Score",
  time: "Time"
}



export const Register = ({ id }) => {
  const { t } = useTranslation()

  const {
    // socketIsOpen,
    // requestSocketToOpen,
    sendMessage,
    // addMessageListener,
    // removeMessageListener,
    // room,
    // members,
    emojis,
    updateUserData,
    name,
    emoji,
    disabled,
    message,
    register
  } = useContext(EventContext)

  const inputRef = useRef()


  const selectEmoji = event => {
    inputRef.current.focus()
    inputRef.current.select()
    updateUserData(event)
  }


  const checkForEnter = ({ key }) => {
    if (key === "Enter" && !disabled) {
      register()
    }
  }


  return (
    <div className="register">
      <h3>{t("event.instruction")}</h3>
      <input
        ref={inputRef}
        type="text"
        placeholder={id}
        name="name"
        value={name}
        required
        onChange={updateUserData}
        onKeyDown={checkForEnter}
      />
      <EmojiSelector
        emojis={emojis}
        selected={emoji}
        selectEmoji={selectEmoji}
      />
      <ButtonOrBusy
        disabled={disabled}
        action={register}
        message={message}
      />
    </div>
  )
}