/**
 * src/Contexts/WSContext.jsx
 */


import storage from '../Utilities/storage'


import React, {
  createContext,
  useState,
  useEffect,
  useRef,
} from 'react'
import { HOSTNAME, PORT } from '../Constants'
import {
  addMessageListener,
  removeMessageListener,
  treatMessage
} from '../Utilities/messages'

let last_id = storage.getItem("last_id")


// Determine the URL to use for WebSocket
const SOCKET_URL = `wss://${HOSTNAME}${PORT}` // no trailing slash
const BASE_URL = `https://${HOSTNAME}${PORT}/`   // trailing slash


export const WSContext = createContext()

let render = 0 // for debugging


export const WSProvider = ({ children }) => {
  const renders = ++render

  const [ socketIsNeeded, setSocketIsNeeded ] = useState(false)
  const [ socketIsOpen, setSocketIsOpen ] = useState(false)
  const [ socketError, setSocketError ] = useState("")
  const [ user_id, setUserId ] = useState()
  const [ user_name, setUserName ] = useState()
  const [ user_data, set_user_data ] = useState({})
  const [ room, setTheRoom ] = useState()
  const [ existing_room, setExistingRoom ] = useState(true)
  const [ errorStatus, setErrorStatus ] = useState(0)
  const [ members, setMembers ] = useState([])
  const [ host, setHost ] = useState()
  const [ host_id, setHostId ] = useState()
  const [ queuedOutgoing, setQueuedOutgoing ] = useState([])
  const [ messagesToTreat, setMessagesToTreat ] = useState(0)




  const socketRef = useRef(null)
  const socket = socketRef.current
  const incomingRef = useRef([])
  // console.log(`WS (render ${renders}
  // incomingRef.current.length: ${incomingRef.current.length}
  // messagesToTreat: ${messagesToTreat}`)

  // console.log(`${renders}. queuedOutgoing: ${JSON.stringify(queuedOutgoing, null, 2)}, socketIsOpen: ${socketIsOpen}`)

  // console.log(`${renders}. room: ${room}`)


  const treatSystemMessage = (message) => {
    // const replacer = (key, value) => {
    //   if (key === "choices" || key === "emojis") {
    //     return `Array(${value.length})`
    //   }
    //   return value
    // }

    incomingRef.current = [ ...incomingRef.current, message ]

    setMessagesToTreat(messagesToTreat + 1)

    // console.log(`WS (render ${renders})
    // Incoming:  ${JSON.stringify(message, replacer, 2)}
    // messagesToTreat: ${messagesToTreat}`)
  }


  const treatQueuedIncoming = () => {
    incomingRef.current.forEach( treatIncoming )
    incomingRef.current.length = 0
    setMessagesToTreat(0)
  }


  const treatIncoming = (message) => {
    const { subject, recipient_id, content } = message

    switch (subject) {
      case "connection":
        return treatConnection(recipient_id)

      case "user_id_restored":
        return userIdRestored(recipient_id, content)

      case "existing_room":
        return setExistingRoom(content) // string or undefined

      case "room_joined":
        return treatStatus(content)

      case "room_members":
        return setRoomMembers(content)

      case "left_room":
        return exitRoom(content)

      case "room_closing":
        return roomClosing(content)
    }
  }


  const treatConnection = (recipient_id) => {
    // When it accepts a new connection request, WebSocket
    // server should send a message with the format:
    // { sender_id:    "system",
    //   subject:      "connection",
    //   recipient_id: <uuid>
    // }
    // This <uuid> should be used as the sender_id for all
    // future messages.
    if (last_id) {
      // This user logged in previously exchange the temporary
      // recipient_id for the previous user_id
      // console.log(`${renders}. last_id detected ${last_id}`);

      restoreUserId(last_id, recipient_id)

    } else {
      setUserId(recipient_id)
      storage.setItem("last_id", recipient_id)
    }

    return true
  }


  const restoreUserId = (last_id, temp_id) => {
    // console.log(`${renders}. About to restore ${last_id} (currently ${temp_id})`)

    // The socket has only just been opened, and useState has
    // not had time to set socket to a socket object
    setQueuedOutgoing([
      ...queuedOutgoing,
      {
        recipient_id: "system",
        sender_id: temp_id,
        subject: "restore_user_id",
        content: last_id
      }
    ])
  }



  const userIdRestored = (user_id, content) => {
    setUserId(user_id)
    set_user_data(content)

    const { room, user_name } = content
    if (room) {
      // joinRoom will trigger two methods on the server:
      // sendUserToRoom() in users.js, and setUserNameAndRoom()
      // in ischi.js.
      // sendUserToRoom() will reply with "room_joined" and then
      // "room_members".
      // setUserNameAndRoom() will reply with "votes" (if there
      // are any) and "gameData" (if there is a game in progress)
      // "gameData" will trigger loadGameData() in GameContext.
      joinRoom({ room, user_name }, user_id)
    }
  }


  const setRoom = room => {
    // console.log(`${renders}. Setting the room to ${room}`)

    setTheRoom(room)
  }


  const treatStatus = ({ status, room, host }) => {
    if (/-fail/.test(status)) {
      switch (status) {
        case "join-failed":
          status = `The room "${room}" does not exist yet.
          Did you mean to create it?`
          break
        case "create-failed":
          status = `The room "${room}" was created earlier by ${host}. Uncheck the checkbox above if you only meant to join it.`
      }

      setErrorStatus(status)

    } else {
      setErrorStatus(0)
    }
  }


  const setRoomMembers = ({
    room,
    members,
    host,
    host_id
  }) => {
  // console.log(`${renders}. WS setRoomMembers ${room}` )
    setRoom(room)
    setMembers(members)
    setHost(host)
    setHostId(host_id)
  }


  const messageNotSent = (message, sender_id) => {
    // Fail quietly?

    const reason = !socketIsOpen
      ? `WebSocket is closed ${typeof socket}${
          !sender_id ? "; no sender_id" : ""
        }`
      : `No sender__id ${sender_id}`

  // console.log("Message could not be sent:", message, reason)
  }


  const sendMessage = (message) => {
  // console.log(`WS (render ${renders})
  // About to sendMessage ${JSON.stringify(message, null, 2)}`)

    const sender_id = message.sender_id || user_id

    if (!socketIsOpen || !sender_id) {
      return messageNotSent(message, sender_id)
    }

    if (typeof message !== "object") {
      message = { message }
    }

    message.sender_id = sender_id

    message = JSON.stringify(message)

    // console.log("message:", message);

    socket.send(message)
  }


  const socketOpened = () => {
    setSocketIsOpen(true)
    setSocketError("")
  }


  const sendConnectionConfirmation = () => {
    if (user_id) {
      const timeNow = new Date().toTimeString().split(" ")[0]

      sendMessage({
        recipient_id: "system",
        sender_id: user_id,
        subject: "confirmation",
        content: `connected at ${timeNow}`
      })
    }
  }


  const socketMessage = ({data}) => {
    try {
      const json = JSON.parse(data)
      data = json
    } catch (error) {
      // Leave data as it is? Drop it silently?
      return
    }

    // if (data.sender_id === "system") {
    //   // This needs to call the function in the most recently
    //   // rendered scope
    //   return treatSystemMessage(data)
    // }

    treatMessage(data)
  }


  const socketClosed = ({ wasClean }) => {
    const error = wasClean ? "" : "ERROR: Server is not responding."
    setSocketError(error)
    setSocketIsOpen(false)
    socketRef.current = null

    const timeNow = new Date().toTimeString().split(" ")[0]
  // console.log(`Connection closed at ${timeNow} ${error}`)
  }


  const openSocket = () => {
    const socket = new WebSocket(SOCKET_URL);
    socket.onopen = socketOpened
    socket.onclose = socketClosed
    socket.onmessage = socketMessage

    socketRef.current = socket

    return () => { socket.close() }
  }


  const closeSocket = () => {
    socket.close()
  }


  const prepareToOpenSocket = () => {
    if (!socketIsNeeded) {
      return
    }

    // Don't create a WebSocket instance immediately, just in case
    // React.StrictMode is active during development. Instead,
    // create a timeout callback which will be triggered:
    // * After React has rendered this Context a second
    //   time in the same time frame, if StrictMode is active
    // * Before the next real render.
    //
    // If StrictMode _is_ active, React will unmount the Context
    // immediately, which will trigger a call to the clean-up
    // function below. This will happen after the first
    // double-render, and so openSocket() will not be triggered
    // as a result of the "strict" (unmounted) render.
    //
    // If StrictMode is _not_ active, or when the second (real)
    // render is called by StrictMode, the Context will _not_ be
    // unmounted, so the timeout will trigger the openSocket()
    // callback

    const timeOut = setTimeout(openSocket, 0)

    return () => {
      clearTimeout(timeOut)
    }
  }


  const requestSocketToOpen = () => {
    setSocketIsNeeded(true)
  }


  const getExistingRoom = content => {
    const message = {
      recipient_id: "system",
      subject: "get_existing_room",
      content // room
    }

    sendMessage(message)
  }



  /** joinRoom will trigger two methods on the server:
   *  sendUserToRoom() in users.js, and setUserNameAndRoom()
   *  in ischi.js.
   *  sendUserToRoom() will reply with "room_joined" and then
   *  "room_members".
   *  setUserNameAndRoom() will reply with "votes" (if there
   *  are any) and "gameData" (if there is a game in progress)
   *  "gameData" will trigger loadGameData() in GameContext.
  */
  const joinRoom = ( content, sender_id ) => {
    const message = {
      sender_id: sender_id || user_id,
      recipient_id: "system",
      subject: "send_user_to_room",
      content // { user_name, room, create_room, ... }
    }

    // user_name is required by Routes/Play.js to decide to stop
    // showing the JoinRoom dialog and move to the ShowPack page.
    const { user_name } = content
    setUserName(user_name)

    setQueuedOutgoing([ ...queuedOutgoing, message])
  }


  const leaveRoom = () => {
  // console.log(`${renders}. About to leaveRoom ${room}`)

    const message = {
      recipient_id: "system",
      subject: "leave_room",
      content: { room }
    }

    sendMessage(message)
  }


  const exitRoom = content => {
  // console.log(`${renders}. Received exitRoom ${content.room} (${room})`)

    if (room === content.room) {
      setRoom()
    }
  }


  const roomClosing = (content) => {
  // console.log(`${renders}. Received roomClosing ${content.room} (${room})`)

    if (room === content.room) {
      setRoom()
    }
  }


  const sendQueuedOutgoing = () => {
    if (queuedOutgoing.length) {

      if (socketIsOpen) {
        queuedOutgoing.forEach(sendMessage)

        // Don't setQueuedOutgoing, so the queuedOutgoing remains
        // at the same address, and the useEffect won't be
        // triggered again until setQueuedOutgoing is called again
        queuedOutgoing.length = 0

      } else {
        console.log(
          "Queued messages can't be sent (no socket)\n",
          JSON.stringify(queuedOutgoing, null, '  ')
        )
      }
    }
  }


  // MESSAGES // MESSAGES // MESSAGES // MESSAGES // MESSAGES //


  /**
   * addMessageListeners() is called on every single render,
   * because any incoming messages must have access to the scope
   * of the current render.
   * removeMessageListener() is therefore also called just before
   * the next render, to clear out listener callbacks that are no
   * longer valid.
   */
  const addMessageListeners = () => {
    const listeners = [
      { sender_id: "system", callback: treatSystemMessage }
    ]
    addMessageListener(listeners)

    return () => removeMessageListener(listeners)
  }


  useEffect(prepareToOpenSocket, [socketIsNeeded])
  useEffect(sendConnectionConfirmation, [user_id])
  useEffect(sendQueuedOutgoing, [socket, queuedOutgoing])
  useEffect(treatQueuedIncoming, [messagesToTreat])
  useEffect(addMessageListeners) // called on every render


  return (
    <WSContext.Provider
      value ={{
        BASE_URL,
        requestSocketToOpen,
        closeSocket,
        socketIsOpen,
        socketError,

        sendMessage,
        addMessageListener,
        removeMessageListener,

        user_id,
        user_name,
        user_data,
        room,
        existing_room,
        getExistingRoom,
        joinRoom,
        leaveRoom,
        members,
        host,
        host_id,
        errorStatus
      }}
    >
      {children}
    </WSContext.Provider>
  )
}