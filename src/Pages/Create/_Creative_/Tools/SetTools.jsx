/**
 * SetTools.jsx
 */


import React, { useContext } from 'react'
import { CreateContext } from '../../../../Contexts'


export const SetTools = () => {
  const {
    customLayout,
    setCustomLayout,
    cropByDefault,
    setCropByDefault,
    useSunburst,
    setSunburst,
  } = useContext(CreateContext)



  const toggleCustom = ({ target }) => {
    const customLayout = target.id.startsWith("custom")
    setCustomLayout(customLayout)
  }


  const toggleCropByDefault = ({target}) => {
    setCropByDefault(target.checked)
  }


  const toggleSunburst = ({target}) => {
    setSunburst(target.checked)
  }


  return (
    <div id="set-tools">
      <label htmlFor="fixed-layout">
        <input
          id="fixed-layout"
          type="radio"
          name="fix-layout"
          value="fixed"
          checked={!customLayout}
          onChange={toggleCustom }
        />
        <span>Uniform layout for all cards</span>
      </label>

      <label htmlFor="custom-layout">
        <input
          id="custom-layout"
          type="radio"
          name="fix-layout"
          value="custom"
          checked={customLayout}
          onChange={toggleCustom }
        />
        <span>Custom layout for each card</span>
      </label>

      <label htmlFor="use-sunburst">
        <input
          id="use-sunburst"
          type="checkbox"
          checked={useSunburst || !customLayout}
          disabled={!customLayout}
          onChange={toggleSunburst}
        />
        <span>Fixed rotation</span>
      </label>

      <label htmlFor="apply-crop-paths">
        <input
          id="apply-crop-paths"
          type="checkbox"
          checked={cropByDefault}
          onChange={toggleCropByDefault}
        />
        <span>Crop images by default</span>
      </label>
    </div>
  )
}