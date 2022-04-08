import { randomReference } from './_utils/references'
import { events } from './_utils/game_projector'

const mysql = require('mysql2/promise')

export default async (req, res) => {
  // TODO: DRY player finding?
  const player = req.cookies.SbzPlayerRef || randomReference();
  const ref = randomReference()

  // TODO: common DB
  const connection = await mysql.createConnection(`mysql://${process.env.PLANETSCALE_DB_USERNAME}:${process.env.PLANETSCALE_DB_PASSWORD}@${process.env.PLANETSCALE_DB_HOST}/${process.env.PLANETSCALE_DB}?ssl={"rejectUnauthorized":true}`);
  const [rows, fields] = await connection.execute(
    "INSERT INTO `game_events` (`ref`, `game_ref`, `type`, `sent_by`, `sent_at`, `data`) VALUES (?, ?, ?, ?, ?, ?)",
    [ref, ref, events.NEW_GAME, player, new Date(), { nickname: req.body.nickname }]
  );

  res.status(303);
  res.setHeader('Location', `/play/${ref}`);
  res.setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`);
  res.send(`Redirecting to /play/${ref}`);
};
