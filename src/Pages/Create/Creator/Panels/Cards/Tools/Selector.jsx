/**
 * Selector.jsx
 */


import React from 'react'


export const Selector = ({ selection, selected, onChange }) => {
  const options = selection.map( value => (
    <option
      key={value}
      value={value}
    >
      {value.replace(/_/g, " ")}
    </option>
  ))

  return (
    <select
      value={selected}
      onChange={onChange}
    >
      {options}
    </select>
  )
}