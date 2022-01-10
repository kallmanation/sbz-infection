import { randomReference } from './_utils/references'

const faunadb = require('faunadb'), q = faunadb.query

module.exports = (req, res) => {
  // TODO: move events to a single place
  const player = req.cookies.SbzPlayerRef || randomReference();
  const newGameEvent = {
    game_ref: randomReference(),
    sent_by: player,
    event_ref: randomReference(),
    event_type: 'new_game',
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
    // res.status(200).send(`Hello ${process.env.FAUNA_DB_KEY} -  ${JSON.stringify(response)} - ${JSON.stringify(newGameEvent)}!`);
    // res.status(200).send(`<html><head><title>Creating Game</title></head><body>${JSON.stringify(response)}</body></html>`);
    res.status(303)
       .setHeader('Location', `/api/${newGameEvent.game_ref}`)
       .setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`)
       .send(`Redirecting to /api/${newGameEvent.game_ref}`);
  });
};
