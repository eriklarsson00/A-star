import { requestChecker } from "./modelchecker.js";
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

function getActiveRequestsCommunity(req, res) {
  const community = req.params.community;

  if (isNaN(community)) {
    return res.status(400).json("Usage: /requests/:id. id has to be a number");
  }

  knex("Requests")
    .select("Requests.*")
    .leftJoin("Transactions", "Transactions.request_id", "Requests.id")
    .leftJoin(
      "CommunityListings",
      "CommunityListings.request_id",
      "Requests.id"
    )
    .where("Transactions.request_id", null)
    .andWhere("CommunityListings.community_id", community)
    .then((requests) => {
      res.json(requests);
    });
}

function getActiveRequests(req, res) {
  knex("Requests")
    .select("Requests.*")
    .leftJoin("Transactions", "Transactions.request_id", "Requests.id")
    .where("Transactions.request_id", null)
    .then((requests) => {
      res.json(requests);
    });
}

function getRequests(req, res) {
  knex("Requests")
    .select()
    .then((requests) => {
      res.json(requests);
    });
}

function getRequest(req, res) {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json("Usage: /requests/:id. id has to be a number");
  }

  knex("Requests")
    .select()
    .where("id", id)
    .then((requests) => {
      res.json(requests);
    });
}

function addRequest(req, res) {
  const body = req.body;
  const request = body ? body.request : undefined;
  const communities = body ? body.communities : undefined;

  if (!requestChecker(request))
    return res.status(400).json("Invalid request properties");

  let request_id = -1;
  knex("Requests")
    .insert(request)
    .catch((err) => {
      res.status(500).json(err);
      return;
    })
    .then((id) => {
      if (id !== undefined) res.json("Request inserted with id: " + id);
      request_id = id;
    })
    .then(() => {
      if (request_id == -1) return;
      const communityRequests = communities.map((community) => {
        return { community_id: community, request_id: request_id };
      });
      knex("CommunityListings")
        .insert(communityRequests)
        .catch((err) => console.log(err));
    });
}

function updateRequest(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (!requestChecker(body))
    return res.status(400).json("Invalid request properties");

  if (isNaN(id)) {
    return res.status(400).json("Usage: /request/:id. id has to be a number");
  }

  knex("Requests")
    .where("id", id)
    .update(body)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Request updated with id: " + id);
    });
}

function deleteRequest(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json("Usage: /requests/:id. id has to be a number");
  }

  knex("Requests")
    .where("id", id)
    .delete()
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Request has been removed");
    });
}

function getUserRequests(req, res) {
  const user = parseInt(req.params.id);

  if (isNaN(user)) {
    return res
      .status(400)
      .json("Usage: /requests/user/:id. id has to be a number");
  }

  knex("Requests")
    .select()
    .where("user_id", user)
    .catch((err) => {
      res.status(500).json(err);
    })
    .then((requests) => res.json(requests));
}

function getOtherRequestsCommunity(req, res) {
  let user = req.params.user;
  let communities = req.query.communities.split(",");

  knex("Requests")
    .select("Requests.*")
    .leftJoin("Transactions", "Transactions.request_id", "Requests.id")
    .leftJoin(
      "CommunityListings",
      "CommunityListings.request_id",
      "Requests.id"
    )
    .whereIn("CommunityListings.community_id", communities)
    .whereNot("Requests.user_id", user)
    .andWhere("Transactions.request_id", null)
    .groupBy("Requests.id")
    .then((requests) => {
      res.json(requests);
    });
}

export {
  getActiveRequestsCommunity,
  getActiveRequests,
  getRequests,
  getRequest,
  addRequest,
  updateRequest,
  deleteRequest,
  getUserRequests,
  getOtherRequestsCommunity,
};
