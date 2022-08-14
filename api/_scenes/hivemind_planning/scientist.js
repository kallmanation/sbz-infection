export default function(game_state) {
  return sbzInfectionHead() +
  autoRefresh(7) +
  fadeMessage('Distorting reality...') +
  playerList(game_state['players']);
}
