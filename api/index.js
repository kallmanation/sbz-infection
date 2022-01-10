import { randomReference } from './_utils/references'

const faunadb = require('faunadb'), q = faunadb.query

module.exports = (req, res) => {
  // TODO: move events to a single place
  const newGameEvent = {
    game_ref: randomReference(),
    sent_by: randomReference(), // TODO: this should default to current cookie
    event_ref: randomReference(), // TODO: this should actually be sent by the form
    event_type: 'new_game',
    nickname: 'Hardcoded Test' // TODO: this should actually be sent by the form
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
    res.status(200).send(`<html><head><title>Creating Game</title></head><body>${JSON.strigify(response)}</body></html>`);
  });
};
