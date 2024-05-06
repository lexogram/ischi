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

const getImagesTotal = imagesPerCard => {
  return imagesPerCard * (imagesPerCard - 1) + 1
}

// PRINT DIMENSIONS //
const VIEW_WIDTH = 2100
const pageHeight = 2970
const STROKE_WIDTH = 1
// The height of the SVG element needs to be trimmed in order
// not to trigger the creation of an extra page.
const pageHeightTweak = 18 // margin of 1.8mm to fit paper
const VIEW_HEIGHT = pageHeight - pageHeightTweak

const RADIUS = 490
const PADDING = 2
const SPACING = RADIUS + PADDING



export const CreatorContext = createContext()



export const CreatorProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    // Data to save
    customLayout,
    turnConstraint,
    useSunburst,
    cropByDefault,
    imageSources,
    layouts,
    cardData,

    // // Author-time data
    name,
    total,
    imagesPerCard,
    packFolder,
    layoutNames,
    layoutName,
    cardNumber,

    // imageSet,
    // imageSets,

    tweakIndices,
    activeImage,

    packs,
    importedFiles // array of new File objects that must be saved
    // showSaveDialog
  } = state

  // <<< Required for switching packs
  const { user } = useContext(UserContext)
  const page = usePage()
  // >>>

  const [ imageFiles, setImageFiles ] = useState([])
  const [ activeTab, setActiveTab ] = useState("gallery")
  const [ dialog, setDialog ] = useState()


  const addImageFiles = newImageFiles => {
    setImageFiles([ ...imageFiles, ...newImageFiles])
  }


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

  const setCardNumber = value => {
    dispatch ({
      type: "SET_CARD_NUMBER",
      payload: value
    })
  }

  const setLayoutName = value => {
    dispatch({
      type: "SET_LAYOUT_NAME",
      payload: value
    })
  }

  const showTweaker = value => {
    dispatch({
      type: "SHOW_TWEAKER",
      payload: value
    })
  }

  const tweakImage = value => {
    dispatch({
      type: "TWEAK_IMAGE",
      payload: value
    })
  }

  const setActiveImage = value => {
    const action = {
      type: "SET_ACTIVE_IMAGE",
      payload: value
    }
    dispatch(action)
  }

  const addImages = imageFiles => {
    dispatch({
      type: "ADD_IMAGES",
      payload: imageFiles
    })
  }

  const setPacks = payload => {
    dispatch({
      type: "SET_PACKS",
      payload
    })
  }

  const newPack = payload => {
    dispatch({
      type: "NEW_PACK",
      payload
    })
  }

  const [ useDirectory, setUseDirectory ] = useState(false)

  // <<< HARD-CODED division of Creator into columns
  const [ width, height ] = useResize()
  const ratio = width / height
  const columns = ratio > 3/4
  // HARD-CODED >>>

  const setLineCount = () => {
    const lineCount = (() => {
      switch (imagesPerCard) {
        case 3:
        case 6:
        case 9:
          return 3
        case 4:
        case 8:
        case 12:
          return 4
        case 5:
        case 10:
          return 5
      }
    })()

    document.documentElement.style.setProperty(
      '--line-count', lineCount
    );
  }

  useEffect(setLineCount, [imagesPerCard])



  const openPack = pack => {
    // {
    //   count:        <integec>,
    //   folder:       <string>,
    //   name:         <string>,
    //   owner_type:   <"None", "Sampler", User, "Organization">,
    //   thumbnail:    "thumbnail.webp",
    //   last_updated: <date>,
    //   last_loadeed: <date>
    // }

    const { name, folder: packFolder } = pack
    const folder  = `${ISCHI}/${packFolder}`
    const url     = `${folder}/index.json`
    const path    = `${folder}/images`
    const options = { ...FETCH_OPTIONS, method: "GET" }

    const callback = (error, packData) => {
      if (error) {
        return console.log("openPack error:", error);
      }

      dispatch({
        type: "LOAD_FROM_JSON",
        payload: {
          name,
          packData,
          path,
          packFolder
        }
      })
    }

    fetch(url, options)
    .then(response => response.json())
    .then(json => callback(null, json))
    .catch(callback)
  }



  const getUserPacks = () => {
    if (page === "/create" && user?.username !== packs.name) {
      const callback = (error, packsData) => {
        if (error) {
          return console.log("getUserPacks error:", error);
        }

        // If the user has opted to stay logged in, the request
        // for packs/owned will send a JWT token identifying the
        // user before the request to /signedin returns a `user`
        // object. As a result, `user` will be undefined, but the
        // packData may contain custom packs. Ignore this for now;
        // the request for packs/owned will be repeated as soon as
        // the `user` object is set.
        if (packsData.length > 1 && !user?.username) {
          return // console.log("Waiting for user to be populated")
        }

        const [ name, owner, type ] = user
          ? user.organization
            ? [ user.username, user.organization, "Organization" ]
            : [ user.username, user.username, "User" ]
          : []

        packsData = packsData.reduce(( result, pack ) => {
          if (pack.owner_type === "Sampler") {
            result.samplers.push(pack)
          } else {
            result.packs.push(pack)
          }

          result.names.push(pack.name.toLowerCase())

          return result
        }, { name, owner, type, packs: [], samplers: [], names: [] })

        setPacks(packsData)

        // Display the most recently-used pack by default
        if (packsData.packs.length) {
          openPack(packsData.packs[0])
        } else {
          openPack(packsData.samplers[0])
        }
      }

      fetch(GETPACKS, FETCH_OPTIONS)
       .then(response => response.json())
       .then(json => callback(null, json.packs))
       .catch(callback)
    }
  }

  useEffect(getUserPacks, [page, user?.username])



  const getSunburstAngle = ({ cx, cy }, { offsetX, offsetY }) => {
    const x = cx + offsetX
    const y = cy + offsetY

    let angle = x || y
      ? (Math.atan(y / x) / Math.PI * 180) - 90
      : 0

    // Tweak for images on the left
    if (x < 0) {
      angle += 180
    }

    return angle
  }



  return (
    <CreatorContext.Provider
      value ={{
        // New for Creator
        name,         // to show as title
        ratio,        // aspect-ratio of viewport
        columns,      // true if both Gallery and Cards are showing
        activeTab,    // "gallery" | "cards" | "help"
        setActiveTab,
        dialog,       // "file" | "images" | "layout"
        setDialog,

        // Legacy
        customLayout,
        setCustomLayout,
        turnConstraint,    // true for upright or sunburst images
        setTurnConstraint,
        useSunburst,
        setUseSunburst,
        cropByDefault,
        setCropByDefault,

        imagesPerCard,
        total,
        imageSources,
        cardData,
        cardNumber,
        layouts,
        layoutNames,
        layoutName,
        setLayoutName,
        setCardNumber,

        useDirectory,
        setUseDirectory,

        packs,
        openPack,
        packFolder,

        imageFiles,    // images to be uploaded
        addImageFiles,
        setImageFiles,
        addImages,
        // showSaveDialog,
        // toggleSaveDialog,
        // loadFrom,
        // setImagesPerCard,

        // imageSet,
        // imageSets,
        // setImageSet,

        // getURL,
        getSunburstAngle,

        VIEW_WIDTH,
        VIEW_HEIGHT,
        STROKE_WIDTH,
        PADDING,
        SPACING,
        RADIUS,

        // swapImages,
        // clearImages,

        tweakIndices,
        showTweaker,
        tweakImage,
        activeImage,
        setActiveImage,

        // tweakForLocalHost,
        // getHREF
        getImagesTotal,
        newPack,

        importedFiles
      }}
    >
      {children}
    </CreatorContext.Provider>
  )
}