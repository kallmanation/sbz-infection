import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'
import { insertGameEvent } from './_utils/planetscale'
import { project_from_planetscale } from './_utils/game_projector'
import { readFile } from 'fs/promises'

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

  const projection = project_from_planetscale(req.query.game);
  const head_template = readFile(`${__dirname}/_templates/head.html`);
  const game_state = await projection;

  const player_list = Object.values(game_state['players']).map((nickname) => `<li>${nickname}</li>`).join('');

  if (player in game_state['players']) {
    res.status(200);
    res.send(
      (await head_template).toString() +
      '<meta http-equiv="refresh" content="7">' +
      '<section class="fade-message"><h1>Waiting for players to join...</h1></section>' +
      '<h2>Players:</h2>' +
      `<ul>${player_list}</ul>` +
      `<form method="post"><input type="hidden" name="type" value="${events.BEGIN_GAME}" /><input type="submit" value="Ready" /></form>`
    );
  } else {
    res.status(200);
    res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
    res.send(
      (await head_template).toString() +
      '<meta http-equiv="refresh" content="7">' +
      `<form method="post"><label>Nickname:<input type="text" name="nickname" /></label><input type="hidden" name="type" value="${events.JOIN_GAME}" /><input type="submit" value="Join" /></form>`
    );
  }
};
