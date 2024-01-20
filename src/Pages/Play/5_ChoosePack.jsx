/**
 * src/Pages/ChoosePack.jsx
 */


import React from 'react'
import { MemberList } from './Components/MemberList'
import { PackList } from './Components/PackList'
import { RoomLink } from './Components/RoomLink'

export const ChoosePack = () => {
  return (
    <>
      <h1>Members</h1>
      <MemberList />
      <RoomLink />
      <PackList />
    </>
  )
}