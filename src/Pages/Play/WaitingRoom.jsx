/**
 * src/Pages/WaitingRoom.jsx
 */


import React from 'react'
import { MemberList } from '../../Components/MemberList'
import { PackList } from '../../Components/PackList'
import { GroupLink } from '../../Components/GroupLink'

export const WaitingRoom = () => {
  return (
    <>
      <h1>Members</h1>
      <MemberList />
      <GroupLink />
      <PackList />
    </>
  )
}