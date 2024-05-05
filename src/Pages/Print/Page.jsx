/**
 * Page.jsx
 */



import React, { useContext} from "react"
import { CreatorContext } from "../../Contexts";
import { Card } from "../Create/Panels/Cards/Card"



export const Page = ({ cards, index }) => {
  const {
    VIEW_WIDTH,
    VIEW_HEIGHT,
    STROKE_WIDTH,
    PADDING,
    SPACING,
    RADIUS,
    imagesPerCard
  } = useContext(CreatorContext)

  cards = cards.map(( card, cardIndex ) => {
    // console.log("card:", card);
    
    const cx = PADDING
             + (cardIndex % 2) * (VIEW_WIDTH - SPACING * 2)
             + RADIUS
    const cy = PADDING
             + (cardIndex % 3) * SPACING * 2
             + RADIUS
    const dimensions = { cx, cy, r: RADIUS }
    const uniqueIndex = index * imagesPerCard + cardIndex
    
    return (
      <Card
        key={"card_"+cardIndex}
        card={card}
        cardIndex={uniqueIndex}
        dimensions={dimensions}
        isPreview={true}
      />
    )
  })  
  

  return (
    <section id={`page-${index+1}`}>
      <svg
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"

        fill="none"
        strokeWidth={`${STROKE_WIDTH}`}
        stroke="black"
      >
        {cards}
      </svg>
    </section>
  )
}