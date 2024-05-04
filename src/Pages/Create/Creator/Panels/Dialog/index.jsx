/**
 * src/Pages/Create/Creator/Footer/GalleryDialog/index.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../../../Contexts'
import { File } from './File'
import { NewPack } from './NewPack.jsx'
import { Images } from './Images'
import { Layout } from './Layout'
import { CloseBox } from './CloseBox'


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