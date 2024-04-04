/**
 * src/Pages/OnBoard/SignUp.jsx
 */


import React, { useState, useContext } from 'react'
import { UserContext } from '../../Contexts'
import { PROTOCOL, HOSTNAME, PORT } from '../../Constants/'

const method = "POST"
const action = `${PROTOCOL}${HOSTNAME}${PORT}/signup`
const headers = {
  "Content-Type": "application/json"
}

export const SignUp = (props) => {
  const { idData, setIdData } = useContext(UserContext)
  const [ form, setForm ] = useState({
    username: idData.username || "me",
    organisation: "",
    email: idData.email || "me@example",
    password: "pass"
  })
  

  const onChange = ({target}) => {
    const { id, value } = target
    form[id] = value
    setForm({ ...form })
  }

  const reducer = (key, value) => {
    return !!value ? value : undefined
  }

  const treatLogin = (data) => {
    const { message, user } = data
    if (/is already taken/.test(message)) {

    } else if (user) {
      console.log("user:", user);
      setIdData(user)
    }
  }

  const treatError = error => {
    console.log("error:", error)
  }
  

  const onSubmit = event => {
    event.preventDefault()
    const body = JSON.stringify(form, reducer, "  ")    

    const options = {
      method,
      headers,
      body,
    }

    fetch(action, options)
      .then(response => response.json())
      .then(treatLogin)
      .catch(treatError)
  }
  


  return (
    <form
      id="sign-up"
      // method={method}
      // action={action}
      onSubmit={onSubmit}
    >
      <label htmlFor="username">
        <span>Username:</span>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          required
          onChange={onChange}
        />
      </label>
      <label htmlFor="organisation">
        <span>Organisation (optional):</span>
        <input
          type="text"
          id="organisation"
          name="organisation"
          value={form.organisation}
          onChange={onChange}
        />
      </label>
      <label htmlFor="email">
        <span>Email:</span>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          required
          onChange={onChange}
        />
      </label>
      <label htmlFor="password">
        <span>Password:</span>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          required
          onChange={onChange}
        />
      </label>
      <button
        type="submit"
      >
        Register
      </button>
    </form>
  )
}