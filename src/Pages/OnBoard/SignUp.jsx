/**
 * frontend/src/pages/Connection/SignUp.jsx
 */


import React from 'react'
import { Password } from './Password'



export const SignUp = (props) => {
  const {formData,
    onChange,
    forBusiness,
    toggleForBusiness,
    texts
  } = props


  return (
    <>
      <label htmlFor="username">
        <span>{texts.username}:</span>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          required
          onChange={onChange}
        />
      </label>
      <label htmlFor="email">
        <span>{texts.email}:</span>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          required
          onChange={onChange}
        />
      </label>
      <Password {...props}/>

      <label htmlFor="business">
        <input
          id="business"
          type="checkbox"
          checked={forBusiness}
          onChange={toggleForBusiness}
        />
        <span>{texts.business}</span>
      </label>

      {forBusiness && <input
        type="text"
        name="organisation"
        value={formData.organisation}
        onChange={onChange}
      />}
    </>
  )
}