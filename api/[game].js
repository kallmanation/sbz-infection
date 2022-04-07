import { randomReference } from './_utils/references'

const faunadb = require('faunadb'), q = faunadb.query

module.exports = (req, res) => {
  // TODO: DRY player finding?
  const player = req.cookies.SbzPlayerRef || randomReference();
  // TODO: move fauna stuff to a single place
  const store = new faunadb.Client({ secret: process.env.FAUNA_DB_KEY, domain: 'db.us.fauna.com', keepAlive: false })
  // const createP = store.query(
  //   q.Get(
  //     q.Match(q.Index('index_game_ref'), req.query.game)
  //   )
  // );
  const createP = store.query(
    q.Map(
      q.Paginate(
        q.Match(q.Index('index_game_ref'), req.query.game)
      ),
      q.Lambda("X", q.Get(q.Var("X")))
    )
  );

  createP.then((response) => {
    res.status(200)
       .setHeader('Set-Cookie', `SbzPlayerRef=${player}; HttpOnly`)
       .json(response.data);
  });
};
