import { events } from '../../_utils/game_projector.js'
import {
  sbzInfectionHead,
  autoRefresh,
  fadeMessage,
  playerList,
  gameForm,
} from '../../_utils/simple_html.js'

export default function(game_state) {
  const [scientists, infected, hivemind] = split_scientists_infected_and_hivemind(game_state)
  return sbzInfectionHead() +
    fadeMessage(`${game_state.winner} wins...`) +
    autoRefresh(30) +
    playerList(hivemind, "Hivemind:") +
    playerList(infected, "Infected:") +
    playerList(scientists, "Scientists:") +
    gameForm([], events.NEW_GAME, "Play Again");
}

function split_scientists_infected_and_hivemind(game_state) {
  return Object.keys(game_state['players']).reduce((result, player) => {
    let i = game_state['infected'].includes(player) ? 1 : 0;
    i = player === game_state['hivemind'] ? 2 : i;
    result[i][player] = game_state['players'][player];
    return result;
  }, [{}, {}, {}]);
}
