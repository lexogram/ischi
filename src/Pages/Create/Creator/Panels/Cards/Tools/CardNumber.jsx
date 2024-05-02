/**
 * CardNumber.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../../../../Contexts'

export const CardNumber = () => {
  const { cardNumber, total } = useContext(CreatorContext)

  return (
    <h1
      id="card-number"
    >
      Card {cardNumber + 1}/{total}
    </h1>
  )
}