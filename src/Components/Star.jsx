/**
 * src/Components/Star.jsx
 */


import React from 'react'


export const Star = ({
  votes,
  canVote,
  isUsersChoice,
  action
}) => {

  const [ fill, opacity ] = isUsersChoice
    ? [ "#fff", "1" ]
    : [ "#f90", "0.25" ]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200.2 190.9"
      width="32px"
      height="32px"
      onClick={action}
      className={canVote ? "button" : ""}
    >
      <g
        transform="translate(100.1 105)"
      >
        <path
          fill="#f90"
          opacity={opacity}
          d="
          M   0    -100
          L  29.4  -40.4
          L  95.1  -30.9
          L  47.5   15.4
          L  58.8   80.9
          L   0     50
          L -58.8   80.9
          L -47.5   15.4
          L -95.1  -30.9
          L -29.4  -40.4
          L   0   -100
          "
        />
        <path
          strokeWidth="10"
          stroke="#fc0"   
          strokeLinecap="round"
          d="
          M   0    -100
          L  29.4  -40.4
          m   0      0
          L  95.1  -30.9
          m   0      0
          L  47.5   15.4
          m   0      0
          L  58.8   80.9
          m   0      0
          L   0     50
          m   0      0
          L -58.8   80.9
          m   0      0
          L -47.5   15.4
          m   0      0
          L -95.1  -30.9
          m   0      0
          L -29.4  -40.4
          m   0      0
          L   0   -100
          "
        />
    
        <text
          y="12"
          fill={fill}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="100"
        >
          {votes}
        </text>
      </g>
    </svg>
  )
}