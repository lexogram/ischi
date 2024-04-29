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
        <span>{texts.id}:</span>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
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
            id="is_private"
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
              id="auto_login"
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