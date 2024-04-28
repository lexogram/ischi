/**
 * src/components/Languages.jsx
 */


import React, { useContext } from 'react'
import { I18nContext } from '../Contexts'

const divStyle = {
  position: "absolute",
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  justifyContent: "space-around",
}  

const checkboxStyle = {
  width: "0",
  visibility: "hidden"
}


export const Languages = (props) => {
  const {
    languages,
    language,
    changeLanguage
  } = useContext(I18nContext)

  // console.log("languages:", languages)
  // {
  //   "en": {
  //     "name": "English",
  //     "flag": "/flags/en-GB.png"
  //   },
  //   "fr": {
  //     "name": "Français",
  //     "flag": "/flags/fr.png"
  //   }
  // }

  const chooseLanguage = ({ target }) => {
    const { id } = target

    if (languages[id]) {
      changeLanguage(id)
    }
  }

  const radioButtons = Object.entries(languages).map(([ code, data ]) => {
    const { name, flag } = data

    const checked = code === language
    const opacity = checked ? 1 : 0.5
    const borderStyle = checked ? "inset" : "outset"
    

    const imgStyle = {
      width: "32px",
      border: `2px ${borderStyle} #ccc`,
      borderRadius: "100vmax",
      opacity
    }
    
    return (
      <label
        key={code}
      >
        <input
          type="radio"
          name="language"
          style={checkboxStyle}
          value={code}
          id={code}
        />
        <img
          src={flag}
          alt={name}
          title={name}
          style={imgStyle}
        />
      </label>
    )
  })

  return (
    <div
      onChange={chooseLanguage}
      style={divStyle}
    >
      {radioButtons}
    </div>
  )
}