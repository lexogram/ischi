/**
 * Save
 *Dialog.jsx
 */


import React, { useContext, useState, useRef, useEffect } from 'react'

import { Context } from '../../../api/context/Context'



export const SaveDialog = () => {
  const {
    showSaveDialog,
    toggleSaveDialog,
    getHREF
  } = useContext(Context)
  const [ href, setHREF ] = useState()
  const [ fileName, setFileName ] = useState("")
  const inputRef = useRef()
  const linkRef = useRef()
  

  const updateFileName = ({ target }) => {
    setFileName(target.value)
  }


  const checkForEnterKey = event => {
    if (event.key === "Enter") {
      saveFileAs()
    }
  }


  const saveFileAs = () => {
    if (!fileName) {
      return
    }

    linkRef.current.click()
    toggleSaveDialog() // undefined is falsy
  }


  const fullName = /\.json$/.test(fileName.trim())
    ? fileName.trim()
    : fileName.trim() +".json"


  useEffect(() => {
    setFileName("")
    if (inputRef.current) {
      inputRef.current.focus()
      const href = getHREF()
      setHREF(href)

    } else {
      setHREF()
    }
  }, [showSaveDialog])



  const disabled = !fileName.trim() && href



  if (showSaveDialog) {
    return (
      <div className="file-dialog">
        <div className="outline">
          <label>
            <p>Save as a JSON file...</p>
            <input
              type="text"
              onChange={updateFileName}
              onKeyDown={checkForEnterKey}
              value={fileName}
              ref={inputRef}
            />
          </label>
          <button
            className="close"
            onClick={toggleSaveDialog} // event !== true, so false
          >
            &times;
          </button>
          <button
            className="save"
            disabled={disabled}
            onClick={saveFileAs}
          >
            Save
          </button>
          <a
            className="hidden"
            href={href}
            download={fullName}
            ref={linkRef}
          >
            Save
          </a>
        </div>
      </div>
    )
  }

  return ""
}