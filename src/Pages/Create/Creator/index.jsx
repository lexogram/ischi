/**
 * src/Pages/Create/Creator/index.jsx
 */


import React, { useContext } from 'react'
import { LayoutContext } from '../../../Contexts'
import { TitleBar } from './Titlebar'
import { Panels } from './Panels'
import { Help } from './Help'


export const Creator = (props) => {
  const { ratio, columns, activeTab } = useContext(LayoutContext)


  const panel = (activeTab === "help")
    ? <Help />
    : <Panels />


  return (
    <div id="creator">
      <TitleBar />
      {panel}
    </div>
  )
}