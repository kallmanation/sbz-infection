import {
  sbzInfectionHead,
  autoRefresh,
  fadeMessage,
  playerList,
  gameForm,
} from '../../_utils/simple_html.js'

export default function(game_state) {
  const [players, hivemind] = split_scientists_from_hivemind(game_state);
  return sbzInfectionHead() +
    autoRefresh(7) +
    fadeMessage('Infecting...') +
    playerList(hivemind, 'Hivemind:') +
    playerList(players, 'Scientists:');
}

function split_scientists_from_hivemind(game_state) {
  return Object.keys(game_state['players']).reduce((result, player) => {
    const i = player === game_state['hivemind'] ? 1 : 0;
    result[i][player] = game_state['players'][player];
    return result;
  }, [{}, {}]);
}
