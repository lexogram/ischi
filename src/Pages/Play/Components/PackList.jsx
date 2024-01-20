/**
 * src/Components/PackList.jsx
 */


import React, { useContext } from 'react'
import { GameContext, WSContext } from '../../../Contexts'
import { PackCard } from './PackCard'


export const PackList = () => {
  const {
    packData,
    votes,
    usersVote,
    vote,
    select,
    delay
  } = useContext(GameContext)
  const { user_id, host_id, BASE_URL } = useContext(WSContext)

  const isHost = user_id === host_id

  const packList = packData.map( pack => (
    <PackCard
      key={pack.name}
      url={BASE_URL}
      pack={pack}
      votes={votes[pack.name]}
      isUsersChoice={pack.name === usersVote}
      canVote={!isHost}
      vote={() => vote(pack.name)}
      select={isHost && select}
      delay={delay}
    />
  ))

  return (
    <ul>{packList}</ul>
  )
}