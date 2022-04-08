import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'
import { insertGameEvent } from './_utils/planetscale'

export default async (req, res) => {
  // TODO: DRY player finding?
  const player = req.cookies.SbzPlayerRef || randomReference();
  const ref = randomReference()

  const [rows, fields] = await insertGameEvent({
    ref,
    game_ref: ref,
    type: events.NEW_GAME,
    sent_by: player,
    nickname: req.body.nickname,
  });

  res.status(303);
  res.setHeader('Location', `/play/${ref}`);
  res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
  res.send(`Redirecting to /play/${ref}`);
};
