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



export const WSProvider = ({ children }) => {
  const [ socketIsNeeded, setSocketIsNeeded ] = useState(false)
  const [ socketIsOpen, setSocketIsOpen ] = useState(false)
  const [ socketError, setSocketError ] = useState("")
  const [ user_id, setUserId ] = useState()
  const [ user_name, setUserName ] = useState()
  const [ user_data, set_user_data ] = useState({})
  const [ room, setRoom ] = useState()
  const [ existing_room, setExistingRoom ] = useState(true)
  const [ errorStatus, setErrorStatus ] = useState(0)
  const [ members, setMembers ] = useState([])
  const [ host, setHost ] = useState()
  const [ host_id, setHostId ] = useState()
  const [ queuedMessages, setQueuedMessages ] = useState([])
  
  const socketRef = useRef(null)
  const socket = socketRef.current

  
  console.log("queuedMessages:", queuedMessages);
  console.log("socket:", socket);


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

    console.log("Message could not be sent:", message, reason)
  }


  const sendMessage = (message) => {
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


  const treatSystemMessage = data => {
    const { subject, recipient_id, content } = data

    switch (subject) {
      case "connection":
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
          console.log("About to restoreUserId. last_id", last_id);
          
          restoreUserId(last_id, recipient_id)
        
        } else {
          setUserId(recipient_id)
          storage.setItem("last_id", recipient_id)
        }
        return true

      case "user_id_restored": 
        return userIdRestored(recipient_id, content)

      case "existing_room":
        return setExistingRoom(content) // string or undefined

      case "room_joined":
        return treatStatus(content)

      case "room_members":
        return setRoomMembers(content)
    }
  }


  const restoreUserId = (last_id, temp_id) => {
    // The socket has only just been opened, and useState has
    // not had time to set socket to a socket object
    setQueuedMessages([{
      recipient_id: "system",
      sender_id: temp_id,
      subject: "restore_user_id",
      content: last_id
    }])
  }



  const userIdRestored = (user_id, content) => {
    setUserId(user_id)
    set_user_data(content)

    const { room, user_name } = content
    if (room) {
      joinRoom({ room, user_name }, user_id)
    }
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

    if (data.sender_id === "system") {
      return treatSystemMessage(data)
    }

    treatMessage(data)
  }


  const socketClosed = ({ wasClean }) => {
    const error = wasClean ? "" : "ERROR: Server is not responding."
    setSocketError(error)
    setSocketIsOpen(false)
    socketRef.current = null

    const timeNow = new Date().toTimeString().split(" ")[0]
    console.log(`Connection closed at ${timeNow} ${error}`)
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


  const joinRoom = ( content, sender_id ) => {
    const message = {
      sender_id: sender_id || user_id,
      recipient_id: "system",
      subject: "send_user_to_room",
      content // { user_name, room, create_room, ... }
    }

    const { user_name } = content
    setUserName(user_name)

    setQueuedMessages([message])
  }


  const leaveRoom = content => {
    const message = {
      recipient_id: "system",
      subject: "leave_room",
      content // { room }
    }

    sendMessage(message)
  }


  const sendQueuedMessages = () => {
    if (queuedMessages.length) {

      if (socketIsOpen) {
        queuedMessages.forEach(sendMessage)

        // Don't setQueuedMessages, so the queuedMessages remains
        // at the same address, and the useEffect won't be
        // triggered again until setQueuedMessages is called again
        queuedMessages.length = 0

      } else {
        console.log(
          "Queued messages can't be sent (no socket)\n",
          JSON.stringify(queuedMessages, null, '  ')
        )
      }
    }
  }


  useEffect(prepareToOpenSocket, [socketIsNeeded])
  useEffect(sendConnectionConfirmation, [user_id])
  useEffect(sendQueuedMessages, [socket, queuedMessages])


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