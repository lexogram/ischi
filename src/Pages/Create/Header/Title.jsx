/**
 * src/Pages/Create/Titlebar/Title.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../Contexts'

export const Title = () => {
  const { name } = useContext(CreatorContext)


  return (
    <h1 className="title">{name}</h1>
  )
}