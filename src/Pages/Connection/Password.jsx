/**
 * frontend/src/pages/Connection/components/password.jsx
 */


import React from 'react'
import open from '../../Assets/open.svg'
import closed from '../../Assets/closed.svg'


export const Password = (props) => {

  const {
    texts,
    formData,
    hidePassword,
    toggleHidePassword,
    onChange
  } = props


  return (
    <label htmlFor="password">
      <span>{texts.password}:</span>
      <div>
        <input
          type={hidePassword ? "password" : "text"}
          id="password"
          name="password"
          value={formData.password}
          required
          onChange={onChange}
        />
        <button
          type="button"
          className={hidePassword ? "" : "open"}
          onClick={toggleHidePassword}
        >
          <img
            src={hidePassword ? closed : open}
            alt={texts.passTitle}
            title={texts.passTitle}
          />
        </button>
      </div>
    </label>
  )
}