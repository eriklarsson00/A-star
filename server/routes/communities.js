import { communityChecker } from "./modelchecker.js";
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
  knex
    .raw(
      "SELECT C.*, COUNT(CU.id) as members FROM Communities C " +
        "LEFT JOIN CommunityUser CU ON CU.community_id = C.id " +
        "GROUP BY C.id, CU.community_id"
    )
    .then((communities) => {
      res.json(communities[0]);
    });
}

function getCommunity(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /communities/:id. id has to be a number");
  }

  knex
    .raw(
      "SELECT C.*, COUNT(CU.id) as members FROM Communities C " +
        "LEFT JOIN CommunityUser CU ON CU.community_id = C.id " +
        "WHERE C.id =" +
        id +
        " GROUP BY CU.community_id"
    )
    .then((communities) => {
      res.json(communities[0]);
    });
}

function addCommunity(req, res) {
  const body = req.body;

  if (!communityChecker(body))
    return res.status(400).json("Invalid community properties");

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

  if (!communityChecker(body))
    return res.status(400).json("Invalid community properties");

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

function getCommunityMembers(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /communities/members/:id. id has to be a number");
  }

  knex
    .raw("SELECT COUNT(id) FROM CommunityUser WHERE community_id = " + id)
    .then((amount) => {
      res.json(amount[0]);
    });
}

export {
  getCommunities,
  getCommunity,
  getCommunityMembers,
  addCommunity,
  updateCommunity,
  deleteCommunity,
};
