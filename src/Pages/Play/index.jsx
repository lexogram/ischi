/**
 * src/Pages/Play/index.jsx
 */

import { Connecting } from '../../Components/Connecting'
import { Disconnected } from '../../Components/Disconnected'
import { JoinRoom } from './2_JoinRoom'
import { TeamManagement } from './3_TeamManagement'
import { TeamMembers } from './4_TeamMembers'
import { ChoosePack } from './5_ChoosePack'
import { Game } from './6_Game'

const screens = {
  Connecting,
  Disconnected,
  JoinRoom,
  TeamMembers,
  TeamManagement,
  ChoosePack,
  Game
}

export default screens