/**
 * src/Pages/Create/Creator/Panels.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../../Contexts'
import { Gallery } from './Gallery'
import { Dialog } from './Dialog'
import { Cards } from './Cards'


export const Panels = () => {
  const {
    columns,
    activeTab,
    dialog
  } = useContext(LayoutContext)

  const showGallery = columns || activeTab === "gallery"
  const showCards = columns || activeTab === "cards"

  return (
    <div className="creator-panels">
      {showGallery && <Gallery />}
      {showCards && <Cards />}
      {dialog && <Dialog />}
    </div>
  )
}