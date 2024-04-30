/**
 * CreatorContext.jsx
 *
 * description
 */

import React, { createContext, useState } from 'react'
import { useResize } from '../../Hooks/useResize'



export const CreatorContext = createContext()



export const CreatorProvider = ({ children }) => {
  const [ activeTab, setActiveTab ] = useState("gallery")
  const [ dialog, setDialog ] = useState()

  const [ customLayout, setCustomLayout ] = useState(true)
  const [ turnConstraint, setTurnConstraint ] = useState(false)
  const [ turnOut, setTurnOut ] = useState(true)
  const [ defaultCrop, setDefaultCrop ] = useState(true)
  const [ images, setImages ] = useState([])

  const [ useDirectory, setUseDirectory ] = useState(false)
  

  const [ width, height ] = useResize()
  const ratio = width / height
  const columns = ratio > 3/4 // <<< HARD-CODED


  return (
    <CreatorContext.Provider
      value ={{
        ratio,
        columns,
        activeTab,
        setActiveTab,
        dialog,
        setDialog,

        customLayout,
        setCustomLayout,
        turnConstraint,
        setTurnConstraint,
        turnOut,
        setTurnOut,
        defaultCrop,
        setDefaultCrop,
        images,
        setImages,
        
        useDirectory,
        setUseDirectory
      }}
    >
      {children}
    </CreatorContext.Provider>
  )
}