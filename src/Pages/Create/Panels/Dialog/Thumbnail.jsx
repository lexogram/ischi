/**
 * src/Pages/Create/Panels/Dialog/Thumbnail.jsx
 */


import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { CreatorContext } from '../../../../Contexts'

export const Thumbnail = ({ selected, selectThumbnail }) => {
  const { t } = useTranslation()

  const {
    imageSources
  } = useContext(CreatorContext)

  
  const imageList = imageSources.map(( imageData, index ) => {
    const { source, file } = imageData // crop, selfScale
    const fileName = (file?.name || source)
      .replace(/.*\//, "") // remove path

    const alt = fileName.replace(/\.\w+$/, "") // remove extension

    const checked = selected === imageData
                 || selected === fileName

    return (
      <label
        key={source}
      >
        <input
          type="radio"
          name="thumbnail"
          value={index}
          checked={checked}
          onChange={selectThumbnail}
        />
        <img
          src={source}
          alt={alt}
          title={alt}
        />
      </label>
    )
  })


  return (
    <>
      <h3>{t("new.thumbnail")}</h3>
      <div
        className="thumbnails"
      >
        {imageList}
      </div>
    </>
  )
}