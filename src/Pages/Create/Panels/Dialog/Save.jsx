/**
 * src/Pages/Create/Panels/Dialog/Save.jsx
 */


import React, { useContext, useEffect } from 'react'
import { CreatorContext } from '../../../../Contexts'

let timeOut

export const Save = (props) => {
  const { 
    count,
    customLayout,
    cropByDefault,
    turnConstraint,
    useSunburst,
    images,
    layouts,
    cardData
   } = useContext(CreatorContext)

  const saveData = {
    count,
    customLayout,
    cropByDefault,
    turnConstraint,
    useSunburst,
    images,
    layouts,
    cardData
  }


  const setSaveData = () => {

    // Retain an ordered copy of just the image files
    const filesToUpload = saveData.images.map(image => image.file)

    const imageNames = saveData.images.map( image => {
      // console.log("image.file:", image.file);
      // lastModified: 1708077202000
      // name: "Богданов-Бельский Н.П. Портрет Ф.А. Вельца..jpg"
      // size: 2003254
      // type: "image/jpeg"
      // webkitRelativePath: ""

      image = { ...image }

      if (image.file) {
        image.source = image.file.name
          .replace(/\s+/g, "_")
          .replace(/\.+/g, ".")
        delete image.file
      }

      return image
    })

    console.log("filesToUpload:", filesToUpload);
    console.log("imageNames:", imageNames);
    
    const replacer = (key, value) => {
      return value
    }
    
    console.log("saveData", JSON.stringify(saveData, replacer));
  }


  useEffect(() => {
    timeOut = setTimeout(setSaveData, 0)

    return () => clearTimeout(timeOut)
  }, [])
  
  


  return (
    <h1>Save goes here</h1>
  )
}