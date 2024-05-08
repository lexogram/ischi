/**
 * src/Pages/ChoosePack.jsx
 */


import React, { useContext } from 'react'
import { WSContext } from '../../Contexts'


import { MemberList } from './Components/MemberList'
import { PackList } from './Components/PackList'
import { QRCode } from '../../Components/QRCode'


export const ChoosePack = () => {
  const { room } = useContext(WSContext)  
  const href = location.href.replace(/(?<=play).*/, "")
  const link = `${href}/${encodeURI(room)}`

  console.log("link:", link);
  

  return (
    <>
      <h1>Members</h1>
      <MemberList />
      <QRCode link={link}/>
      <PackList />
    </>
  )
}