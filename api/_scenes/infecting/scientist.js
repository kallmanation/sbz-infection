import {
  sbzInfectionHead,
  autoRefresh,
  fadeMessage,
  playerList,
  gameForm,
} from '../../_utils/simple_html.js'

export default function(game_state) {
  // TODO: split players by scientist / hivemind
  return sbzInfectionHead() +
    autoRefresh(7) +
    fadeMessage('Infecting...') +
    playerList(game_state['players'], 'Scientists:');
}
