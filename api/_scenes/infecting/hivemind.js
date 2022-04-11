import { events } from '../../_utils/game_projector.js'
import {
  sbzInfectionHead,
  playerList,
  gameForm,
  hiddenInput,
  textInput,
  simpleSelect,
} from '../../_utils/simple_html.js'

export default function(game_state) {
  return sbzInfectionHead() +
    (game_state.infected.length > 0 ? playerList(game_state['players'], "Infected:") : "") +
    Object.keys(game_state['players']).map((player) => {
      return gameForm([hiddenInput('infected', player)], events.CHOOSE_INFECTED, `Infect ${players[player]}`)
    }).join('');
}
