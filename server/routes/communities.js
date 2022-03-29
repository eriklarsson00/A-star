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

function addCommunity(req, res) {
  const body = req.body;
  knex("Community")
    .insert(body)
    .catch(() => {
      res.sendStatus(404);
    })
    .then((id) => {
      if (id !== undefined) res.json("Community inserted with id: " + id);
    });
}

function updateCommunity(req, res) {
  const id = req.params.id;
  const body = req.body;
  knex("Community")
    .where("id", id)
    .update(body)
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json(body);
    });
}

function deleteCommunity(req, res) {
  const id = req.params.id;
  knex("Community")
    .where("id", id)
    .del()
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then(() => {
      res.json("Community deleted");
    });
}

export { getCommunities, getCommunity, addCommunity, updateCommunity, deleteCommunity };
