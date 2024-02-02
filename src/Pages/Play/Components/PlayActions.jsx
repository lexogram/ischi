/**
 * src/Pages/Play/PlayActions.jsx
 * - [ ] Show link
 * - [ ] Leave room (return to Join Room)
 * - [ ] Assign host
 * - [ ] Show members + score
 * - [ ] Reset score (at the end of a game)
 */


import React from 'react'
import { Section } from '../../../Menu/Section';

const USER  = 0
const HOST  = 1
const TEAM  = 2
const ADMIN = 3


export const PlayActions = (props) => {

  const showLink = (event) => {
    console.log("showLink called:", event);
  }

  const showScore = (event) => {
    console.log("showScore called:", event);
  }

  const resetScore = (event) => {
    console.log("resetScore called:", event);
  }

  const leaveRoom = (event) => {
    console.log("leaveRoom called:", event);
  }

  const setHost = (event) => {
    console.log("setHost called:", event);
  }

  const createTeams = (event) => {
    console.log("createTeams called:", event);
  }

  const setTeamColours = (event) => {
    console.log("setTeamColours called:", event);
  }

  const setTeamSound = (event) => {
    console.log("setTeamSound called:", event);
  }

  const setUpVoting = (event) => {
    console.log("setUpVoting called:", event);
  }

  const level = ADMIN
  const items = [
    { text: "Share...",               callback: showLink,
      type: "play",  level: USER,     colour: "#060"}, 
    { text: "Show Scores",            callback: showScore,
      type: "play",  level: USER,     colour: "#060"},
    // Hide scores
    { text: "Reset Scores",           callback: resetScore,
      type: "play",  level: ADMIN,    colour: "#660"}, 
    { text: "Set Host...",            callback: setHost,
      type: "play",  level: HOST,     colour: "#660"},
    // Reclaim host
    { text: "Create Teams...",        callback: createTeams,
      type: "play",  level: ADMIN,    colour: "#660"},
    { text: "Set Voting Strategy...", callback: setUpVoting,
      type: "play",  level: ADMIN,    colour: "#660"},
    { text: "Set Team Colours...",    callback: setTeamColours,
      type: "play",  level: TEAM,     colour: "#630"},
    { text: "Set Team Sound...",      callback: setTeamSound,
      type: "play",  level: TEAM,     colour: "#630"},

    { text: "Leave Room",            callback: leaveRoom,
      type: "play",  level: USER,     colour: "#600"}, 
  ].filter( item => ( item.level <= level
                   && !(level === TEAM && item.level === HOST)
                    ))

  const actions = { 
    section: "play",
    title: "Actions",
    ...props, // { open, toggleOpen }
    items
  }

  return <Section {...actions} />
}