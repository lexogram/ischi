/**
 * src/Hooks/usePage.jsx
 *
 * Used by src/Menu/Panel.jsx. Provides the value of location.hash
 * without the # symbol, as "/page" or "/page/section".
 *
 * Panel.jsx compares the page to "/play", to decide whether the
 * menu should show the Play Actions. Section.jsx uses the page
 * to highlight the link to the current page.
 */


import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


export const usePage = () => {
  const usedLocation = useLocation() // triggers useEffect but...
  // console.log("usedLocation:", usedLocation);
  // {
  //   pathname: "/login",
  //   search: "",
  //   hash: "",
  //   state: null,
  //   key: "ercmy6ha"
  // }
  // for location = "http://127.0.0.1:5173/ischi/signup#/login"

  const showHere = (dontSet) => {
    // ... the built-in location actually provides access to .hash
    // perhaps because we're using HashRouter
    const hash = location.hash // "#/login"
    const page = (/#(\/\w+)/.exec(hash) || [])[1] || "/"
    // "/login" || "/"

    if (dontSet) {
      return page
    }

    setPage(page);
  }

  // On first render, set page to the current page, without
  // calling setPage
  const [ page, setPage ] = useState(() => showHere(true))

  // Call show here on first render and any time usedLocation
  // changes
  useEffect(showHere, [usedLocation])

  return page
}