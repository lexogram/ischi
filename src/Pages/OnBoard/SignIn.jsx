/**
 * src/Pages/OnBoard/SignIn.jsx
 */


import React from 'react'


export const SignIn = (props) => {


  return (
    <form
      action="/signin"
      method="POST"
    >
    <label for="id">
      <span>Username OR Email:</span>
      <input
        type="text"
        id="id"
        name="id"
        value=""
      />
    </label>
      <label for="password">
        <span>Password:</span>
        <input
          type="password"
          id="password"
          name="password"
          value=""
          required
        />
      </label>
      <button
        type="submit"
      >
        Sign In
      </button>
    </form>
  )
}