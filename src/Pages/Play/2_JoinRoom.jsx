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
    joinRoom,        // function
    existing_room,   // string or undefined
    getExistingRoom, // function
    errorStatus      // 0 or string message
  } = useContext(WSContext)
  // Check if this is a referral
  const { room: linkRoom, user } = useParams()

  // Initialize user_name and room from params, if available
  const [ user_name, setUserName ] = useState(user || "")
  const [ room, setRoom ] = useState(linkRoom || "")

  // Don't ask to create a room or teams unless the user says so
  const [ create_room, setCreateRoom ] = useState(false)
  const [ create_teams, setCreateTeams ] = useState(false)

  // Lock the room name and show a lock icon if room in params
  const [ locked, setLocked ] = useState(!!room)
  // Disable Create|Enter Room button by default. A useEffect
  // call to getExistingRoom() after the first render will trigger
  // updateDisabledState() if necessary.
  const [ disabled, setDisabled ] = useState(true)

  // Prevent creating a room if the param room name is active or
  // if there is no room name, or if this name already exist
  const cantCreate = locked || !room || !!existing_room
  // Only check the Create Room button if the user has chosen
  // to do so with a unique and valid room name
  const willCreate = create_room && !existing_room && room

  //   const replacer = (key, value) => {
  //     if (value instanceof Function) {
  //       return "[function]"
  //     }
  //     if (value === undefined) {
  //       return "undefined"
  //     }
  //     return value
  //   }
  //   console.log("JoinRoom:",JSON.stringify({
  //     joinRoom,
  //     getExistingRoom,
  //     existing_room,
  //     linkRoom,
  //     room,
  //     errorStatus,
  //     user_name,
  //     create_room,
  //     create_teams,
  //     locked,
  //     disabled,
  //     cantCreate,
  //     willCreate
  // }, replacer, "  "));



  // Prepare to focus on the user_name input
  const focusRef = useRef()


  // Called by the inputs with ids "user_name" and "room_name"
  const updateName = ({ target }) => {
    const { name, value } = target
    if (name === "user_name") {
      setUserName(value)
      setDisabled(!value || !room)

    } else { // id = "room_name", name = "room"
      setRoom(value)
      setDisabled(true) // until we've checked for a name clash

      // Get WSContext to ask the server if this room name exists
      getExistingRoom(value)
      // Component will be re-rendered when the reply is received
    }
  }


  // Called by useEffect when existing_room or create_room change
  const updateDisabledState = () => {
    if ( typeof existing_room === "string"
      && existing_room.toLowerCase() === room.toLowerCase()
       ) {
      // Respect the original case used for this room name
      setRoom(existing_room)
    }

    if (user_name) {
      if (room && (willCreate || cantCreate)) {
        // Enable the Create|Enter Room button if both user_name
        // and room are set, and the "create" state of the room
        // is clear (room doesn't exist and will be created, or
        // room does exist and so can't be created)
        setDisabled(false)
      }
    }
  }


  // Called by a click on the "closed lock icon". The lock can
  // only be unlocked; it can't be re-locked again.
  const unlock = ({ target }) => {
    target.src = unlocked
    setLocked(false)
  }


  // Called by the Create New Room checkbox. This is only active
  // if no `existing_room` with the name `room` exists
  const toggleCreateRoom = () => {
    setCreateRoom(!create_room)
    setDisabled(true) // so we check for name clash ???
  }


  const toggleCreateTeams = () => {
    setCreateTeams(!create_teams)
  }


  // Called by the form when the submit (Create The Room |
  // Enter The Room) button is pressed.
  const joinTheRoom = event => {
    event.preventDefault()

    const data = {
      user_name,
      room,
      create_room
    }

    // Tell WSContext to send the message "send_user_to_room"
    joinRoom(data);
  }


  // Called on first render only by useEffect
  const focusOn = () => {
    focusRef.current.focus()
  }


  useEffect(focusOn, [])
  // Trigger updateDisabledState() if room name is existing_room
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