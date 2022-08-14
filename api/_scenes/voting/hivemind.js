import scientist from './scientist.js'

export default function(game_state) {
  return sbzInfectionHead() +
  autoRefresh(7) +
  fadeMessage('Ascending into madness...') +
  playerList(game_state['players']);
}
