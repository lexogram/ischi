/**
 * src/Pages/Create/Creator/index.jsx
 */


import React, { useContext } from 'react'
import { CreatorContext } from '../../../Contexts'
import { Header } from './Header'
import { Panels } from './Panels'
import { Help } from './Panels/Help'
import { Footer } from './Footer'


export const Creator = (props) => {
  const { ratio, columns, activeTab } = useContext(CreatorContext)


  const panel = (activeTab === "help")
    ? <Help />
    : <Panels />


  return (
    <div id="creator">
      <Header />
      {panel}
      <Footer />
    </div>
  )
}