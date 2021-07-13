import { randomReference } from './_utils/references'

module.exports = (req, res) => {
  const { game } = req.query;
  res.status(200).send(`Hello ${game} - ${new Date().toISOString()}!`);
};
