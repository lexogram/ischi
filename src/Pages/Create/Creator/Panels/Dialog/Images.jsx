/**
 * src/Pages/Create/Creator/Panels/Dialog/Images.jsx
 */


import React, { useContext, useState } from 'react'
import { CreateContext } from '../../../../../Contexts'

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
  const [ directory, setDirectory ] = useState(false)
  const [ files, setFiles ] = useState([])
  const [ countMessage, setcountMessage ] = useState(
    "No images selected"
  )


  const filePicker = directory
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
    setDirectory(target.checked)
  }


  function chooseFiles({ target }) {
    let { files } = target
    files = Array.from(files).filter (
      data => types.indexOf(data.type) > -1
    )
    setFiles(files)

    let count = files.length
    const one = count === 1
    count = count ? count : "No"
    setcountMessage(`${count} image${one ? "" : "s"} selected`)
  }


  const thumbnails = files.map( file => {
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


  const buttonName = `Import ${files.length || ""} images`


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
          checked={directory}
          onChange={toggleFolder}
        />
        <span className="pre">Choose separate images</span>
        <span className="slot" />
        <span className="post">Choose all images in one directory</span>
      </label>
      <p>{countMessage}</p>
      <div>
        {thumbnails}
      </div>
      <button
        disabled={!files.length}
        onClick={addImages}
      >
        {buttonName}
      </button>
    </div>
  )
}