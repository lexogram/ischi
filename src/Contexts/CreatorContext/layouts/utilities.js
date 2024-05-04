/**
 * src/Contexts/CreatorContext/data/cardUtilities.js
 * 
 * Exports:
 *   allLayouts()
 *     Returns a map of layouts, indexed by the number of images
 *     per card. 
 *     {
 *       <integer images-per-card> : {
 *         "<LayoutName>": {
 *           [ { cx, cy, r }, // placement of a circle on the card
 *           ...
 *           ]
 *         }
 *       }
 *     }
 *
 *   getSets(imageCount)
 *     Calculates the maximum number of images per card that can
 *     be used with the given number of images.
 *     Chooses the array of sets of image indices associated with
 *     that number of images per card.
 *     Returns adjusted imageCount as total to reflect 
 *     {
 *       sets: [[<integer card index, ... ], ...],
 *       total: imageCount
 *     }
 *
 *   createDisplay(source)
 *     Accepts a source object (created by an input:file element)
 *     and wraps it in an object with the format
 *        { source,  crop: 0, selfScale: 1}
 * 
 *   createCards()
 *     Chooses a predictably-random layout for each card, then
 *     places the set images for that card at a predictably-random
 *     rotation in its home position.
 *     [
 *       {
 *         "images": [
 *           {
 *             "imageIndex": 0,
 *             "specificScale": 1,
 *             "rotation": <0.0 - 360.0>,
 *             "offsetX": 0,
 *             "offsetY": 0,
 *             "zIndex": 0,
 *             "crop": 0
 *           }, ...
 *         ],
 *         "layoutName": <string layout name>,
 *         "cardScale": 1
 *       }, ...
 *     ]
 */



import input from './layouts.json' assert { type: "json" }
import allSets from './shuffledSets.json' assert { type: "json" }

/* input:

   { "<Size>" : {
       "<LayoutName>": {
         "sizes": {...} // used for editing the layout
         "circles": {
           "<LayoutName>": {
             cx, cy, r,
             ...
           },
           ...
         }
       }
     }
   }

   output:

   { <integer Size> : {
       "<LayoutName>": {
         [ { cx, cy, r },
         ...
         ]
       }
     }
   }
*/

const inputs = Object.entries(input)
// [[ "<Size>", <LayoutsMap> ], ... ]

export const allLayouts = inputs.reduce((output, [size, layoutMap]) => {
  size = parseInt(size, 10)
  const layouts = Object.entries(layoutMap)
  // [ "<LayoutName>", {..., circles: { <key>: <value>, ...}, ...}]

  output[size] = layouts.reduce(( sizeMap, [ name, {circles}]) => {
    if (typeof circles === "object") {
      const values = Object.values(circles)
      // [ { cx, cy, r, ... }, ... ]

      sizeMap[name] = values.map( data  => ({
          cx: data.cx,
          cy: data.cy,
          r : data.r,
          fill: data.fill || "none"
        })
      )
    }

    return sizeMap
  }, {})

  return output
}, {})



// SETS / SETLENGTH // SETS / SETLENGTH // SETS / SETLENGTH //

const sets = Object.values(allSets)
  .filter( value => Array.isArray(value))
  .sort(( a, b ) => a.length - b.length)


const setLengths = sets.map( set => set.length )
setLengths.push(9999)
// setLengths =    [ 7, 13, 21, 31, 57. 73, 91, 9999 ]
// images per card =  3, 4,  5,  6,  8.  9, 10 ]


export const getSets = totalImages => {
  const setIndex = setLengths.findIndex(
    setLength => setLength > totalImages
  ) - 1

  const set = sets[setIndex]
  const total = setLengths[setIndex]

  return {
    sets: set,
    total
  }
}


// CARDS & DISPLAY // CARDS & DISPLAY // CARDS & DISPLAY //

export const createDisplay = (source) => {
  const display = {
    crop: 0,
    selfScale: 1 // not used yet}
  }

  if (source instanceof File) {
    display.file = source
    source = URL.createObjectURL(source)
  }

  display.source = source

  return display
}



/**
 * Description placeholder
 *
 * @param {array}    array   of layout names
 * @param {function} random  lcg() function with a custom seed
 * @returns {string}         always returns the same "random"
 *                           string when called the nth time with
 *                           the same seeded "random" function
 */
const getRandomItem = (array, random) => {
  return array[Math.floor(random() * array.length)]
}


const fillCard = (imageIndices, layoutName, random) => {
  const images = imageIndices.map( imageIndex => ({
    imageIndex,
    specificScale: 1,
    rotation: random() * 360,
    offsetX: 0,
    offsetY: 0,
    zIndex: 0,
    crop: 0
  }))

  return {
    images,
    layoutName,
    cardScale: 1
  }
}


export const createCards = (
  total,
  layoutNames,
  random
) => {
  const { sets } = getSets(total)

  const cards = sets.map( imageIndices => {
    const layoutName = getRandomItem(layoutNames, random)
    return fillCard(imageIndices, layoutName, random)
  })
  
  return cards
}