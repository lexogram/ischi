/**
 * NavContext.jsx
 *
 *
 */

import React, { createContext, useState } from 'react'



export const NavContext = createContext()



export const NavProvider = ({ children }) => {
  const [ outletLeft, setOutletLeft ] = useState(0)

  return (
    <NavContext.Provider
      value ={{
        outletLeft,
        setOutletLeft
      }}
    >
      {children}
    </NavContext.Provider>
  )
}