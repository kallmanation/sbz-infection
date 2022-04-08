import { randomReference } from './_utils/references'
import { project_from_planetscale } from './_utils/game_projector'

export default async (req, res) => {
  // TODO: DRY player finding?
  // const player = req.cookies.SbzPlayerRef || randomReference();

  // TODO: common DB
  // const connection = await mysql.createConnection(`mysql://${process.env.PLANETSCALE_DB_USERNAME}:${process.env.PLANETSCALE_DB_PASSWORD}@${process.env.PLANETSCALE_DB_HOST}/${process.env.PLANETSCALE_DB}?ssl={"rejectUnauthorized":true}`);
  // const [rows, fields] = await connection.execute(
  //   "SELECT * FROM `game_events` WHERE game_ref = ?",
  //   [req.query.game]
  // );

  const game_state = await project_from_planetscale(req.query.game);

  res.status(200);
  res.send(game_state);
};
