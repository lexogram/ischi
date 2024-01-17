/**
 * useResize.jsx
 *
 * Use to trigger updates in your components when the window is
 * resized.
 * ---
 * import { useEffect, useState } from 'react'
 * import { useResize } from './path/to/useResize'
 *
 * export const TestResize = () => {
 *   const [ width, height ] = useResize()
 *   const [ count, setCount ] = useState(0)
 *
 *   useEffect(() => {
 *     setCount(count + 1)
 *   }, [width, height])
 *
 *   return <>
 *     <h1>
 *       Resized {count} times: width {width}, height {height}
 *     </h1>
 *   </>
 * }
 */


import { useState, useEffect } from "react"


export const useResize = () => {
  const [ size, setSize ] = useState([ 0, 0 ])

  const watchSize = () => {
    const resize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setSize([ width, height ])
    }
    window.addEventListener("resize", resize)
    resize()

    // Clean up
    return () => window.removeEventListener("resize", resize)
  }

  useEffect(watchSize, [])

  return size
}