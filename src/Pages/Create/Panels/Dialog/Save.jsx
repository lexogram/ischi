/**
 * src/Pages/Create/Panels/Dialog/Save.jsx
 */


import React, { useContext, useEffect } from 'react'
import { CreatorContext } from '../../../../Contexts'

let timeOut

export const Save = () => {
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
    // Used for folder name, not saved in index.json
    name,
    packFolder
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

  const app = "ischi"
  const packName = name.toLowerCase().replace(/\s/g, "_")

  const saveToServer = () => {
    // Retain an ordered copy of just the new image files
    const images = imageSources
     .map(image => image.file)
     .filter(file => !!file)

    const nameMap = {}
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
        const source = name
          .replace(/\s+/g, "_")
          .replace(/\.+/g, ".")
          // "Богданов-Бельский_Н.П._Портрет_Ф.А._Вельца.jpg"
        if (name !== source) {
          nameMap[name] = source
        }

        imageData.file.source = source
        delete imageData.file

      } else {
        // Remove the path, leaving just the file name
        imageData.source = imageData.source.replace(/^.*\//, "")
      }

      return imageData // now a cloned and modified version
    })

    jsonData.imageSources = mungedSources
    const packData = JSON.stringify(jsonData, replacer, ' ')

    console.log("app:", app);
    console.log("packName:", packName);
    console.log("nameMap:", nameMap);
    console.log("packData", packData);
    console.log("images:", images);

    const body = new FormData()
    body.append("app",      app)
    body.append("packName", packName)
    body.append("nameMap",  nameMap)
    body.append("packData", packData)
    images.forEach( file => {
      body.append("images", file)
    })

    const options = {
      // The browser will create the correct headers for formData
      method: "POST",
      credentials: "include",
      body
    }

    fetch(UPLOAD_URL, options)
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


  // Prevent StrictMode from calling saveToServer twice
  useEffect(() => {
    timeOut = setTimeout(saveToServer, 0)

    return () => clearTimeout(timeOut)
  }, [])




  return (
    <h1>Save goes here</h1>
  )
}