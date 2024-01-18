/**
 * src/Hooks/useCircles.jsx
 */


import { useResize } from './useResize'


export const useCircles = (left=0) => {
  let [ width, height ] = useResize()
  width -= left

  let d
  let x = 0
  let y = 0

  if (width < height / 2) {
    d = width
    y = height / 2 - width
  } else if (height < width / 2) {
    d = height
    x = width / 2 - height
  } else {
    d = (width + height - Math.sqrt(2 * width * height))
  }
  const r = d * (Math.sqrt(2) - 1) / 2

  return { d, r, x, y }
}