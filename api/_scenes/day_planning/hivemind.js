export default function(game_state) {
  return sbzInfectionHead() +
  autoRefresh(7) +
  fadeMessage('Waiting for scientists to number their days...') +
  playerList(game_state['players']);
}
