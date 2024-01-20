/**
 * src/Pages/ChoosePack.jsx
 */


import React from 'react'
import { MemberList } from './Components/MemberList'
import { PackList } from './Components/PackList'
import { GroupLink } from './Components/GroupLink'

export const ChoosePack = () => {
  return (
    <>
      <h1>Members</h1>
      <MemberList />
      <GroupLink />
      <PackList />
    </>
  )
}