/**
 * src/components/Register.jsx
 */


import React, {
  useRef,
  useContext
} from 'react'
import { useTranslation } from 'react-i18next';
import { EventContext } from '../../../Contexts';

import { EmojiSelector } from './EmojiSelector'
import { ButtonOrBusy } from './ButtonOrBusy'



export const Register = ({ id }) => {
  const { t } = useTranslation()

  const {
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