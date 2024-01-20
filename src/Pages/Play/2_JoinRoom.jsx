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
import lock from '../../Assets/locked.png'
import unlocked from '../../Assets/unlocked.png'



export const JoinRoom = () => {
  const {
    joinRoom,
    errorStatus
  } = useContext(WSContext)
  // Check if this is a referral
  const { room: linkRoom, user } = useParams()  

  const [ user_name, setUserName ] = useState(user || "")
  const [ room, setRoom ] = useState(linkRoom || "")
  const [ create_room, setCreateRoom ] = useState(false)
  const [ locked, setLocked ] = useState(!!room)
  const [ disabled, setDisabled ] = useState(true)


  const focusRef = useRef()


  const updateName = ({ target }) => {
    const { name, value } = target
    if (name === "user_name") {
      setUserName(value)
      setDisabled(!value || !room)
    } else {
      setRoom(value)
      setDisabled(!value || !user_name)
    }
  }


  const toggleCreateRoom = () => {
    setCreateRoom(!create_room)
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
        className={locked ? "locked" : ""}
      >
        <input
          type="checkbox"
          id="create-room"
          name="create_room"
          checked={create_room}
          onChange={toggleCreateRoom}
          disabled={locked}
        />
        <span>Create a new room</span>
      </label>
      <p>{ errorStatus ? errorStatus : "" }</p>
      <button
        type="submit"
        disabled={disabled}
      >
        Join the Room
      </button>
    </form>
  )
}