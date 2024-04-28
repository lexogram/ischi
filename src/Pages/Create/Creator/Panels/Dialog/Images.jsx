/**
 * src/Pages/Create/Creator/Panels/Dialog/Images.jsx
 */


import React, { useContext, useState, useEffect } from 'react'
import {
  CreateContext,
  LayoutContext
} from '../../../../../Contexts'

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
  const { addImages } = useContext(CreateContext)
  const {
    images,
    setImages,
    setDialog,
    useDirectory,
    setUseDirectory
  } = useContext(LayoutContext)
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
    const one = count === 1
    count = count ? count : "No"
    setCountMessage(`${count} image${one ? "" : "s"} to import`)
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


  const buttonName = `Import ${images.length || ""} images`

  useEffect(updateCountMessage, [images.length])

  return (
    <div className="file-picker">
      <h1>Import images</h1>
      <label
        className="file"
      >
        {filePicker}
        <span className="button">
          Browse Images...
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
        <span className="pre">Choose separate images</span>
        <span className="slot" />
        <span className="post">Choose contents of folder</span>
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