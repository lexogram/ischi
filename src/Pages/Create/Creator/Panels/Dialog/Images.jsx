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


export const Images = (props) => {
  const { t } = useTranslation()
  const {
    imageFiles,     // images selected for upload
    setImageFiles,
    addImages, // upload
    setDialog,
    useDirectory,
    setUseDirectory,
    newPack
  } = useContext(CreatorContext)
  const [ countMessage, setCountMessage ] = useState(
    "No images to import"
  )

  const { count, total, packName } = props



  const close = () => {
    setImageFiles([])
    setDialog()
  }


  const createNewPack = () => {
    const payload = {
      name: packName,
      imagesPerCard: count,
      total,
      imageFiles
    }

    newPack(payload)
    close()
  }


  const importImages = () => {
    addImages(imageFiles)
    close()
  }


  const thumbnails = imageFiles.map( file => {
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


  const action = packName
    ? createNewPack
    : importImages


  const buttonName = packName
    ? <Trans
        i18nKey="new.create-pack"
        values={{ packName }}
        defaults='Create "{{packName}}"'
      />
    : <Trans
        i18nKey="import-button"
        values= {{
          count: imageFiles.length,
          s: imageFiles.length === 1 ? "" : "s"
        }}
      />


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
    setImageFiles(files) // will trigger updateCountMessage
  }


  const updateCountMessage = (count=imageFiles.length) => {
    const message = count
      ? <Trans
          i18nKey="import-count"
          values={{ count }}
        />
      : t("no-images-chosen")

    setCountMessage(message)
  }

  useEffect(updateCountMessage, [imageFiles.length])

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
        onClick={close}
      >
        {t("cancel")}
      </button>
      <button
        className="primary"
        disabled={!imageFiles.length}
        onClick={action}
      >
        {buttonName}
      </button>
    </div>
  )
}