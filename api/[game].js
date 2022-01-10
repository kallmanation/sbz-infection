import { randomReference } from './_utils/references'

module.exports = (req, res) => {
  // TODO: move fauna stuff to a single place
  const store = new faunadb.Client({ secret: process.env.FAUNA_DB_KEY, domain: 'db.us.fauna.com', keepAlive: false })
  const createP = store.query(
    q.Get(
      q.Match(q.Index('index_game_ref'), req.query.game)
    )
  );

  createP.then((response) => {
    res.status(200).json(response.data);
  });
};
