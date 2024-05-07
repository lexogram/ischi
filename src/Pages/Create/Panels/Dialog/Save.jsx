/**
 * src/Pages/Create/Panels/Dialog/Save.jsx
 */


import React, { useContext, useEffect, useState } from 'react'
import { useTranslation, Trans } from 'react-i18next';
import { UserContext } from '../../../../Contexts'
import { CreatorContext } from '../../../../Contexts'
import { SAVEPACK } from '../../../../Constants'
import { Thumbnail } from './Thumbnail'

const URL_REGEX = /^http.*\//

let timeOut

export const Save = () => {
  const { t } = useTranslation()

  const { user } = useContext(UserContext)

  // Re-assemble the data for index.json
  const {
    total,
    customLayout,
    cropByDefault,
    turnConstraint,
    useSunburst,
    imageSources,
    layouts,
    cardData,
    // Saved in Pack record, not in index.json
    name,
    thumbnail,
    // Actions
    setThumbnail,
    setDialog
   } = useContext(CreatorContext)

  const jsonData = {
    total,
    customLayout,
    cropByDefault,
    turnConstraint,
    useSunburst,
    // don't add imageSources until they've been munged
    layouts,
    cardData
  }


  // "dots.... and    spaces" —> "dots._and_spaces"
  const munge = (string) => (
    string
     .replace(/\s+/g, "_")
     .replace(/\.+/g, ".")
  )


  // Thumbnail // Thumbnail // Thumbnail // Thumbnail //

  let thumbName

  const [ selected, setSelected ] = useState(() => (
    thumbnail || imageSources[0]
  ))

  const selectThumbnail = ({ target }) => {
    setSelected(imageSources[target.value])
  }

  const treatThumbnailBeforeSave = () => {
    console.log("selected thumbnail:", selected);
    // selected may be a string image file name or an object
    // if the pack is new, or if the user changed the thumbnail

    thumbName = (selected?.file?.name || selected?.source)

    console.log("before thumbName:", thumbName);

    if (thumbName) {
      // May be a full url for a previously saved pack, or an
      // originalFileName, with spaces and multiple dots. In
      // either case, convert it to a url-friendly name.
      thumbName = munge(thumbName.replace(URL_REGEX, ""))
    } else {
      thumbName = thumbnail
    }

    console.log("after thumbName:", thumbName);
    setThumbnail(selected)
  }


  // Other items // Other items // Other items // Other //
  const app = "ischi"
  const packName = name.toLowerCase().replace(/\s/g, "_")



  const cancel = () => {
    setDialog()
  }


  const save = () => {
    treatThumbnailBeforeSave()
    saveToServer()
    setDialog()
  }


  const createThumbnail = () => {
    setThumbnail(selected)
    setDialog()
  }


  const [ action, buttonName ] = user
    ? [ save, t("new.save") ]
    : [ createThumbnail, t("new.thumbnail") ]


  const saveToServer = () => {
    // Retain an ordered copy of just the new image files
    const images = imageSources
     .map(image => image.file)
     .filter(file => !!file)

    let nameMap = {}
    const mungedSources = imageSources.map( imageData => {
      // Clone the object, so that it the version used by the
      // app is not altered
      imageData = { ...imageData }

      if (imageData.file) {
        // This image has been imported locally. imageData.source
        // will be a blob. For index.json, replace the blob with
        // a url-friendly file name, and delete the File object
        // which has already been saved in images

        // console.log("imageData.file:", imageData.file);
        // lastModified: 1708077202000
        // name: "Богданов-Бельский Н.П. Портрет Ф.А. Вельца..jpg"
        // size: 2003254
        // type: "image/jpeg"
        // webkitRelativePath: ""

        const { name } = imageData.file
        const source = munge(name)
          // "Богданов-Бельский_Н.П._Портрет_Ф.А._Вельца.jpg"
        if (name !== source) {
          nameMap[name] = source
        }

        imageData.source = source
        delete imageData.file

      } else {
        // Remove the path, leaving just the file name
        imageData.source = imageData.source.replace(/^.*\//, "")
      }

      return imageData // now a cloned and modified version
    })

    jsonData.imageSources = mungedSources
    const packData = JSON.stringify(jsonData, null, ' ')
    nameMap = JSON.stringify(nameMap)

    const body = new FormData()
    body.append("app",      app)
    body.append("name",     name)
    body.append("packName", packName)
    body.append("nameMap",  nameMap)
    body.append("total",    total)
    body.append("packData", packData)
    body.append("thumbnail", thumbName)
    images.forEach( file => {
      body.append("images", file)
    })

    const options = {
      // The browser will create the correct headers for formData
      method: "POST",
      credentials: "include",
      body
    }

    fetch(SAVEPACK, options)
    .then(response => response.json())
    .then(json => callback(null, json))
    .catch(callback)

    function callback(error, json) {
      console.log(
        "UPLOAD\n error:", error,
        "\n json:", JSON.stringify(json, null, 2)
      );
    }
  }


  // // Prevent StrictMode from calling saveToServer twice
  // useEffect(() => {
  //   timeOut = setTimeout(saveToServer, 0)

  //   return () => clearTimeout(timeOut)
  // }, [])



  return (
    <>
      <h2><Trans
        i18nKey="new.save-pack"
        values={{ name }}
        defaults="Save {{name}}"
      /></h2>
      <Thumbnail
        selected={selected}
        selectThumbnail={selectThumbnail}
      />
      <div className="buttons">
        <button
          onClick={cancel}
        >
          {t("cancel")}
        </button>
        <button
          className="primary"
          onClick={action}
        >
          {buttonName}
        </button>
      </div>
    </>
  )
}