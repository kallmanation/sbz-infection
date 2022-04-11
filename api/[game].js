import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'
import { insertGameEvent } from './_utils/planetscale'
import { project_from_planetscale } from './_utils/game_projector'
import { readFile } from 'fs/promises'

export default async (req, res) => {
  // TODO: DRY player finding?
  const player = req.cookies.SbzPlayerRef || randomReference();

  if (req.body.type) {
    switch(req.body.type) {
      case events.JOIN_GAME:
        await insertGameEvent({
          randomReference(),
          game_ref: req.query.game,
          type: req.body.type,
          sent_by: player,
          nickname: req.body.nickname,
        });
        return;
      case events.BEGIN_GAME:
        return;
    }
  }

  const projection = project_from_planetscale(req.query.game);
  const head_template = readFile(`${__dirname}/_templates/head.html`);
  const fade_message_template = readFile(`${__dirname}/_templates/fade_message.html`);
  const game_form_template = readFile(`${__dirname}/_templates/game_form.html`);
  const game_state = await projection;

  const player_list = Object.values(game_state['players']);

  if (player in game_state['players']) {
    res.status(200);
    res.send(
      (await head_template).toString() +
      (await fade_message_template).toString() +
      (await game_form_template).toString() +
      '<fade-message>Waiting for players to join...</fade-message>' +
      '<h2>Players:</h2>' +
      `<ul>${player_list}</ul>` +
      `<game-form><input slot="inputs" type="hidden" name="type" value="${events.BEGIN_GAME}" /><span slot="submit">Ready</span></game-form>`
    );
  } else {
    res.status(200);
    res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
    res.send(
      (await game_form_template).toString() +
      `<game-form><div slot="inputs"><label>Nickname:<input type="text" /></label><input type="text"<input type="hidden" name="type" value="${events.JOIN_GAME}" /></div><span slot="submit">Ready</span></game-form>`
    );
  }
};
