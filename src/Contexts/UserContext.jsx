/**
 * UserContext.jsx
 */

import React, { createContext, useState } from 'react'



export const UserContext = createContext()



export const UserProvider = ({children}) => {
  const [ idData, setIdData ] = useState({})
  // Before login | registration:
  // { name, email, password, role, remember, autoLogin }
  // After registration, before confirmation:
  // { [jwt,] [awaiting_confirmation,] email }
  //
  // After login:
  // { _id, name, role }


  return (
    <UserContext.Provider
      value ={{
        idData,
        setIdData
      }}
    >
      {children}
    </UserContext.Provider>
  )
 }
