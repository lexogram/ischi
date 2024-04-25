/**
 * CardNumber.jsx
 */


import React, { useContext } from 'react'
import { CreateContext } from '../../../../Contexts'


export const CardNumber = () => {
  const { cardNumber, total } = useContext(CreateContext)

  return (
    <h1
      id="card-number"
    >
      Card {cardNumber + 1}/{total}
    </h1>
  )
}