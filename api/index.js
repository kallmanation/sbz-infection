import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'

const faunadb = require('faunadb'), q = faunadb.query
const mysql = require('mysql2')

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

  const ref = randomReference()
  const connection = mysql.createConnection(process.env.PLANETSCALE_PRISMA_DATABASE_URL);
  connection.execute(
    "INSERT INTO `game_events` (`ref`, `game_ref`, `type`, `sent_by`, `sent_at`, `data`) VALUES (?, ?, ?, ?, ?, ?)",
    [ref, ref, events.NEW_GAME, player, new Date(), { nickname: req.body.nickname }],
    (err, rows, fields) => {
      if (err) throw err;

      res.send(rows)
    }
  );

  // TODO: move fauna to a single place
  // const store = new faunadb.Client({ secret: process.env.FAUNA_DB_KEY, domain: 'db.us.fauna.com', keepAlive: false })
  // const createP = store.query(
  //   q.Create(
  //     q.Collection('game_events'),
  //     { data: newGameEvent }
  //   )
  // );
  //
  // createP.then((response) => {
  //   res.status(303)
  //      .setHeader('Location', `/api/${newGameEvent.game_ref}`)
  //      .setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`)
  //      .send(`Redirecting to /api/${newGameEvent.game_ref}`);
  // });
};
