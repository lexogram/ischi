/**
 * src/Pages/Create/Creator/Panels/Dialog/File.jsx
 */


import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../../../Contexts'


export const File = () => {
  const { user } = useContext(UserContext)


  const open = user
    ? <div>Open Saved File</div>
    : <div>
        <p>
          Please
          <Link
            to="/login"
            className="primary button"
            draggable="false"
          >
            sign up or sign in
          </Link>
          if you want to save your custom packs.
        </p>
      </div>


  return (
    <div className="file">
      <h1>File</h1>

      <button>New...</button>
      <div className="open">{open}</div>
      <button>Open Sampler</button>
    </div>

  )
}