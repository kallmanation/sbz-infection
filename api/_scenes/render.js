function role(game_state, current_player) {
  if(game_state['hivemind'] === current_player) {
    return 'hivemind';
  } else if(current_player in game_state['players']) {
    return 'scientist';
  } else {
    return 'non_player';
  }
}

export default async function render(game_state, current_player) {
  const { default: renderer } = require(`./${game_state.phase}/${role(game_state, current_player)}.js`);
  return renderer(game_state);
}
