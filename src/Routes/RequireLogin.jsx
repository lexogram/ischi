/**
 * src/Routes/RequireLogin.jsx
 */

import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../Contexts';

export const RequireLogin = ({ children, redirectTo }) => {
  const { idData } = useContext(UserContext);
  
  // console.log("idData:", idData);
  // {}
  //   OR
  // { _id:             "FzJtDnE3yNmcbzGcb",
  //   name:            "James",
  //   role:            "teacher",
  //   email_confirmed: true
  // }
     
  return idData.role
       ? children
       : <Navigate to={redirectTo} />;
}


