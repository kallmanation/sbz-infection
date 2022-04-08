const mysql = require('mysql2/promise')

export const createConnection = async () => await mysql.createConnection(
  `mysql://${process.env.PLANETSCALE_DB_USERNAME}:${process.env.PLANETSCALE_DB_PASSWORD}@${process.env.PLANETSCALE_DB_HOST}/${process.env.PLANETSCALE_DB}?ssl={"rejectUnauthorized":true}`
);

export const insertGameEvent = async ({ ref, game_ref, type, sent_by, ...data }) => await (await createConnection()).execute(
  "INSERT INTO `game_events` (`ref`, `game_ref`, `type`, `sent_by`, `sent_at`, `data`) VALUES (?, ?, ?, ?, ?, ?)",
  [ref, game_ref, type, sent_by, new Date(), data]
);

export const selectGameEventsForGameRef = async (game_ref) => await (await createConnection()).execute(
  "SELECT * FROM `game_events` WHERE `game_ref` = ?",
  [game_ref]
);
