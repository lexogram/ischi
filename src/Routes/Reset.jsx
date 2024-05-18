/**
 * src/Routes/Reset.jsx
 */


import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Reset = () => {
  const navigate = useNavigate()
  localStorage.removeItem("ischi")

  const refresh = () => {
    navigate("/event/nevzorovyh/" )
  }

  return (
    <button
      className="primary"
      onClick={refresh}
    >
      Refresh the page
    </button>
  )
}