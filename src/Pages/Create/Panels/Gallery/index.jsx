/**
 * src/Pages/Create/Panels/Gallery/index.jsx
 *
 * Arranges all the images available and any slots required for
 * the current card size that have not yet been filled by an
 * image.
 *
 * Image-slots are arranged in divs. The first parent divs hold
 * all the image-slots for a given preview card. The final div (if
 * there is one) will hold images that are extra to requirements.
 *
 * Each image slot is wrapped in two divs:
 * + The inner div.image is round and will detect if an image is
 *   dropped _on_ an image (to replace it). It also shows where
 *   the clipPath would cut off the image, if it is used.
 * + The outer div.slot is square, and shows whether that image is
 *   cropped
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../../Contexts'
import { StoreImage } from './StoreImage'


export const Gallery = () => {
  const {
    images,
    imagesPerCard,
    total,
    getURL,
    cropByDefault
  } = useContext(CreatorContext)

  /**
   * imageMapper creates a `store` array  from an array with with
   * EITHER the number of required slots for the current number of
   * images per card OR the number of images available, whichever
   * is greater.
   *
   * Each item in the `store` area will contain:
   * + A square div.slot
   * + A circular div.image
   * + [if available] an img element
   *
   * This will be one long array, not yet divided up into cards.
   */
  const imageMapper = (_, index) => {
    const display = images[index]

    if (!display) {
      // If there is no image (neither File object nor string URL)
      // create an empty div.
      // console.log("No display:", index);

      return (
        <StoreImage
          key={`empty_${index}`}
        />
      )
    }

    const { source, crop: imageCrop, selfScale } = display
    const crop = (imageCrop === 0)
      ? cropByDefault
      : imageCrop

    if (!source) {
      // If there is no image (neither File object nor string URL)
      // create an empty div.
      return (
        <StoreImage
          key={`empty_${index}`}
        />
      )
    }

    // source may be a File object with a `name` property with
    // just the name of the file (excluding the path) or a string
    // URL (which may include the path.) In the latter case, size
    // and lastModified will be undefined.
    const {
      name,
      size,
      lastModified
    } = typeof source === "object"
      ? source
      : { name: source.replace(/.*\//, "") }

    // Remove the extension after the final dot
    const trimmedName = name.replace(/\.\w+$/, "")
    // Use the function imported from Context to convert either
    // type of data to a usable value for src
    const src = source // getURL(source)

    // The first image (index === 0) will appear (in a different
    // place) on all the preview cards. Show it with a thin border
    // not a background
    const className = (index
      ? "square"
      : "square on-all-preview-cards"
    )

    const gapClass = (crop
      ? "gap crop"
      : "gap"
    )

    const key = size
      ? `${name}_${size}_${lastModified}`
      : name

    //
    return (
      <StoreImage
        key={key}
        className={className}
        gapClass={gapClass}
        src={src}
        name={trimmedName}
        index={index}
        crop={crop}
      />
    )
  }

  const slotCount = Math.max(total, images.length)
  const store = Array.from({length: slotCount}, imageMapper)
  const colours = [
    "yellow",
    "lime",
    "green",
    "teal",
    "cyan",
    "blue",
    "royal",
    "purple",
    "violet",
    "pink"
  ]

  // The first image (with its "image on-all-preview-cards" class)
  // will appear on every preview card. The remaining
  // (imagesPerCard-1) images will be divided into imagesPerCard
  // groups/divs, each representing a card. The firstImage will be
  // placed in a different position in each group
  //
  const firstImage = store.shift()

  const cards = []
  let ii = 0
  while (ii < imagesPerCard) { // = number of cards for an image
    // Grab the next group of unique images...
    const cardImages = store.splice(0, imagesPerCard-1)
    // ... and add the firstImage in the appropriate place
    cardImages.splice(ii, 0, firstImage)

    // Create a div with a distinctive colour as the parent for
    // all these `<div class="image ...">[<img .../>]</div>`
    // elements.
    const colour = colours[ii] || "grey"
    const className = `one-card ${colour}`
    const key = `card_${ii}`

    const cardDiv = (
      <div
        key={key}
        className={className}
      >
        {cardImages}
      </div>
    )
    cards.push(cardDiv)

    ii++
  }

  // If there are any images which were not assigned to a card,
  // show them at the end, in a div.extra. The images will be
  // made semi-transparent.
  const extra = images.length - total
  if (extra > 0) {
    cards.push(
      <h1
        key="unused"
      >
        {`+ ${extra} unused images`}
      </h1>
    )
    cards.push(
      <div
        key="extra"
        className="extra"
      >
        {store}
      </div>
    )
  }



  return (
    <div className="gallery">

      <div id="images-in-cards">
        {cards}
      </div>
    </div>
  )
}