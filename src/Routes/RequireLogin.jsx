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
  // { username: "me",
  //   email:    "me@example.com",
  // }
     
  return idData.username
    ? children
    : <Navigate to={redirectTo} />;
}
