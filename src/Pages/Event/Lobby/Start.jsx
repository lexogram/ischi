/**
 * src/Pages/Event/Lobby/Start.jsx
 */


import React from 'react'
import { StartButton } from '../StartButton'


export const Start = ({ emoji, room }) => {


  return (
    <div className="start">
      <StartButton
        $live={true}
        emoji="🎁" // "🍃","🍄","🍅","🍆","🍇","🍈","🍉","🍊","🍋","🍌", "🍍","🍎","🍏","🍐","🍑","🍒","🍓","🍔","🍕","🍖","🍗","🍘","🍙","🍚","🍛","🍜","🍝","🍞","🍟","🍠" "🍡","🍢","🍣","🍤","🍥","🍦","🍧","🍨","🍩","🍪", "🍫","🍬","🍭","🍮","🍯","🍰","🍱","🍲","🍳","🍴","🍵","🍶","🍷","🍸","🍹","🍺","🍻","🍼","🍽️","🍾","🍿","🎀","🎁","🎂","🎃""🍵","🍶","🍷","🍸","🍹","🍺","🍻","🍼","🍽️","🍾", "🐼"
      />
      <StartButton
        emoji={emoji}
      />
    </div>
  )
}