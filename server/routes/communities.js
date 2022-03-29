import { createRequire } from "module";
const require = createRequire(import.meta.url);

const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

function getCommunities(req, res) {
  knex("Communities")
    .select()
    .then((communities) => {
      res.json(communities);
    });
}

function getCommunity(req, res) {
  const id = req.params.id;
  knex("Communities")
    .select()
    .where("id", id)
    .then((communities) => {
      res.json(communities);
    });
}

export { getCommunities, getCommunity };
