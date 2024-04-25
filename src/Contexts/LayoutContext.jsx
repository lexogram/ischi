/**
 * LayoutContext.jsx
 *
 * description
 */

import React, { createContext, useState } from 'react'
import { useResize } from '../Hooks/useResize'



export const LayoutContext = createContext()



export const LayoutProvider = ({ children }) => {
  const [ activeTab, setActiveTab ] = useState("help")
  
  const [ width, height ] = useResize()
  const ratio = width / height
  const columns = ratio > 3/4

  return (
    <LayoutContext.Provider
      value ={{
        ratio,
        columns,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </LayoutContext.Provider>
  )
}