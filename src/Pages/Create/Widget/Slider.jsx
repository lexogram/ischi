/**
 * Slider.jsx
 */


import React, { useRef, useEffect, useState } from "react"

export const Slider = ({
  max,
  min,
  value,
  precision=2,
  onDrag
}) => {
  const range = max - min
  const rangeRef = useRef()
  const thumbRef = useRef()
  const [ thumbLeft, setThumbLeft ] = useState(-100) // offscreen
  // const [ sliderValue, setSliderValue ] = useState(value)
  
  // const [ fraction, setFraction ] = useState(0)
  

  const placeThumb = () => {
    // Get the widths of the range element and the thumb
    const ranger = rangeRef.current
    const thumb = thumbRef.current
    const { width: rangeWidth } = ranger.getBoundingClientRect()
    const { width: thumbWidth } = thumb.getBoundingClientRect()

    // Find which fraction of the range width represents 100% of
    // the thumb movement
    const maxScroll = rangeWidth - thumbWidth
    const fraction = (value - min) / range
    // setFraction(fraction)

    const thumbLeft = fraction * maxScroll
    setThumbLeft(thumbLeft)
  }


  const rangeStyle = {
    textAlign: "left",
  }


  const thumbStyle = {
    position: "relative",
    // textAlign: "left",
    left: `${thumbLeft}px`
  }



  const checkKey = event => {

  }


  
  /**
   * Called when the user updates the number input directly
   *
   */
  const updateValue = event => {
    // setFraction(event.target.value)
    // onDrag(id, fraction)
  }


  const updateSlider = (fraction) => {
    const value = min + (range * fraction)
    onDrag(value)
  }


  const startDrag = event => {
    let clientX = event.clientX
    // The click could be on the .range div or the .thumb div. If
    // it's on the .range div, the thumb should jump to underneath
    // the mouse... and then start moving.
    let range = event.target
    let thumb = event.target
    let placeThumb = false

    if (thumb.classList.contains("range")) {
      thumb = thumb.querySelector(".thumb")
      placeThumb = true

    } else {
      range = range.closest(".range")
    }

    // Determine the dimensions of the range and the thumb
    const {
      x: revertX,
      width: thumbWidth
    } = thumb.getBoundingClientRect()
    const {
      x: minX,
      width: rangeWidth
    } = range.getBoundingClientRect()
    const maxScroll = rangeWidth - thumbWidth
    const maxX = minX + maxScroll

    const thumbX = (placeThumb)
      ? Math.max(minX, Math.min(clientX - thumbWidth/2, maxX))
      // Half a thumbWidth to the left of the mouse, if possible
      : revertX

    if (placeThumb) {
      const scrollX = thumbX - minX
      const fraction = scrollX / maxScroll
      updateSlider(fraction)
    }

    const offsetX = thumbX - clientX

    document.body.addEventListener("mousemove", drag)
    document.body.addEventListener("mouseup", stopDrag)


    function drag(event) {
      const dragX = event.clientX + offsetX
      const scrollX = Math.max(minX, Math.min(dragX, maxX)) - minX
      const fraction = scrollX / maxScroll
      updateSlider(fraction)
    }


    function stopDrag() {
      document.body.removeEventListener("mousemove", drag)
      document.body.removeEventListener("mouseup", stopDrag)
    }
  }


  useEffect(placeThumb, [value])


  return (
    <div className="slider">
      <input
        type="number"
        value={value.toFixed(precision)}
        onKeyDown={checkKey}
        onChange={updateValue}
      />
      <div
        className="range"
        style={rangeStyle}
        onMouseDown={startDrag}
        ref={rangeRef}
      >
        <div
          className="thumb"
          style={thumbStyle}
          ref={thumbRef}
        ></div>
      </div>
    </div>
  )
}