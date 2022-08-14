import { events } from '../../_utils/game_projector.js'
import {
  sbzInfectionHead,
  playerList,
  gameForm,
  textInput,
  simpleSelect,
} from '../../_utils/simple_html.js'

export default function(game_state) {
  return sbzInfectionHead() +
  autoRefresh(30) +
  gameForm(
    [
      simpleSelect("Pick Hivemind:", "hivemind", game_state['players'], game_state['hivemind']),
      textInput("Infected Count", "infectedcount", game_state['config']['infected_count']),
      textInput("Task Count", "taskcount", game_state['config']['task_count']),
      simpleSelect("Majority Vote Elimination", "majorityvoteelim", { 'true': 'Eliminate on Majority Vote', 'false': 'Eliminate on Most Vote' }, JSON.stringify(game_state['config']['majority_vote_elimination'])),
    ],
    events.SET_CONFIG,
    "Start"
  );
}
