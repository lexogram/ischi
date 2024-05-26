/**
 * ImagesReducer.jsx
 *
 * Use useReducer when:
 * + The next state depends on the previous state
 * + The state is complex
 * + You want to keep business logic:
 *   + as a pure function
 *   + in a separate module
 * + You want to be able to test easily
 */





import {
  allLayouts,
  getSets,
  createDisplay,
  createCards
} from './layouts/utilities.js'

import { lcg } from '../../Utilities/lcg.js'

const IMAGE_REGEX = /\.(bmp|gif|jpe?g|png|tiff|webp)$/i

const getTotalFrom = imagesPerCard => (
  imagesPerCard * imagesPerCard - imagesPerCard + 1
)



const initialState =  {
  customLayout: false,
  turnConstraint: false,
  useSunburst: false,
  cropByDefault: false,
  useFileNames: false,
  alwaysUseFileNames: false,
  imageSources: [],
  layouts: {},
  cardData: [],
  layoutNames: [],
  cardNumber: 0,
  importedFiles: [],
  packs: {
    /*name, owner, type,*/
    packs: [], samplers: [], names: [], name: ""
  },
  thumbnail: ""
}
// (() => {
//   // Preload animals while developing
//   const state = setImageSet({
//       customLayout: false,
//       cropByDefault: false,
//       useUseSunburst: false,

//       imageSets,
//       cardNumber: 0,
//       tweakIndices: 0,
//       activeImage: false,
//       showSaveDialog: false
//   }, "111_Animals")

//   return setImagesPerCard( state, 6 )

//   // // Pack properties //
//   //  * Creator id
//   //  * Name
//   //    customLayout
//   //    cropByDefault
//   //    useUseSunburst
//   //
//   // // Image data
//   //    imageSources: { source, selfScale, crop }
//   //
//   //    layouts { <Name>: [ { cx, cy, r }, ... ], ... }
//   //
//   // // Card data //
//   //    cardData [ [ { imageIndex,
//   //                   specificScale,
//   //                   rotation,
//   //                   offsetX,
//   //                   offsetY,
//   //                   zIndex,
//   //                   applyUseSunburst,
//   //                   zIndex,
//   //                 }, ... <more placements on this card>
//   //               ], ... <more cards>
//   //             ]
//   //
//   // // Run-time data
//   //    total
//   //    imagesPerCard
//   //    layoutNames
//   //    layoutName,
//   //    imageSet
//   //    cardNumber
//   //
//   //    imageSet
//   //    imageSets
//   //
//   //    tweakIndices
//   //    activeImage
//   //
//   //    showSaveDialog
// })()



const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "SET_PACKS":
      return setPacks(state, payload)

    case "LOAD_FROM_JSON":
      return loadFromJSON(state, payload)

    case "NEW_PACK":
        return newPack(state, payload)

    case "ADD_IMAGES":
      return addImages(state, payload)

    case "SET_THUMBNAIL":
      return setThumbnail(state, payload)

    case "SET_IMAGES_PER_CARD":
      return setImagesPerCard(state, payload)

    case "SET_IMAGE_SET":
      return setImageSet(state, payload)

    case "SWAP_IMAGES":
      return swapImages(state, payload)

    case "CLEAR_IMAGES":
      return clearImages(state)

    case "SET_CUSTOM_LAYOUT":
      return setCustomLayout(state, payload)

    case "SET_TURN_CONSTRAINT":
      return setTurnConstraint(state, payload)

    case "SET_USE_SUNBURST":
      return setUseSunburst(state, payload)

    case "SET_CROP_BY_DEFAULT":
      return setCropByDefault(state, payload)

    case "SET_USE_FILENAMES":
      return setUseFileNames(state, payload)

    case "SET_ALWAYS_USE_FILENAMES":
      return setAlwaysUseFileNames(state, payload)

    case "TWEAK_IMAGE":
      return tweakImage(state, payload)

    case "SET_CARD_NUMBER":
      return setCardNumber(state, payload)

    case "SET_LAYOUT_NAME":
      return setLayout(state, payload)

    case "SHOW_TWEAKER":
      return showTweaker(state, payload)

    case "SET_ACTIVE_IMAGE":
      return setActiveImage(state, payload)

    // case "TOGGLE_SAVE_DIALOG":
    //   return toggleSaveDialog(state, payload)

    default:
      return {...state}
  }
}


function setPacks(state, packs) {
  // { name, owner, type, packs: [], samplers: [], names: [] }
  return { ...state, packs }
}


// TODO: SANITIZE payload.packData // SANITIZE payload.packDate //
const httpRegex = /^https?:\/\//
function loadFromJSON(state, payload) {
  let { name, packData, path, packFolder, thumbnail } = payload
  // { "Chess", {...}, `/.../images`, `<owner_id>/chess`}
  let {
    // customLayout,
    // cropByDefault,
    // turnConstraint,
    // useSunburst,
    imageSources,
    layouts,
    cardData
  } = packData

  const imagesPerCard = cardData[0].images.length
  const total = cardData.length
  const layoutNames = Object.keys(layouts)
  imageSources = imageSources.map( imageData => {
    // Provide the full url to the image
    const { source } = imageData
    if (!(httpRegex.test(source))) {
      imageData.source = `${path}/${source}`
    }
    return imageData
  })
  const cardNumber = 0

  return {
    ...state,
    ...packData,
    name,
    path,
    imageSources,
    imagesPerCard,
    total,
    cardNumber,
    layoutNames,
    packFolder,
    thumbnail
  }
}


function newPack( state, payload ) {
  const { packs } = state

  const { name, imagesPerCard, total, imageFiles } = payload

  // <<< Check for duplicate names
  const lowerCaseName = name.toLowerCase()
  if (packs.names.indexOf(lowerCaseName) < 0) {
    packs.names.push(lowerCaseName)
  }

  const duplicate = packs.packs.find( pack => pack.name === name)
  // >>>

  const { sets } = getSets(total)
  const layouts = allLayouts[imagesPerCard]
  const layoutNames = Object.keys(layouts)
  const cardData = createCards(
    total,
    layoutNames,
    lcg()
  )
  if (!duplicate) {
    packs.packs.push({
      name,
      total: imagesPerCard,
      ///<<< WON'T BE FINALIZED UNTIL THE PACK IS SAVED
      owner_type: packs.type // will be undefined for first pack
      // folder: "",
      // thumbnail: ""
      ///>>>
    })
  }

  state = {
    ...state,
    name,
    imagesPerCard,
    total,
    sets,
    layouts,
    layoutNames,
    cardData,

    path: "",
    packFolder: "",
    thumbnail: "",
    cardNumber: 0,
    imageSources: [],
    importedFiles: [],
    // Optimum liberties
    customLayout: true,
    turnConstraint: true, // \\
    useSunburst: false,   // // upright
    cropByDefault: true,

    packs
  }

  return addImages( state, imageFiles )
}


function addImages( state, imageFiles ) {
  let { imageSources, importedFiles } = state
  // console.log("addImages imageFiles:", imageFiles);
  // [ File {
  //     lastModified: <integer timestamp>,
  //     name: "image.ext",
  //     size: <integer>
  //     type: "",
  //     webkitRelativePath: "path/image.ext"
  //   }, ...
  // ]

  const filesToImport = []

  imageFiles = Array
    .from(imageFiles)
    // Check if an image with the same name and statistics has
    // already been added. There is a small chance of a false
    // match, if two different imageSources with the same name happen
    // to have exactly the same size and modification time.
    //
    // This only applies to files imported in this session,
    // because imageSources read from the server will not be included
    // in importedFiles
    .filter( imageFile => {
      const { lastModified, name, size, type } = imageFile

      // Ignore files that are not imageSources (like .DS_Store)
      if (!IMAGE_REGEX.test(name)) {
        return false
      }

      const match = importedFiles.find( file => (
           file.name         === name
        && file.lastModified === lastModified
        && file.size         === size
        && file.type         === type
      ))

      if (match) {
        return false
      }

      // BENIGN SIDE EFFECT: importedFiles may be updated later //
      filesToImport.push( imageFile )

      return true
    })
    .map( imageFile => createDisplay(imageFile))

  const imagesAdded = imageFiles.length
  if (imagesAdded) {
    imageSources = [ ...imageSources, ...imageFiles ]
    importedFiles = [ ...importedFiles, ...filesToImport ]

    state.status = `${imagesAdded} imageSources added`

  } else {
    state.status = "No imageSources added"
  }

  return { ...state, imageSources, importedFiles }
}


function setThumbnail(state, thumbnail) {
  const { name, packs } = state
  const pack = packs.packs.find( pack => pack.name === name)
  if (!pack) {
    // Probably Sampler pack
    return state
  }
  pack.thumbnail = thumbnail
  return { ...state, thumbnail }
}


function setImagesPerCard( state, imagesPerCard ) {
  const total = getTotalFrom(imagesPerCard)
  const layouts = allLayouts[imagesPerCard]
  const layoutNames = Object.keys(layouts)
  const cardData = createCards(
    total,
    layoutNames,
    lcg()
  )

  return {
    ...state,
    imagesPerCard,
    total,
    cardData,
    layoutNames,
    layouts
  }
}


// function setImages( state, imageSources, path ) {
//   imageSources = imageSources.map( imageData => {
//     // Provide the full url to the image
//     imageData.source = `${path}/${imageData.source}`
//   })

//   return {
//     ...state,
//     imageSources
//   }
// }


// function adoptLayouts( state, layouts, imagesPerCard ) {
//   // Include standard layouts as well as any custom layouts
//   // provide by the json file
//   layouts = { ...(allLayouts[imagesPerCard] || {}), ...layouts}
//   return { ...state,  layouts }
// }


// function setCardData( state, cardData ) {
//   return { ...state, cardData }
// }


// function setImageSet( state, imageSet ) {
//   const imageSources = getImageSet(imageSet) // [ <url>, ... ]
//     .map( source => createDisplay(source))
//   const { sets } = getSets(imageSources.length)
//   const imagesPerCard = sets[0].length

//   state = setImagesPerCard( state, imagesPerCard )

//   return {
//     ...state,
//     imageSources,
//     imageSet
//   }
// }



//!!! NOT IDEMPOTENT !!!  NOT IDEMPOTENT !!!  NOT IDEMPOTENT !!!//
function swapImages(state, {dragIndex, dropIndex}) {
  const { imageSources } = state
  const dragImage = imageSources[dragIndex]
  const dropImage = imageSources.splice(dropIndex, 1, dragImage)[0]
  // We now have two copies of dragImage, so we replace the
  // original with the dropImage that we just spliced out
  imageSources.splice(dragIndex, 1, dropImage)

  return { ...state, imageSources }
}


function clearImages(state) {
  return { ...state, imageSources: [] }
}


function setCustomLayout(state, customLayout) {
  return { ...state, customLayout }
}


function setTurnConstraint(state, turnConstraint) {
  return { ...state, turnConstraint }
}


function setUseSunburst(state, useSunburst) {
  return { ...state, useSunburst }
}


function setCropByDefault(state, cropByDefault) {
  return { ...state, cropByDefault }
}


function setUseFileNames(state, useFileNames) {
  return { ...state, useFileNames }
}


function setAlwaysUseFileNames(state, alwaysUseFileNames) {
  return { ...state, alwaysUseFileNames }
}


function tweakImage(state, payload) {
  switch (payload.type) {
    case "offset":
      return setOffset(state, payload)
    case "rotation":
      return setRotation(state, payload)
    case "scale":
      return setScale(state, payload)
    case "crop":
      return setCrop(state, payload)
  }
}


const setActiveImage = (state, activeImage) => {
  return { ...state, activeImage }
}


function setRotation( state, { value, cardIndex, slotIndex }) {
  const cardData = state.cardData[cardIndex]
  const imageData = cardData.images
  const specificData = imageData[slotIndex]
  specificData.rotation = value

  return { ...state }
}


function setOffset( state, { value, cardIndex, slotIndex }) {
  const cardData = state.cardData[cardIndex]
  const imageData = cardData.images
  const specificData = imageData[slotIndex]
  specificData.offsetX = value.offsetX
  specificData.offsetY = value.offsetY

  return { ...state }
}


function setScale( state, { value, cardIndex, slotIndex }) {
  const cardData = state.cardData[cardIndex]
  const imageData = cardData.images
  const specificData = imageData[slotIndex]
  specificData.specificScale = value

  return { ...state }
}


function setCrop (state, { cardIndex, slotIndex, index }) {
  const { cardData, imageSources } = state
  let imageData

  if (index === undefined) {
    // The call came from the Tweaker
    const imagesData = cardData[cardIndex].images
    const { imageIndex } = imagesData[slotIndex]
    imageData = imageSources[imageIndex]

  } else {
    // The call came from a StoreImage
    imageData = imageSources[index]
  }

  let crop = imageData.crop
  if (crop === 0) {
    crop = !state.cropByDefault
  } else {
    crop = !crop
  }
  imageData.crop = crop

  return { ...state }
}


function setCardNumber(state, cardNumber) {
  const { cardData } = state
  const card = cardData[cardNumber]
  if (!card) {
    return state
  }

  const { layoutName } = card
  return { ...state, cardNumber, layoutName }
}


function setLayout(state, layoutName ) {
  const { cardNumber, cardData } = state
  const dataForThisCard = cardData[cardNumber]
  dataForThisCard.layoutName = layoutName
  return { ...state, layoutName }
}


function showTweaker( state, tweakIndices ) {
  if (state.activeImage) {
    return state
  }

  return { ...state, tweakIndices }
}

// function toggleSaveDialog(state, showSaveDialog) {
//   return { ...state, showSaveDialog }
// }


export { initialState, reducer }
