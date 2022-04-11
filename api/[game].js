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
    switch(req.body.type) {
      case events.JOIN_GAME:
        await insertGameEvent({
          ref: randomReference(),
          game_ref: req.query.game,
          type: req.body.type,
          sent_by: player,
          nickname: req.body.nickname,
        });
        res.status(303);
        res.setHeader('Location', `/play/${req.query.game}`);
        res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
        res.send(`Redirecting to /play/${req.query.game}`);
        return;
      case events.BEGIN_GAME:
        // return;
    }
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
