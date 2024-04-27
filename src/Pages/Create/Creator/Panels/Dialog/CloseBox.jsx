/**
 * src/Pages/Create/Creator/Panels/Dialog/CloseBox.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../../Contexts'


export const CloseBox = (props) => {
  const {
    setDialog
  } = useContext(LayoutContext)


  return (
    <button
      className="x"
      onClick={() => setDialog()}
    >
      ✕
    </button>
  )
}