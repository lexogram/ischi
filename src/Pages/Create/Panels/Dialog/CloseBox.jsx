/**
 * src/Pages/Create/Panels/Dialog/CloseBox.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../../Contexts'


export const CloseBox = (props) => {
  const {
    dialog,
    setDialog,
    setImageFiles
  } = useContext(CreatorContext)


  const closeDialog = () => {
    if ((dialog === "images") || dialog?.packName){
      setImageFiles([])
    }
    setDialog()
  }


  return (
    <button
      className="x"
      onClick={closeDialog}
    >
      ✕
    </button>
  )
}