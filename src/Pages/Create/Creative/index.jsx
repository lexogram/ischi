/**
 * src/Pages/Create/Creator/index.jsx
 */



import React from 'react'
import { ImageStore } from './ImageStore'
import { CardMaker } from './CardMaker'

export const Creator = () => {

  return (
    <article id="creator">
      <ImageStore />
      <CardMaker />
    </article>
  )
}