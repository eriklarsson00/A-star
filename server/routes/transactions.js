import { transactionChecker } from "./modelchecker.js";
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
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id. id has to be a number");
  }

  knex("Transactions")
    .select()
    .where("id", id)
    .then((transactions) => {
      res.json(transactions);
    });
}

function getResponderTransactions(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id. id has to be a number");
  }

  knex("Transactions")
    .select()
    .where("responder_id", id)
    .then((transactions) => {
      res.json(transactions);
    });
}

function getListerTransactions(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id. id has to be a number");
  }

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
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id. id has to be a number");
  }

  knex
    .raw(
      "SELECT C.* FROM Transactions T " +
        "LEFT JOIN CommunityListings CL ON CL.offer_id = T.offer_id OR CL.request_id = T.request_id " +
        "LEFT JOIN Communities C ON C.id = CL.community_id WHERE T.id = " +
        id
    )
    .then((communities) => {
      res.json(communities[0]);
    });
}

function getTransactionAcceptedUser(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/accepted/user/:id. id has to be a number");
  }

  const sql = `
    SELECT T.* FROM Transactions T
    LEFT JOIN Offers O    ON T.offer_id = O.id
    LEFT JOIN Requests R  ON T.request_id = R.id
    LEFT JOIN Users U     ON O.user_id = U.id OR R.user_id = U.id
    WHERE status = 'pending'
      AND U.id = ${id};
    `;

  knex.raw(sql).then((transactions) => {
    res.json(transactions[0]);
  });
}

function getTransactionPendingUser(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/pending/user/:id. id has to be a number");
  }
  const sql = `
    SELECT T.* FROM Transactions T
    LEFT JOIN Offers O    ON T.offer_id = O.id
    LEFT JOIN Requests R  ON T.request_id = R.id
    LEFT JOIN Users U     ON O.user_id = U.id OR R.user_id = U.id
    WHERE status = 'accepted'
      AND U.id = ${id};
    `;

  knex.raw(sql).then((transactions) => {
    res.json(transactions[0]);
  });
}

function getTransactionUser(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/user/:id. id has to be a number");
  }

  const sql = `
    SELECT T.* FROM Transactions T
    LEFT JOIN Offers O    ON T.offer_id = O.id
    LEFT JOIN Requests R  ON T.request_id = R.id
    LEFT JOIN Users U     ON O.user_id = U.id OR R.user_id = U.id
    WHERE U.id = ${id};
    `;

  knex.raw(sql).then((transactions) => {
    res.json(transactions[0]);
  });
}

function addTransaction(req, res) {
  const transaction = req.body;

  if (!transactionChecker(transaction))
    return res.status(400).json("Invalid transaction properties");

  transaction.status = "pending";
  knex("Transactions")
    .insert(transaction)
    .catch((err) => {
      res.status(500).json(err);
    })
    .then((id) => {
      if (id !== undefined) res.json("Transaction inserted with id: " + id);
    });
}

function updateTransaction(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (!transactionChecker(body))
    return res.status(400).json("Invalid transaction properties");

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id. id has to be a number");
  }

  knex("Transactions")
    .where("id", id)
    .update(body)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Transaction updated with id: " + id);
    });
}

function deleteTransaction(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id. id has to be a number");
  }

  knex("Transactions")
    .where("id", id)
    .delete()
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Transaction has been removed");
    });
}

function acceptTransaction(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id/accept. id has to be a number");
  }

  const sql = `
    UPDATE Transactions SET status = 'accepted'
    WHERE id = ${id};
  `;

  knex
    .raw(sql)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("Transaction has been updated");
    });
}

function ownerConfirmTransaction(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id/ownerConfirm. id has to be a number");
  }
  const getSql = `
    SELECT * FROM TRANSACTIONS
    WHERE id = ${id}
    FOR UPDATE;
  `;

  knex
    .raw(getSql)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then((t) => {
      let updateSql;

      if (id == undefined || !t || !t[0] || t[0].lenght == 0) {
        res.json("no entry found");
        return;
      } else if (t.status === "accepted") {
        updateSql = `
          UPDATE Transactions SET status = 'ownerConfirmed'
          WHERE id = ${id};
        `;
      } else {
        updateSql = `
          UPDATE Transactions SET status = 'completed'
          WHERE id = ${id};
        `;
      }

      knex
        .raw(updateSql)
        .catch((err) => {
          res.status(500).json(err);
          id = undefined;
        })
        .then(() => {
          if (id !== undefined) res.json("Transaction has been updated");
        });
    });
}

function responderConfirmTransaction(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id/responderConfirm. id has to be a number");
  }
  const getSql = `
    SELECT * FROM TRANSACTIONS
    WHERE id = ${id}
    FOR UPDATE;
  `;

  knex
    .raw(getSql)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then((t) => {
      let updateSql;

      if (id == undefined || !t || !t[0] || t[0].lenght == 0) {
        res.json("no entry found");
        return;
      } else if (t.status === "accepted") {
        updateSql = `
          UPDATE Transactions SET status = 'responderConfirmed'
          WHERE id = ${id};
        `;
      } else {
        updateSql = `
          UPDATE Transactions SET status = 'completed'
          WHERE id = ${id};
        `;
      }

      knex
        .raw(updateSql)
        .catch((err) => {
          res.status(500).json(err);
          id = undefined;
        })
        .then(() => {
          if (id !== undefined) res.json("Transaction has been updated");
        });
    });
}

export {
  // CRUD
  getTransactions,
  getTransaction,
  getResponderTransactions,
  getListerTransactions,
  getTransactionCommunity,
  getTransactionAcceptedUser,
  getTransactionPendingUser,
  getTransactionUser,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  // Actions
  acceptTransaction,
  ownerConfirmTransaction,
  responderConfirmTransaction,
};
