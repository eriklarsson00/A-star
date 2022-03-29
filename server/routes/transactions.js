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

function getTransactions(req, res) {
  console.log("GET Transactions", new Date());
  knex("Transactions")
    .select()
    .then((transactions) => {
      res.json(transactions);
    });
};

function getTransaction(req, res) {
  const id = req.params.id;
  console.log("GET Transactions/" + id, new Date());
  knex("Transactions")
    .select()
    .where("id", id)
    .then((transactions) => {
      res.json(transactions);
    });
};

function getResponderTransactions(req, res) {
  const id = req.params.id;
  console.log("GET Transactions/responder/" + id, new Date());
  knex("Transactions")
    .select()
    .where("responder_id", id)
    .then((transactions) => {
      res.json(transactions);
    });
}

function getListerTransactions(req, res) {
  const id = req.params.id;
  console.log("GET Transactions/responder/" + id, new Date());
  knex("Transactions")
    .select("Transactions.*")
    .leftJoin("Offers", "Offers.id", "Transactions.offer_id")
    .leftJoin("Requests", "Requests.id", "Transactions.request_id")
    .where("Requests.user_id", id)
    .orWhere("Offers.user_id", id)
    .then((transactions) => {
      res.json(transactions);
    });
};

export { getTransactions, getTransaction, getResponderTransactions, getListerTransactions }
