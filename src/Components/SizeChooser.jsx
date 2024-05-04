/**
 * SizeChooser.jsx
 */


import React from 'react'
import { useTranslation, Trans } from 'react-i18next';



export const SizeChooser = (props) => {
  const { t } = useTranslation()
  const {
    images,           // array of all images available
    imagesPerCard,    // current setting
    setImagesPerCard, // function to set imagesPerCard
    total,            // exact number of images currently required
    adviceOnly,       // if true, don't show warnings
    getImagesTotal    // converts imagesPerCard to total images
  } = props


  const setPerCard = event => {
    const imagesPerCard = parseInt(event.target.value);
    setImagesPerCard(imagesPerCard)
  }


  const requires = () => {
    const missing = total - images.length
    const status = missing ? missing / Math.abs(missing) + 1 : 1
    // 0 if no images missing; 1 if just right; 2 if more needed
    const className = [
      "too-many",   // yellow-orange
      "just-right", // green
      "add-more"    // red
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
  }


  const advisory = () => {
    const required = getImagesTotal(imagesPerCard)
    return <Trans
      i18nKey="card.total-images"
      values={{ required }}
      defaults="Needs {{required}} images"
    />
  }


  const feedback = adviceOnly ? advisory() : requires()


  const imagesPerCardArray = [3, 4, 5, 6, 8, 9, 10] //, 12]
  const radioButtons = imagesPerCardArray.map( perCard => (
    <label
      key={perCard}
      className="images-per-card"
    >
      <input
        type="radio"
        name="images-per-card"
        value={perCard}
        checked={perCard === imagesPerCard}
        onChange={setPerCard}
      />
      <span>{perCard}</span>
    </label>
  ))


  return (
    <div className="size-chooser">
      <span>{t("card.images-per-card")}</span>
      <div className="radio-set">
        {radioButtons}
      </div>
      {feedback}
    </div>
  )
}