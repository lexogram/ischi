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

    importedFiles // array of new File objects that must be saved
    // showSaveDialog
  } = state

  // <<< Required for switching packs
  const { user } = useContext(UserContext)
  const page = usePage()
  // >>>
  const [ packs, setPacks ] = useState({ name: "" })


  const [ imagefiles, setImageFiles ] = useState([])
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
        images,
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

        imagefiles,    // images to be uploaded
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

        // VIEW_WIDTH,
        // VIEW_HEIGHT,
        // STROKE_WIDTH,
        // PADDING,
        // SPACING,
        // RADIUS,

        // swapImages,
        // clearImages,

        tweakIndices,
        showTweaker,
        tweakImage,
        activeImage,
        setActiveImage,

        // tweakForLocalHost,
        // getHREF
        importedFiles
      }}
    >
      {children}
    </CreatorContext.Provider>
  )
}