/**
 * frontend/src/pages/Connection/SignIn.jsx
 */


import React from 'react'
import { Password } from './Password'


export const SignIn = (props) => {
  const {
    storageData,
    formData,
    onChange,
    texts
  } = props

  let {
    is_private,
    auto_login
  } = storageData
  auto_login = is_private
            && auto_login

  return (
    <>
      <label>
        <span>{texts.user_id}:</span>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          required
          onChange={onChange}
        />
      </label>
      <Password {...props}/>

      <label
        className="storage"
      >
        <div>
          <input
            type="checkbox"
            name="is_private"
            checked={storageData.is_private}
            onChange={onChange}
          />
          <span>{texts.is_private}</span>
        </div>
        <label
          className="storage"
        >
          <div
            className={storageData.is_private ? "" : "disabled"}
          >
            <input
              type="checkbox"
              name="auto_login"
              checked={auto_login}
              onChange={onChange}
            />
            <span>{texts.auto_login}</span>
          </div>
        </label>
      </label>
    </>
  )
}