import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'
import { project_from_planetscale } from './_utils/game_projector'
import { readFile } from 'fs/promises'

export default async (req, res) => {
  // TODO: DRY player finding?
  const player = req.cookies.SbzPlayerRef || randomReference();

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
    res.send('I do not recognize you. Have a cookie.');
  }
};
