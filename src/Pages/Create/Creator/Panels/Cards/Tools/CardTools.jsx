/**
 * Tools_Card.jsx
 */


import React, { useState, useContext } from 'react'

import { CreatorContext } from '../../../../../../Contexts'
import { Selector } from '../../../../Widget/Selector'
import { CardNumber } from './CardNumber'



export const CardTools = () => {
  const {
    layoutNames,
    layoutName,
    setLayoutName,
    customLayout
  } = useContext(CreatorContext)


  const selectLayout = ({target}) => {
    setLayoutName(target.value)
  }


  return (
    <div className="card-tools">
      { layoutNames.length > 1 && customLayout && <Selector
        selected={layoutName}
        selection={layoutNames}
        onChange={selectLayout}
      />}
      <CardNumber />
    </div>
  )
}