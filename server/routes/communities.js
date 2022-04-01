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
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /communities/:id. id has to be a number");
  }

  knex("Communities")
    .select()
    .where("id", id)
    .then((communities) => {
      res.json(communities);
    });
}

function addCommunity(req, res) {
  const body = req.body;
  knex("Communities")
    .insert(body === {} ? null : body)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then((id) => {
      if (id !== undefined) res.json("Community inserted with id: " + id);
    });
}

function updateCommunity(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /communities/:id. id has to be a number");
  }

  knex("Communities")
    .where("id", id)
    .update(body)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Community updated with id: " + id);
    });
}

function deleteCommunity(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /communities/:id. id has to be a number");
  }

  knex("Communities")
    .where("id", id)
    .del()
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      res.json("Community deleted with id: " + id);
    });
}

export {
  getCommunities,
  getCommunity,
  addCommunity,
  updateCommunity,
  deleteCommunity,
};
