/**
 * SizeChooser.jsx
 */


import React, { useContext } from 'react'
import { CreateContext } from '../../../../Contexts'

export const SizeChooser = () => {
  const {
    images,
    imagesPerCard,
    setImagesPerCard,
    total,
    clearImages
  } = useContext(CreateContext)
  

  const setPerCard = event => {
    const imagesPerCard = parseInt(event.target.id);
    setImagesPerCard(imagesPerCard)
  }

  const requires = (() => {
    const missing = total - images.length
    const status = missing ? missing / Math.abs(missing) + 1 : 1
    // 0 if no images missing; 1 if just right; 2 if more needed
    const className = [
      "too-many",
      "just-right",
      "add-more"
    ][status]

    const only = missing < 0 ? " only" : ""
    const addMore = missing > 0
      ? `, Add ${missing} more.)`
      : missing < 0
        ? `. The last ${-missing} will not be selected.)`
        : ")"
    const phrase =
      `(Requires${only} ${total} images in total${addMore}`

    return (
      <span
        className={className}
      >
        {phrase}
      </span>
    )
    })()

  const imagesPerCardArray = [3, 4, 5, 6, 8, 9, 10] //, 12]
  const radioButtons = imagesPerCardArray.map( perCard => (
    <label
      key={perCard}
      className="images-per-card"
      htmlFor={`${perCard}-per-card`}
    >
      <input
        type="radio"
        name="images-per-card"
        id={`${perCard}-per-card`}
        checked={perCard === imagesPerCard}
        onChange={setPerCard}
      />
      <span>{perCard}</span>
    </label>
  ))

  return (
    <div id="size-chooser">
      <span>Images per card: </span>
      
      <div>
        {radioButtons}
      </div>
      {requires}
      <button
        onClick={clearImages}
      >
        Clear
      </button>
    </div>
  )
}