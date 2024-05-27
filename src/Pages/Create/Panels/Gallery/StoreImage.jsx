/**
 * StoreImage.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../../Contexts'
import pin from '../../../../Assets/pin.svg'

const IS_FIRST_CLASS = /\bon-all-preview-cards\b/



export const StoreImage = ({ src, name, className, gapClass, index }) => {
  const {
    swapImages,
    tweakImage
  } = useContext(CreatorContext)

  const pinned = IS_FIRST_CLASS.test(className)

  const getDragIndex = event => {
    const dragIndex = event.dataTransfer.getData("text/plain")
    return parseInt(dragIndex, 10)
  }

  const ignoreSelf = event => {
    return index === getDragIndex(event)
  }

  const startDrag = event => {
    if (!index || pinned) {
      // Can't drag the first image or an empty slot
      return event.preventDefault()
    }

    const { target, dataTransfer } = event
    dataTransfer.setData("text/plain", index)

    // <<< HACK: If gap has a border, then no drag image is shown.
    // Remove the border while dragging and restore it after.
    const gap = target.querySelector(".gap")
    const img = target.querySelector("img:not(.pin)")
    gap.classList.add("dragging")
    img.classList.add("dragging")

    // The drop event will (probably) be on a different element.
    // Listen for dragend everywhere, and restore gap to what it
    // was. It may take a moment before dragend is called.
    document.body.addEventListener("dragend", () => {
      gap.classList.remove("dragging")
      img.classList.remove("dragging")
    }, { once: true })
    // HACK >>>
  }

  const dragEnter = event => {
    if (ignoreSelf(event)) {
      return
    }
    const { target } = event

    if (target.className === "circle"){
      event.target.parentNode.classList.add("hilite")
    }
  }

  const dragLeave = event => {
    if (ignoreSelf(event)) {
      return
    }

    const { target } = event

    if (target.className === "circle"){
      target.parentNode.classList.remove("hilite")
    }
  }

  const allowDrop = event => {
    if (ignoreSelf(event)) {
      return
    }
    event.preventDefault()
  }

  const drop = event => {
    // Received by the drop target
    const { target } = event

    if (target.className === "circle"){
      target.parentNode.classList.remove("hilite")
      const dragIndex = getDragIndex(event)

      swapImages({ dragIndex, dropIndex: index, name })
    }
  }


  const toggleCrop = () => {
    const type = "crop"
    tweakImage({ type, index })
  }


  return (
    <div
      className={className}
      draggable={!pinned}
      onDragStart={startDrag}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={allowDrop}
      onDrop={drop}
      onClick={toggleCrop}
    >
      <div
        className={gapClass}
      />
      <div className="circle"
      />

      {src && (<img
        src={src}
        alt={name}
        title={name}
      />)}

      { pinned && (<img
        src={pin}
        alt="pinned"
        className="pin"
      />)}
    </div>
  )
}