/**
 * src/Pages/Create/Creator/Panels/Dialog/Images.jsx
 */


import React, { useContext, useState, useEffect } from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { CreatorContext } from '../../../../../Contexts'

const types = [
  "image/apng",
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp"
]
const accept = types.join(", ")
const REG_EXT = /\.\w+$/


export const Images = () => {
  const { t } = useTranslation()
  const { addImages } = useContext(CreatorContext)
  const {
    images,
    setImages,
    setDialog,
    useDirectory,
    setUseDirectory
  } = useContext(CreatorContext)
  const [ countMessage, setCountMessage ] = useState(
    "No images to import"
  )


  const importImages = () => {
    addImages(images)
    setImages([])
    setDialog()
  }

  const filePicker = useDirectory
  ? <input
      type="file"
      name="fileList"
      webkitdirectory="true"
      onChange={chooseFiles}
    />
  : <input
      type="file"
      name="fileList"
      accept={accept}
      multiple
      onChange={chooseFiles}
    />


  const toggleFolder = ({ target }) => {
    setUseDirectory(target.checked)
  }


  function chooseFiles({ target }) {
    let { files } = target
    files = Array.from(files).filter (
      data => types.indexOf(data.type) > -1
    )
    setImages(files) // will trigger updateCountMessage
  }


  const updateCountMessage = (count=images.length) => {
    const message = count
      ? <Trans
          i18nKey="import-count"
          values={{ count }}
        />
      : t("no-images-chosen")


    setCountMessage(message)
  }


  const thumbnails = images.map( file => {
    const src = URL.createObjectURL(file)
    const { name } = file
    const alt = name.replace(REG_EXT, "")

    return (
      <img
        key={name}
        src={src}
        alt={alt}
        title={alt}
      />
    )
  })


  const buttonName = <Trans
    i18nKey="import-button"
    values= {{
      count: images.length,
      s: images.length === 1 ? "" : "s"
    }}
  />

  useEffect(updateCountMessage, [images.length])

  return (
    <div className="file-picker">
      <h1>{t("images-title")}</h1>
      <label
        className="file"
      >
        {filePicker}
        <span className="button">
        {t("browse-button")}
        </span>
      </label>
      <label
        className="two-way"
      >
        <input
          type="checkbox"
          checked={useDirectory}
          onChange={toggleFolder}
        />
        <span className="pre">{t("separately")}</span>
        <span className="slot" />
        <span className="post">{t("by-folder")}</span>
      </label>
      <p>{countMessage}</p>
      <div>
        {thumbnails}
      </div>
      <button
        disabled={!images.length}
        onClick={importImages}
      >
        {buttonName}
      </button>
    </div>
  )
}