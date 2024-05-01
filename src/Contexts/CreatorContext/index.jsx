/**
 * CreatorContext.jsx
 *
 * description
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react'
import { UserContext } from '../UserContext'
import { useResize } from '../../Hooks/useResize'
import { usePage } from '../../Hooks/usePage'
import { GETPACKS } from '../../Constants'



export const CreatorContext = createContext()



export const CreatorProvider = ({ children }) => {
  // <<< Required for switching packs
  const { user } = useContext(UserContext) 
  const page = usePage()
  const [ userName, setUserName ] = useState("") // not undefined
  // >>>
  const [ packs, setPacks ] = useState([])


  const [ activeTab, setActiveTab ] = useState("gallery")
  const [ dialog, setDialog ] = useState()

  const [ customLayout, setCustomLayout ] = useState(true)
  const [ turnConstraint, setTurnConstraint ] = useState(false)
  const [ turnOut, setTurnOut ] = useState(true)
  const [ defaultCrop, setDefaultCrop ] = useState(true)
  const [ images, setImages ] = useState([])

  const [ useDirectory, setUseDirectory ] = useState(false)

  // <<< HARD-CODED division of Creator into columns
  const [ width, height ] = useResize()
  const ratio = width / height
  const columns = ratio > 3/4
  // HARD-CODED >>>


  const getUserPacks = () => {
    const callback = (error, packs) => {
      if (error) {
        return console.log("getUserPacks error:", error);
      }

      console.log("packs:", packs);

      setPacks(packs)
      setUserName(user?.username)
    }


    if (page === "/create" && user?.username !== userName) {
      const headers = {
        "Content-Type": "application/json"
      }
      const method = "POST"
      const credentials = "include"

      const options = {
        headers,
        method,
        credentials,
      }

      fetch(GETPACKS, options)
      .then(response => response.json())
      .then(json => callback(null, json.packs))
      .catch(callback)
    }
  }

  useEffect(getUserPacks, [page, user?.username])


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