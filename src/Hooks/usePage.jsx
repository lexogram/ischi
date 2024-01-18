/**
 * src/Hooks/usePage.jsx
 */


import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


export const usePage = () => {
  const usedLocation = useLocation() // triggers useEffect but...

  const showHere = (dontSet) => {
    // ... the built-in location actually provides access to .hash
    // perhaps because we're using HashRouter
    const hash = location.hash // "#/play/game"
    const page = (/#(\/\w+)/.exec(hash) || [])[1] || "/"

    if (dontSet) {
      return page
    }
    
    setPage(page);
  }

  const [ page, setPage ] = useState(() => showHere(true))

  useEffect(showHere, [usedLocation])

  return page
}