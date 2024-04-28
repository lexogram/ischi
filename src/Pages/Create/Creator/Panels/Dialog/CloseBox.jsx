/**
 * src/Pages/Create/Creator/Panels/Dialog/CloseBox.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../../Contexts'


export const CloseBox = (props) => {
  const {
    dialog,
    setDialog,
    setImages
  } = useContext(LayoutContext)  


  const closeDialog = () => {
    if (dialog === "images"){
      setImages([])
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