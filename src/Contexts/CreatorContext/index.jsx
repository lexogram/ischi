/**
 * CreatorContext.jsx
 *
 * description
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect
} from 'react'
import { UserContext } from '../UserContext'
import { reducer, initialState } from './Reducer'
import { useResize } from '../../Hooks/useResize'
import { usePage } from '../../Hooks/usePage'
import { GETPACKS, ISCHI } from '../../Constants'

const FETCH_OPTIONS = {
  headers: { "Content-Type": "application/json" },
  method: "POST",
  credentials: "include"
}



export const CreatorContext = createContext()



export const CreatorProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    // Data to save
    customLayout,
    turnConstraint,
    useSunburst,
    cropByDefault,
    images,
    layouts,
    cardData,

    // // Author-time data
    total,
    imagesPerCard,
    // layoutNames,
    // layoutName,
    // cardNumber,

    // imageSet,
    // imageSets,

    // tweakIndices,
    // activeImage,

    // showSaveDialog
  } = state

  // <<< Required for switching packs
  const { user } = useContext(UserContext)
  const page = usePage()
  // >>>
  const [ packs, setPacks ] = useState({ name: "" })


  const [ activeTab, setActiveTab ] = useState("gallery")
  const [ dialog, setDialog ] = useState()

  const setCustomLayout = value => {
    dispatch({
      type: "SET_CUSTOM_LAYOUT",
      payload: value
    })
  }

  const setTurnConstraint = value => {
    dispatch({
      type: "SET_TURN_CONSTRAINT",
      payload: value
    })
  }

  const setUseSunburst = value => {
    dispatch({
      type: "SET_USE_SUNBURST",
      payload: value
    })
  }

  const setCropByDefault = value => {
    dispatch({
      type: "SET_CROP_BY_DEFAULT",
      payload: value
    })
  }

  const [ useDirectory, setUseDirectory ] = useState(false)

  // <<< HARD-CODED division of Creator into columns
  const [ width, height ] = useResize()
  const ratio = width / height
  const columns = ratio > 3/4
  // HARD-CODED >>>


  const openPack = pack => {
    // {
    //   count:        <integec>,
    //   folder:       <string>,
    //   name:         <string>,
    //   owner_id:     <undefined | id string>,
    //   owner_type:   <"None", "Sampler", User, "Organization">,
    //   thumbnail:    "thumbnail.webp",
    //   last_updated: <date>,
    //   last_loadeed: <date>
    // }

    const owner = pack.owner_id ? `/${pack.owner_id}/` : "/"
    const folder = `${ISCHI}${owner}${pack.folder}`
    const url  = `${folder}/index.json`
    const path  = `${folder}/images`
    const options = { ...FETCH_OPTIONS, method: "GET" }

    const callback = (error, packData) => {
      if (error) {
        return console.log("openPack error:", error);
      }

      dispatch({
        type: "LOAD_PACK",
        payload: {
          packData,
          path
        }
      })
    }

    fetch(url, options)
    .then(response => response.json())
    .then(json => callback(null, json))
    .catch(callback)
  }


  const getUserPacks = () => {
    const callback = (error, packData) => {
      if (error) {
        return console.log("getUserPacks error:", error);
      }

      const [ name, owner, type ] = user
        ? user.organization
          ? [ user.username, user.organization, "organization" ]
          : [ user.username, user.username, "user" ]
        : []

      packData = packData.reduce(( result, pack ) => {
        if (pack.owner_type === "Sampler") {
          result.samplers.push(pack)
        } else {
          result.packs.push(pack)
        }

        return result
      }, { name, owner, type, packs: [], samplers: [] })

      setPacks(packData)

      // Display the most recently-used pack by default
      if (packData.packs.length) {
        openPack(packData.packs[0])
      } else {
        openPack(packData.samplers[0])
      }
    }


    if (page === "/create" && user?.username !== packs.name) {
      fetch(GETPACKS, FETCH_OPTIONS)
      .then(response => response.json())
      .then(json => callback(null, json.packs))
      .catch(callback)
    }
  }

  useEffect(getUserPacks, [page, user?.username])



  return (
    <CreatorContext.Provider
      value ={{
        // New for Creator
        ratio,
        columns,
        activeTab,
        setActiveTab,
        dialog,
        setDialog,

        // Legacy
        customLayout,
        setCustomLayout,
        turnConstraint,    // also new for Creator
        setTurnConstraint, // also new for Creator
        useSunburst,
        setUseSunburst,
        cropByDefault,
        setCropByDefault,

        imagesPerCard,
        total,
        images,
        cardData,
        layouts,
        // layoutNames,
        // layoutName,
        // setLayoutName,

        useDirectory,
        setUseDirectory,

        packs,
        openPack

        // addImages,
        // showSaveDialog,
        // toggleSaveDialog,
        // loadFrom,
        // setImagesPerCard,

        // imageSet,
        // imageSets,
        // setImageSet,

        // getURL,
        // getSunburstAngle,

        // VIEW_WIDTH,
        // VIEW_HEIGHT,
        // STROKE_WIDTH,
        // PADDING,
        // SPACING,
        // RADIUS,

        // swapImages,
        // clearImages,

        // tweakIndices,
        // showTweaker,
        // tweakImage,
        // activeImage,
        // setActiveImage,

        // tweakForLocalHost,
        // getHREF
      }}
    >
      {children}
    </CreatorContext.Provider>
  )
}