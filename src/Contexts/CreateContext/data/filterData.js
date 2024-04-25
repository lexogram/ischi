import input from './layout.json' assert { type: "json" }
import allSets from './shuffledSets.json' assert { type: "json" }
import allImages from './images.json' assert { type: "json" }

/* Incoming:

   { "<Size>" : {
       "<LayoutName>": {
         "sizes": {...}
         "circles": {
           "<key>": {
             cx, cy, r,
             ...
           },
           ...
         }
       }
     }
   }

   Outgoing:

   { "<Size>" : {
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


export const getSets = imageCount => {
  const setIndex = setLengths.findIndex(
    setLength => setLength > imageCount
  ) - 1

  const set = sets[setIndex]
  imageCount = setLengths[setIndex]

  return {
    sets: set,
    total: imageCount
  }
}


// IMAGES // IMAGES // IMAGES // IMAGES // IMAGES // IMAGES //

export const imageSets = Object.keys(allImages).sort()

export const getImageSet = setName => {
  return allImages[setName]
    .map( file => `${setName}/${file}`)
}


// CARDS & DISPLAY // CARDS & DISPLAY // CARDS & DISPLAY //

const getRandomItem = (array, random) => {
  return array[Math.floor(random() * array.length)]
}


export const createDisplay = (source) => {
  return {
    source,
    crop: 0,
    selfScale: 1 // not used yet
  }
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