/**
 * NavContext.jsx
 * description
 */

import React, { createContext } from 'react'

export const NavContext = createContext()

export const NavProvider = ({ children }) => {

  return (
    <NavContext.Provider
      value ={{
        
      }}
    >
      {children}
    </NavContext.Provider>
  )
}