/**
 * UserContext.jsx
 *
 * Stores data on whether the current user is signed in, and where
 * to navigate to after successfully signing in.
 */

import React, {
  createContext,
  useState,
  useEffect
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  CONNECTION_PATH,
  SIGNEDIN,
  SIGNOUT
} from '../Constants'



export const UserContext = createContext()



export const UserProvider = ({ children }) => {
  // NOTE: <UserProvider> MUST be wrapped in a <Router> component.
  // If not useLocation() will not work
  const location = useLocation()
  const navigate = useNavigate()


  // If the user went directly to the /connection route when visiting
  // this site, then the Sign In page should navigate to
  // Home ("/") after a successful sign in. Otherwise it should
  // go to the page from which the link to the Sign In page was
  // made
  const [ goHome, setGoHome ] = useState(
    location.pathname === CONNECTION_PATH
  )
  // If the user visits another route before signing in, then that
  // is the route to go to after a successful sign-in.
  useEffect(() => {
    if (goHome && location.pathname !== CONNECTION_PATH) {
      setGoHome(false), [location.pathname]
    }
  })


  const [ user, setUser ] = useState()


  const autoSignIn = () => {
    const callback = (error, json) => {
      if (error) {
        console.log("AutoSignIn error:", error);
        setUser()
      } else {
        setUser(json.user)
      }
    }

    const options = {
      credentials: "include"
    }

    fetch(SIGNEDIN, options)
    .then(response => response.json())
    .then(json => callback(null, json) )
    .catch(callback)
  }

  useEffect(autoSignIn, [])


  const completeSignIn = (user) => {
    setUser(user)

    if (goHome) {
      navigate("/")
    } else {
      navigate(-1)
    }
  }


  const signOut = () => {
    const headers = { "Content-Type": "application/json" }
    const method = "POST"
    const options = {
      headers,
      method,
      credentials: "include"
    }

    fetch(SIGNOUT, options)
      .then(response => response.json())
      .then(() => setUser())
      .catch(error => console.log("error:", error))
  }


  return (
    <UserContext.Provider
      value ={{
        user,
        completeSignIn,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  )
}