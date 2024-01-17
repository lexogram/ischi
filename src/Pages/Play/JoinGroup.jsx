/**
 * src/Pages/JoinGroup.jsx
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



export const JoinGroup = () => {
  const {
    joinGroup,
    errorStatus
  } = useContext(WSContext)
  // Check if this is a referral
  const { group, user } = useParams()

  console.log("group:", group);
  console.log("user:", user);
  
  

  const [ user_name, setUserName ] = useState(user || "")
  const [ group_name, setGroupName ] = useState(group || "")
  const [ create_group, setCreateGroup ] = useState(false)
  const [ locked, setLocked ] = useState(!!group)
  const [ disabled, setDisabled ] = useState(true)


  const focusRef = useRef()


  const updateName = ({ target }) => {
    const { name, value } = target
    if (name === "user_name") {
      setUserName(value)
      setDisabled(!value || !group_name)
    } else {
      setGroupName(value)
      setDisabled(!value || !user_name)
    }
  }


  const toggleCreateGroup = () => {
    setCreateGroup(!create_group)
  }


  const joinTheGroup = event => {
    event.preventDefault()

    const data = {
      user_name,
      group_name,
      create_group
    }

    joinGroup(data);
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
      id="join-group"
      onSubmit={joinTheGroup}
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
        htmlFor="group-name"
        className={locked ? "locked" : ""}
      >
        <span>Choose a group:</span>
        <input
          type="text"
          id="group-name"
          name="group_name"
          value={group_name}
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
        htmlFor="create-group"
        className={locked ? "locked" : ""}
      >
        <input
          type="checkbox"
          id="create-group"
          name="create_group"
          checked={create_group}
          onChange={toggleCreateGroup}
          disabled={locked}
        />
        <span>Create a new group</span>
      </label>
      <p>{ errorStatus ? errorStatus : "" }</p>
      <button
        type="submit"
        disabled={disabled}
      >
        Join the Group
      </button>
    </form>
  )
}