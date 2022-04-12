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
  const [scientists, infected] = split_scientists_from_infected(game_state);
  return sbzInfectionHead() +
    (infected.length > 0 ? playerList(infected, "Infected:") : "") +
    Object.keys(scientists).map((player) => {
      return gameForm([hiddenInput('infected', player)], events.CHOOSE_INFECTED, `Infect ${scientists[player]}`)
    }).join('');
}

function split_scientists_from_infected(game_state) {
  return Object.keys(game_state['players']).reduce((result, player) => {
    if(player === game_state['hivemind']) return result;
    const i = game_state['infected'].includes(player) ? 1 : 0;
    result[i][player] = game_state['players'][player];
    return result;
  }, [{}, {}]);
}
