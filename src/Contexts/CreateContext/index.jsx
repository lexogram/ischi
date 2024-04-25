/**
 * Context.jsx
 */

import React, { createContext, useReducer, useEffect } from 'react'
import { reducer, initialState } from './Reducer'

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



export const CreateContext = createContext()



export const CreateProvider = ({ children }) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)
  const {
    // Data to save
    customLayout,
    cropByDefault,
    useSunburst,
    images,
    layouts,
    cardData,

    // Author-time data
    total,
    imagesPerCard,
    layoutNames,
    layoutName,
    cardNumber,

    imageSet,
    imageSets,

    tweakIndices,
    activeImage,

    showSaveDialog
  } = state



  const addImages = imageArray => {
    const action = {
      type: "ADD_IMAGES",
      payload: imageArray
    }
    dispatch(action)
  }


  const toggleSaveDialog = value => {
    const action = {
      type: "TOGGLE_SAVE_DIALOG",
      payload: value === true // may be an event or undefined
    }
    dispatch(action)
  }


  const loadFrom = (json) => {
    const action = {
      type: "LOAD_FROM_JSON",
      payload: json
    }
    dispatch(action)

    // --line-count will be updated in a useEffect so that
    // ImageStore is neat
  }


  const setImagesPerCard = value => {
    const action = {
      type: "SET_IMAGES_PER_CARD",
      payload: value
    }
    dispatch(action)

    // --line-count will be updated in a useEffect so that
    // ImageStore is neat
  }


  const setImageSet = value => {
    const action = {
      type: "SET_IMAGE_SET",
      payload: value
    }
    dispatch(action)
  }


  const swapImages = (indices) => {
    const action = {
      type: "SWAP_IMAGES",
      payload: indices
    }
    dispatch(action)
  }


  const clearImages = () => {
    const action = {
      type: "CLEAR_IMAGES"
    }
    dispatch(action)
  }


  const setCustomLayout = value => {
    const action = {
      type: "SET_CUSTOM_LAYOUT",
      payload: value
    }
    dispatch(action)
  }


  const setCropByDefault = value => {
    const action = {
      type: "SET_CROP_BY_DEFAULT",
      payload: value
    }
    dispatch(action)
  }


  const setSunburst = value => {
    const action = {
      type: "SET_SUNBURST",
      payload: value
    }
    dispatch(action)
  }


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


  const tweakImage = value => {
    const action = {
      type: "TWEAK_IMAGE",
      payload: value
    }
    dispatch(action)
  }


  const setActiveImage = value => {
    const action = {
      type: "SET_ACTIVE_IMAGE",
      payload: value
    }
    dispatch(action)
  }


  const setCardNumber = value => {
    const action = {
      type: "SET_CARD_NUMBER",
      payload: value
    }
    dispatch(action)
  }


  const setLayoutName = value => {
    const action = {
      type: "SET_LAYOUT_NAME",
      payload: value
    }
    dispatch(action)
  }


  const showTweaker = value => {
    const action = {
      type: "SHOW_TWEAKER",
      payload: value
    }
    dispatch(action)
  }


  const httpRegExp = /(https?:\/\/.*)/
  const tweakForLocalHost = url => {
    // Check for a url from somewhere on the Internet
    const match = httpRegExp.exec(url)
    if (match) {
      // Use just the remote address
      url = match[1]

    } else if (
       location.host.startsWith("127.0.0.1:")
    && !(url.startsWith("http"))
    ) {
      // We're working locally and Vite serves from /dobble-ischi/
      url = `http://127.0.0.1:10000/ischi/samples/${url}`
    }

    return url
  }


  const getURL = stringOrObject => {
    if (!stringOrObject) {
      return ""
    } else if (typeof stringOrObject === "string") {
      // <<< HACK for testing during development
      stringOrObject = tweakForLocalHost(stringOrObject)
      // console.log("stringOrObject:", stringOrObject);
      // HACK >>>

      return stringOrObject
    }

    return URL.createObjectURL(stringOrObject)
  }


  const getHREF = () => {
    const dataToSave = {
      creatorId: "blackslate",
      // total,
      // imagesPerCard,
      customLayout,
      cropByDefault,
      useSunburst,
      images,
      layouts,
      cardData
    }
    const json = JSON.stringify(dataToSave)
    const options = {type: 'application/json'}
    const blob = new Blob([ json ], options )
    const href = URL.createObjectURL(blob)

    return href
  }


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


  return (
    <CreateContext.Provider
      value ={{
        imagesPerCard,
        total,
        images,
        cardData,
        layouts,
        layoutNames,
        layoutName,
        setLayoutName,

        customLayout,
        setCustomLayout,

        cropByDefault,
        setCropByDefault,

        useSunburst,
        setSunburst,

        cardNumber,
        setCardNumber,

        addImages,
        showSaveDialog,
        toggleSaveDialog,
        loadFrom,
        setImagesPerCard,

        imageSet,
        imageSets,
        setImageSet,

        getURL,
        getSunburstAngle,

        VIEW_WIDTH,
        VIEW_HEIGHT,
        STROKE_WIDTH,
        PADDING,
        SPACING,
        RADIUS,

        swapImages,
        clearImages,

        tweakIndices,
        showTweaker,
        tweakImage,
        activeImage,
        setActiveImage,

        tweakForLocalHost,
        getHREF
      }}
    >
      {children}
    </CreateContext.Provider>
  )
}