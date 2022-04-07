import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'

const faunadb = require('faunadb'), q = faunadb.query

module.exports = (req, res) => {
  // TODO: DRY player finding?
  const player = req.cookies.SbzPlayerRef || randomReference();
  // TODO: move events to a single place
  const newGameEvent = {
    game_ref: randomReference(),
    sent_by: player,
    event_ref: randomReference(),
    event_type: events.NEW_GAME,
    nickname: req.body.nickname
  };

  // TODO: move fauna to a single place
  const store = new faunadb.Client({ secret: process.env.FAUNA_DB_KEY, domain: 'db.us.fauna.com', keepAlive: false })
  const createP = store.query(
    q.Create(
      q.Collection('game_events'),
      { data: newGameEvent }
    )
  );

  createP.then((response) => {
    res.status(303)
       .setHeader('Location', `/api/${newGameEvent.game_ref}`)
       .setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`)
       .send(`Redirecting to /api/${newGameEvent.game_ref}`);
  });
};
