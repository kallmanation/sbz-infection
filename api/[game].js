import { randomReference } from './_utils/references.js'
import { events } from './_utils/game_projector.js'
import { insertGameEvent } from './_utils/planetscale.js'
import { project_from_planetscale } from './_utils/game_projector.js'
import render from './_scenes/render.js'

export default async (req, res) => {
  const player = req.cookies.SbzPlayerRef || randomReference();

  if (req.body?.type) {
    const ref = randomReference();
    const game_ref = req.query.game || ref;
    const common_data = {
      ref: ref,
      game_ref: game_ref,
      type: req.body.type,
      sent_by: player,
    };
    switch(req.body.type) {
      case events.NEW_GAME:
        await insertGameEvent({
          ...common_data,
          nickname: req.body.nickname,
        });
        break;
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
    res.setHeader('Location', `/play/${game_ref}`);
    res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
    res.send(`Redirecting to /play/${game_ref}`);
  } else {
    const game_state = await project_from_planetscale(req.query.game);
    res.status(200);
    res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
    res.send(render(game_state, player));
  }
};
