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

function getRequests(req, res) {
  console.log("GET Requests", new Date());
  knex("Requests")
    .select()
    .then((requests) => {
      res.json(requests);
    });
}

function getRequest(req, res) {
  const id = req.params.id;
  console.log("GET Requests/" + id, new Date());
  knex("Requests")
    .select()
    .where("id", id)
    .then((requests) => {
      res.json(requests);
    });
}

export { getRequests, getRequest };
