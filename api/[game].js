import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'
import { insertGameEvent } from './_utils/planetscale'
import { project_from_planetscale } from './_utils/game_projector'
import {
  sbzInfectionHead,
  autoRefresh,
  fadeMessage,
  playerList,
  gameForm,
  textInput,
} from './_utils/simple_html'

export default async (req, res) => {
  // TODO: DRY player finding?
  const player = req.cookies.SbzPlayerRef || randomReference();

  if (req.body?.type) {
    const common_data = {
      ref: randomReference(),
      game_ref: req.query.game,
      type: req.body.type,
      sent_by: player,
    };
    switch(req.body.type) {
      case events.JOIN_GAME:
        await insertGameEvent({
          ...common_data,
          nickname: req.body.nickname,
        });
        break;
      case events.BEGIN_GAME:
        await insertGameEvent(common_data);
        break;
      case events.SET_CONFIG:
        await insertGameEvent({
          ...common_data,
          hivemind: req.body.hivemind,
          infected_count: req.body.infectedcount,
          task_count: req.body.taskcount,
          majority_vote_elimination: req.body.majorityvoteelim,
        });
        break;
      case events.CHOOSE_INFECTED:
        await insertGameEvent({
          ...common_data,
          infected: req.body.infected,
        });
    }
    res.status(303);
    res.setHeader('Location', `/play/${req.query.game}`);
    res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
    res.send(`Redirecting to /play/${req.query.game}`);
    return;
  }

  const game_state = await project_from_planetscale(req.query.game);

  if (player in game_state['players']) {
    res.status(200);
    res.send(
      sbzInfectionHead() +
      autoRefresh(7) +
      fadeMessage('Waiting for players to join...') +
      playerList(game_state['players']) +
      gameForm([], events.BEGIN_GAME, "Ready")
    );
  } else {
    res.status(200);
    res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
    res.send(
      sbzInfectionHead() +
      playerList(game_state['players']) +
      gameForm([textInput("Nickname:", "nickname")], events.JOIN_GAME, "Ready")
    );
  }
};
