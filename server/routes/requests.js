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

function getActiveRequests(req, res) {
  knex("Requests")
    .select("Requests.*")
    .leftJoin("Transactions", "Transaction.request_id", "Requests.id")
    .where("Transactions.request_id", null)
    .then(requests => {
      res.json(requests)
    })
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

export { getActiveRequests, getRequests, getRequest, addRequest };