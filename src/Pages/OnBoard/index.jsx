/**
 * frontend/src/pages/Connection/index.jsx
 *
 * Parent script for both SignUp and SignIn.
 */

import React, { useState, useContext } from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { UserContext } from '../../Contexts/UserContext'
import { SIGNIN, SIGNUP } from '../../Constants'

import storage from '../../Utilities/storage'
const SIGNIN_DEFAULTS = {
  is_private: false,
  auto_login: false
}



import '../../SCSS/connection.css'


import { Switcher } from "./Switcher";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";



export const Connection = () => {
  const { completeSignIn } = useContext(UserContext)
  const { t } = useTranslation()

  const signInOptions = storage.get() // may be {}
  const previous_signin = !!Object.keys(signInOptions).length

  const [ action, setAction ] = useState(
    () => previous_signin ? "signIn" : "signUp"
  )
  const [ logInstead, setLogInstead ] = useState(false)


  const [ hidePassword, setHidePassword ] = useState(true)
  const [ forBusiness, setForBusiness ] = useState(false)

  const [ storageData, setStorageData ] = useState(
    Object.assign(SIGNIN_DEFAULTS, signInOptions)
  )

  const [ formData, setFormData ] = useState({
    id: storageData.is_private ? storageData.id : "",
    username: "",
    organisation: "",
    email: "",
    password: "jazyx",
    auto_login: storageData.auto_login
  })


  const toggleHidePassword = event => {
    setHidePassword(!hidePassword)
  }


  const toggleForBusiness = () => {
    setForBusiness(!forBusiness)
  }


  const texts = {
    signUp:     t("sign.up"),
    signIn:     t("sign.in"),
    username:   t("sign.username"),
    email:      t("sign.email"),
    password:   t("sign.password"),
    id:         t("sign.id"),
    passTitle: hidePassword
            ?   t("sign.show-password")
            :   t("sign.hide-password"),
    business: forBusiness
            ?   t("sign.organisation")
            :   t("sign.business-account"),
    is_private: t("sign.device-is-private"),
    auto_login: t("sign.remember-me"),
    invalid:    t("sign.unauthorized")
  }


  const onChange = ({ target }) => {
    let { name, value, checked, type } = target

    if (formData.hasOwnProperty(name)) {
      // Set value to true|false for auto_login checkbox
      // For text inputs, use the text value
      value = type === "checkbox" ? checked : value
      setFormData({ ...formData, [name]: value })
    }

    if (storageData.hasOwnProperty(name)) {
      // is_private and auto_login are boolean from checkboxes
      setStorageData({ ...storageData, [name]: checked })
    }
  }


  const reducer = (key, value) => {
    const notNeeded = !value
    || key === "organisation" && !forBusiness
    || ( action === "signUp"
      && key === "id"
       )
    || ( action === "signIn"
      && ( key === "username"
        || key === "email"
         )
       );

    return notNeeded ? undefined : value
  }

  const onSubmit = event => {
    event.preventDefault()
    setLogInstead()

    const URL = action === "signIn" ? SIGNIN : SIGNUP
    const headers = { "Content-Type": "application/json" }
    const method = "POST"
    const credentials = "include"

    // Use reducer to remove unneeded or undefined values
    const body = JSON.stringify(formData, reducer, "")
    const options = {
      headers,
      method,
      body,
      credentials
    }

    fetch(URL, options)
      .then(response => response.json())
      .then(treatConnection)
      .catch(error => console.log("error:", error))
  }


  function treatConnection(json) {
    // Possible values of json:
    // { success: "user record created",
    //   user: {
    //     username: "me",
    //     email: "you@example.com"
    // }}
    // { success: "signed_in", user: {…} }            // signIn
    // { success: "signed_in", user: {…}, pass: {…} } // signUp+
    //
    // { fail: { username: me }}   // wrong email or password
    // { fail: { email: "me@example.com" }} // wrong password
    // { fail: "unauthorized" }    // id/password mismatch

    const { success, user, pass, fail } = json
    if (success === "signed_in") {
      if (pass) {
        // Show message about signing in instead of signing up
      }
      completeSignIn( user || pass )
      saveOptionsToLocalStorage()

    } else if (success) { // user record created
      completeSignUp(user)

    } else { // { fail: ... }
      switch (typeof fail) {
        case "string":
          return setLogInstead(fail)

        case "object":
          // e[0] will be "username" or "email"
          // e[1] will be the username or the email address
          return setLogInstead(Object.entries(fail)[0])

        default:
          setLogInstead("unknown-error")
      }
    }
  }


  function showSignIn() {
    setAction("signIn")
    const id = logInstead[1]
    setFormData({ ...formData, id })
    setLogInstead(false)
  }


  function completeSignUp(user) {
    setFormData({ ...formData, id: user.email })
    setAction("signIn")
  }


  function saveOptionsToLocalStorage() {
    let {
      is_private,
      auto_login
    } = storageData

    auto_login = is_private && auto_login

    const storageOptions = {
      is_private,
      auto_login,
      id: is_private ? formData.id : undefined
    }

    storage.set(storageOptions)
  }


  const switchData = {
    action,
    setAction,
    actions: {
      signUp: texts.signUp,
      signIn: texts.signIn
    },
    setLogInstead
  }


  const signingData = {
    formData,
    storageData,
    onChange,
    onSubmit,
    hidePassword,
    toggleHidePassword,
    forBusiness,
    toggleForBusiness,
    texts
  }


  const signUpFeedback = (() => {
    switch (typeof logInstead) {
      case "string":
        return showFailMessage()
      case "object":
        return showDuplicate()
      default:
        return
    }
  })()


  function showDuplicate() {
    const [ key, value ] = logInstead

    const button = (
      <button
        type="button"
        onClick={showSignIn}
      />
    )

    const span = <span />

    return (
      <p className="logInstead">
        <Trans
          i18nKey="sign.duplicate"
          values={{ key: t(`sign._${[key]}`), value }}
          defaults="The {{key}} '{{value}}' exists. <span><button>Log in</button></span>"
          components={{ button, span }}
        />
      </p>
    )
  }


  function showFailMessage() {
    return (
      <p className="fail-message">
        {t(`sign.${logInstead}`)}
      </p>
    )
  }


  const component = action === "signUp"
  ? <SignUp {...signingData} />
  : <SignIn {...signingData} />


  return (
    <form
      id="connection"
      onSubmit={onSubmit}
    >
      <Switcher {...switchData} />

      {component}
      {signUpFeedback}

      <div className="buttons">
        {action === "signIn" && <button
          type="button"
          onClick={() => completeSignIn()}
        >
          {t("sign.guest")}
        </button>}
        <button
          id="submit"
        >
          {texts[action]}
        </button>
      </div>
    </form>
  )
}