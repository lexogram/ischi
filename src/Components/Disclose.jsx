/**
 * src/Components/Disclose.jsx
 */


import React from 'react'


export const Disclose = ({ open }) => {
  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="currentColor"
    >
      <path
        transform-origin="16 16"
        transform={`rotate(${open ? "90" : "0" })`}
        d="M0 0 L32 16 L0 32Z"
      />
    </svg>
  )
}