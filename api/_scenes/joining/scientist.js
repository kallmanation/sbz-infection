import { events } from '../_utils/game_projector.js'
import {
  sbzInfectionHead,
  autoRefresh,
  fadeMessage,
  playerList,
  gameForm,
} from '../_utils/simple_html.js'

export default function(game_state) {
  return sbzInfectionHead() +
  autoRefresh(7) +
  fadeMessage('Waiting for players to join...') +
  playerList(game_state['players'])
  gameForm([], events.BEGIN_GAME, "Ready")
}
