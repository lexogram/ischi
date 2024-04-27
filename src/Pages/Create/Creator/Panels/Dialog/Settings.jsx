/**
 * src/Pages/Create/Creator/Panels/Dialog/Settings.jsx
 */


import React, { useContext } from 'react'
import { Toggle } from './Toggle'
import { LayoutContext } from '../../../../../Contexts'


export const Settings = (props) => {

  const {
    customLayout,
    setCustomLayout,
    turnConstraint,
    setTurnConstraint,
    turnOut,
    setTurnOut,
    defaultCrop,
    setDefaultCrop
  } = useContext(LayoutContext)

  
  const turnOutClass = turnConstraint ? "" : "disabled"
  

  return (
    <div className="settings">
      <h1>Card Layout</h1>
      <Toggle
        prop="custom"
        title="The layout for each card is..."
        offText="Identical"
        onText="Different"
        checked={customLayout}
        action={setCustomLayout}
      />
      <Toggle
        prop="rotation"
        title="The rotation of each image is..."
        offText="Free"
        onText="Fixed"
        checked={turnConstraint}
        action={setTurnConstraint}
      />
      <Toggle
        className={turnOutClass}
        prop="direction"
        title="Each image is..."
        offText="Upright"
        onText="Facing outwards"
        checked={turnOut}
        action={setTurnOut}
      />
      <Toggle
        prop="crop"
        title="Crop all images by default?"
        offText="No"
        onText="Yes"
        checked={defaultCrop}
        action={setDefaultCrop}
      />
    </div>
  )
}