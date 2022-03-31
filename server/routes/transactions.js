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
  knex("Transactions")
    .select()
    .then((transactions) => {
      res.json(transactions);
    });
}

function getTransaction(req, res) {
  const id = req.params.id;
  knex("Transactions")
    .select()
    .where("id", id)
    .then((transactions) => {
      res.json(transactions);
    });
}

function getResponderTransactions(req, res) {
  const id = req.params.id;
  knex("Transactions")
    .select()
    .where("responder_id", id)
    .then((transactions) => {
      res.json(transactions);
    });
}

function getListerTransactions(req, res) {
  const id = req.params.id;
  knex("Transactions")
    .select("Transactions.*")
    .leftJoin("Transactions", "Transactions.id", "Transactions.transaction_id")
    .leftJoin("Transactions", "Transactions.id", "Transactions.transaction_id")
    .where("Transactions.user_id", id)
    .orWhere("Transactions.user_id", id)
    .then((transactions) => {
      res.json(transactions);
    });
}

function getTransactionCommunity(req, res) {
  const id = req.params.id;
  knex
    .raw(
      "SELECT C.* FROM Transactions T " +
        "LEFT JOIN CommunityListings CL ON CL.transaction_id = T.transaction_id OR CL.transaction_id = T.transaction_id " +
        "LEFT JOIN Communities C ON C.id = CL.community_id WHERE T.id = " + id
    )
    .then((communities) => {
      res.json(communities[0]);
    });
}

function addTransaction(req, res) {
  const transaction = req.body
  transaction.status = "pending"
  knex("Transactions")
    .insert(body)
    .catch(() => {
      res.sendStatus(400);
    })
    .then((id) => {
      if (id !== undefined) res.json("Transaction inserted with id: " + id);
    });
}

function deleteTransaction(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json("Usage: /transactions/:id. id has to be a number");
  }

  knex("Transactions")
    .where("id", id)
    .delete()
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Transaction has been removed");
    });
}

export {
  getTransactions,
  getTransaction,
  getResponderTransactions,
  getListerTransactions,
  getTransactionCommunity,
  addTransaction,
  deleteTransaction,
};
