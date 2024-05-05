/**
 * src/Pages/Create/Footer/GalleryDialog/index.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../../Contexts'
import { File } from './File.jsx'
import { NewPack } from './NewPack.jsx'
import { Images } from './Images.jsx'
import { Save } from './Save.jsx'
import { Layout } from './Layout.jsx'
import { CloseBox } from './CloseBox.jsx'


export const Dialog = () => {
  const {
    dialog
  } = useContext(CreatorContext)


  const children = (() => {
    switch (dialog) {
      case "file":
        return <File />
      case "new":
        return <NewPack />
      case "images":
        return <Images />
      case "save":
        return <Save />
      case "layout":
        return <Layout />

      default:
        const Component = dialog?.component
        if (Component) {
          return (
            <Component
              {...dialog}
            />
          )
        }
    }
  })()


  return (
    <div className="dialog">
      <CloseBox />
      {children}
    </div>
  )
}