/**
 * PrintPreview.jsx
 */


import React, {
  useContext,
  useEffect,
  useState
} from "react"
import { useNavigate } from "react-router-dom"
import { CreatorContext } from "../../Contexts"
import { Page } from "./Page"


let timeOut


export const Preview = () => {
  const navigate = useNavigate()
  const { cardData } = useContext(CreatorContext)


  // Divide the cards up into printable pages
  const pages = cardData.reduce(( pages, card ) => {
    let page = pages[0]
    if (page.length === 6) {
      page = []
      pages.unshift(page)
    }

    page.push(card)

    return pages
  }, [[]])

  // The pages have been unshifted in from the left. We should
  // reverse the order
  pages.reverse()

  // console.log("pages:", pages.map( page => page.length));
  // const sections = pages.slice(0,1).map(( page, index )=> (
  const sections = pages.map(( page, index )=> (
    <Page
      key={index}
      index={index}
      cards={page}
    />
  ))


  const dialogClosed = () => {
    navigate(-1)
  }


  useEffect(() =>{
    // Workaround for StrictMode: create a timeout to start
    // printing immediately after the component has rendered, but
    // StrictMode will dismount the component before it is
    // rendered so the first request for printing will be
    // cancelled before it is triggered.
    timeOut = setTimeout(() => {
      window.addEventListener('focus', dialogClosed, { once: true})
      window.print()
    }, 0)

    return () => {
      clearTimeout(timeOut)
    }
  }, [])


  return (
    <main>
     {sections}
    </main>
  )
}