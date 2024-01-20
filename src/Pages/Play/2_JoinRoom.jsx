/**
 * src/Pages/JoinRoom.jsx
 */


import React, {
  useContext,
  useState,
  useRef,
  useEffect
} from 'react'
import { useParams } from 'react-router-dom'
import { WSContext } from '../../Contexts'

import { TeamPicker } from './Components/TeamPicker'

import lock from '../../Assets/locked.png'
import unlocked from '../../Assets/unlocked.png'



export const JoinRoom = () => {
  const {
    joinRoom,
    existing_room,
    getExistingRoom,
    errorStatus
  } = useContext(WSContext)
  // Check if this is a referral
  const { room: linkRoom, user } = useParams()

  const [ user_name, setUserName ] = useState(user || "")
  const [ room, setRoom ] = useState(linkRoom || "")
  const [ create_room, setCreateRoom ] = useState(false)
  const [ create_teams, setCreateTeams ] = useState(false)

  const [ locked, setLocked ] = useState(!!room)
  const [ disabled, setDisabled ] = useState(true)

  const cantCreate = locked || !!existing_room || !room
  const willCreate = create_room && !existing_room && room


  const focusRef = useRef()


  const updateName = ({ target }) => {
    const { name, value } = target
    if (name === "user_name") {
      setUserName(value)
      setDisabled(!value || !room)
    } else {
      setRoom(value)
      setDisabled(true) // until we've checked for a name clash
      getExistingRoom(value)
    }
  }


  const updateDisabledState = () => {
    if ( typeof existing_room === "string"
      && existing_room.toLowerCase() === room.toLowerCase()
       ) {
      setRoom(existing_room)
    }

    if (user_name) {
      if (room && (willCreate || cantCreate)) {
        setDisabled(false)
      }
    }
  }


  const toggleCreateRoom = () => {
    setCreateRoom(!create_room)
    setDisabled(true) // so we check for name clash
  }


  const toggleCreateTeams = () => {
    setCreateTeams(!create_teams)
  }


  const joinTheRoom = event => {
    event.preventDefault()

    const data = {
      user_name,
      room,
      create_room
    }

    joinRoom(data);
  }


  const focusOn = () => {
    focusRef.current.focus()
  }


  const unlock = ({ target }) => {
    target.src = unlocked
    setLocked(false)
  }


  useEffect(focusOn, [])
  useEffect(() => getExistingRoom(room), [])
  useEffect(updateDisabledState, [existing_room, create_room])


  return (
    <form
      id="join-room"
      onSubmit={joinTheRoom}
    >
      <label htmlFor="user-name">
        <span>Choose a player name:</span>
        <input
          type="text"
          id="user-name"
          name="user_name"
          value={user_name}
          onChange={updateName}
          ref={focusRef}
        />
      </label>
      <label
        htmlFor="room-name"
        className={locked ? "locked" : ""}
      >
        <span>Choose a room:</span>
        <input
          type="text"
          id="room-name"
          name="room"
          value={room}
          onChange={updateName}
          readOnly={locked}
        />
        <img
          src={lock}
          alt="locked"
          onClick={unlock}
        />
      </label>
      <label
        htmlFor="create-room"
        className={cantCreate ? "locked" : ""}
      >
        <input
          type="checkbox"
          id="create-room"
          name="create_room"
          checked={willCreate}
          onChange={toggleCreateRoom}
          disabled={cantCreate}
        />
        <span>Create a new room</span>
      </label>

      <p>{ errorStatus ? errorStatus : "" }</p>

      { willCreate &&
        <label htmlFor="create-teams">
          <input
            type="checkbox"
            id="create-teams"
            name="create_teams"
            onChange={toggleCreateTeams}
            checked={create_teams}
          />
          <span>Create teams?</span>
        </label>
      }
      { create_teams && <TeamPicker /> }

      <button
        type="submit"
        disabled={disabled}
      >
        {willCreate ? "Create the Room" : "Enter the Room"}
      </button>
    </form>
  )
}