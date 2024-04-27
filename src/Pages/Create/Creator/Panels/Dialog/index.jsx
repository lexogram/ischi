/**
 * src/Pages/Create/Creator/Footer/GalleryDialog/index.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../../Contexts'
import { File } from './File'
import { Images } from './Images'
import { Settings } from './Settings'
import { CloseBox } from './CloseBox'


export const Dialog = () => {
  const {
    dialog
  } = useContext(LayoutContext)


  const children = (() => {
    switch (dialog) {
      case "file":
        return <File />
      case "images":
        return <Images />
      case "layout":
        return <Settings />
    }
  })()


  return (
    <div className="dialog">
      <CloseBox />
      {children}
    </div>
  )
}