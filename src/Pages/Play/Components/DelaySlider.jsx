/**
 * src/Components/DelaySlider.jsx
 */


import React, { useRef, useEffect, useState } from 'react'
import { DELAY_ARRAY } from '../../../Constants'


export const DelaySlider = ({ delay, setDelay }) => {
  const rangeRef = useRef()
  const thumbRef = useRef()
  const [ thumbStyle, setThumbStyle ] = useState({})
  const [ text, setText ] = useState("")

  const steps = DELAY_ARRAY.length - 1


  function getScrollData() {
    const range = rangeRef.current
    const thumb = thumbRef.current

    const { left: rangeX, width } = range.getBoundingClientRect()
    const { left, width: thumbSize} = thumb.getBoundingClientRect()
    const styling = getComputedStyle(thumb, null)
    const borderL = styling.getPropertyValue('border-left-width')
    const borderR = styling.getPropertyValue('border-right-width')
    const borders = parseInt(borderL, 10)+ parseInt(borderR, 10)
    const maxScroll = width - thumbSize - borders

    return { thumbSize, maxScroll, rangeX, left }
  }


  const startDrag = event => {
    const { target, clientX: startX } = event
    const clickOnRange = target.className === "range"

    const {
      thumbSize,
      maxScroll,
      rangeX,
      left
    } = getScrollData(clickOnRange)

    const startScroll = (clickOnRange)
      ? Math.max(0, Math.min(
          startX - rangeX - thumbSize / 2,
          maxScroll
        ))
      : left - rangeX

    if (clickOnRange) {
      drag({ clientX: startX })
    }

    document.body.addEventListener("mousemove", drag)
    document.body.addEventListener("mouseup", drop)

    function drag({ clientX }) {
      const deltaX = clientX - startX
      let scroll = Math.max(0, Math.min(
        startScroll + deltaX, maxScroll
      ))

      const step = Math.round(scroll * steps / maxScroll)
      const ratio = step / steps
      scroll = maxScroll * ratio

      setThumbStyle({ left: scroll + "px" })
      setText(DELAY_ARRAY[step][1])
      setDelay(DELAY_ARRAY[step][0])
    }

    function drop() {
      document.body.removeEventListener("mousemove", drag)
      document.body.removeEventListener("mouseup", drop)
    }
  }


  const setThumbScroll = () => {
    const index = DELAY_ARRAY.findIndex( a => a[0] === delay )
    const ratio = index / steps
    const text = DELAY_ARRAY[index][1]
    const { maxScroll } = getScrollData()
    const scroll = maxScroll * ratio
    setThumbStyle({ left: scroll + "px" })
    setText(text)
  }


  useEffect(setThumbScroll, [delay])


  return (
    <div className="slider">
      <div
        className="range"
        onMouseDown={startDrag}
        ref={rangeRef}
      >
        <div
          className="thumb"
          ref={thumbRef}
          style={thumbStyle}
        />
      </div>
      <p className="delay">{text}</p>
      <input type="hidden" name="delay" value={delay} />
    </div>
  )
}