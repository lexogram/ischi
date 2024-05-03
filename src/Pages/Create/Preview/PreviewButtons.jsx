/**
 * PreviewButtons.jsx
 */


import React, { useContext, useRef } from 'react'
import { CreatorContext } from '../../../Contexts';

import { SaveDialog } from "../Widget/SaveDialog";
import { sanitize } from '../../../api/data/file';


export const PreviewButtons = () => {
  const {
    toggleSaveDialog,
    loadFrom
  } = useContext(CreatorContext)
  const inputRef = useRef()
  

  const readJSON = ({ target }) => {
    const contents = target.result
    try {
      let json = JSON.parse(contents)
      json = sanitize(json)

      if (!json) {
        return setFeedback(INVALID_FORMAT)
      }

      loadFrom(json);

    } catch {
      console.log(INVALID_FORMAT)
    }
  }


  const treatFile = ({ target }) => {
    const { files } = target
    // console.log("target.files:", target.files);
    // [ { lastModified: 1703853929465,
    //     name: "layout.json",
    //     size: 90547,
    //     type: "application/json",
    //     webkitRelativePath: ""
    // }] // <<< There should only be one file

    if (files.length) {
      const file = files[0]
      const fileReader = new FileReader()
      fileReader.onload = readJSON
      fileReader.readAsText(file)
    }
  }


  const openDialog = () => {
    inputRef.current.click()
  }


  return (
    <div className="preview-buttons">
      <button
        onClick={() => toggleSaveDialog(true)}
      >
        Save...
      </button>

      <input
        className="hidden"
        type="file"
        accept="application/json"
        onChange={treatFile}
        ref={inputRef}
      />

      <button
        onClick={openDialog}
      >
        Open...
      </button>

      <button
        onClick={window.print}
      >
        Print...
      </button>

      <SaveDialog />
    </div>
  )
}