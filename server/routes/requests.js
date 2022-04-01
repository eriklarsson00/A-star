import { requestChecker } from "./modelchecker";
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
  knex("Requests")
    .select()
    .where("id", id)
    .then((requests) => {
      res.json(requests);
    });
}

function addRequest(req, res) {
  const body = req.body;
  const request = body.request;
  const communities = body.communities;

  if (!requestChecker(request))
    return res.status(400).json("Invalid request properties");

  let request_id = -1;
  knex("Requests")
    .insert(request)
    .catch(() => {
      res.sendStatus(404);
      return;
    })
    .then((id) => {
      if (id !== undefined) res.json("Request inserted with id: " + id);
      request_id = id;
    })
    .then(() => {
      if (request_id == -1) return;
      communities.forEach((community) => {
        knex("CommunityListings").insert({
          community_id: community,
          request_id: request_id,
        });
      });
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
      res.json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Request has been removed");
    });
}

export {
  getActiveRequestsCommunity,
  getActiveRequests,
  getRequests,
  getRequest,
  addRequest,
  deleteRequest,
};
