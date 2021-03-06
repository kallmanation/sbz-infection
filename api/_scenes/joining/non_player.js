import { events } from '../../_utils/game_projector.js'
import {
  sbzInfectionHead,
  playerList,
  gameForm,
  textInput,
} from '../../_utils/simple_html.js'

export default function(game_state) {
  return sbzInfectionHead() +
  playerList(game_state['players']) +
  gameForm([textInput("Nickname:", "nickname")], events.JOIN_GAME, "Join");
}
