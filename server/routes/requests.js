import { requestChecker } from "./modelchecker.js";
import { createRequire } from "module";
import { stdErrorHandler } from "./common.js";
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
  const communityId = req.params.community;

  if (isNaN(communityId)) {
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
    .andWhere("CommunityListings.community_id", communityId)
    .then(
      (requests) => {
        return res.json(requests);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getActiveRequests(req, res) {
  knex("Requests")
    .select("Requests.*")
    .leftJoin("Transactions", "Transactions.request_id", "Requests.id")
    .where("Transactions.request_id", null)
    .then(
      (requests) => {
        return res.json(requests);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getRequests(req, res) {
  knex("Requests")
    .select()
    .then(
      (requests) => {
        return res.json(requests);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getRequest(req, res) {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json("Usage: /requests/:id. id has to be a number");
  }

  knex("Requests")
    .select()
    .where("id", id)
    .then(
      (requests) => {
        return res.json(requests);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function addRequest(req, res) {
  const body = req.body;
  const request = body?.request;
  const communities = body?.communities;

  if (!requestChecker(request)) {
    return res.status(400).json("Invalid request properties");
  }

  let request_id;
  knex("Requests")
    .insert(request)
    .then(
      (id) => {
        res.json("Request inserted with id: " + id);
        request_id = id;
      },
      (err) => stdErrorHandler(err, res)
    )
    .then(
      () => {
        if (!request_id) {
          return;
        }

        const communityRequests = communities.map((community) => {
          return { community_id: community, request_id: request_id };
        });

        knex("CommunityListings")
          .insert(communityRequests)
          .catch((err) => console.error(err));
      },
      (err) => stdErrorHandler(err, res)
    );
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
    .then(
      () => {
        return res.json("Request updated with id: " + id);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function deleteRequest(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json("Usage: /requests/:id. id has to be a number");
  }

  knex("Requests")
    .where("id", id)
    .delete()
    .then(
      () => {
        res.json("Request has been removed");
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getUserRequests(req, res) {
  const userId = parseInt(req.params.id);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json("Usage: /requests/user/:id. id has to be a number");
  }

  knex("Requests")
    .select()
    .where("user_id", userId)
    .then(
      (requests) => res.json(requests),
      (err) => stdErrorHandler(err, res)
    );
}

function getOtherRequestsCommunity(req, res) {
  const userId = req.params.userId;
  const communityIdsStr = req.query.communities;

  if (isNaN(userId)) {
    return res
      .status(400)
      .json("Usage: /requests/other/:userId. userId has to be a number");
  }

  if (!communityIdsStr) {
    const errMsg =
      "Usage: /requests/other/:userId?communities=:cid1,:cid2,.... " +
      "communities has to be a comma-separated array";
    return res.status(400).json(errMsg);
  }

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
    .then(
      (requests) => {
        return res.json(requests);
      },
      (err) => stdErrorHandler(err, res)
    );
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
