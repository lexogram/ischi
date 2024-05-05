/**
 * src/Pages/Create/index.jsx
 */




import React, { useContext } from 'react'
import { CreatorContext } from '../../Contexts'
import { Header } from './Header'
import { Panels } from './Panels'
import { Help } from './Panels/Help'
import { Footer } from './Footer'


export const Creator = () => {
  const { activeTab } = useContext(CreatorContext)


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