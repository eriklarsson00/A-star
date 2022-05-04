import { transactionChecker } from "./modelchecker.js";
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

function getTransactions(req, res) {
  knex("Transactions")
    .select()
    .then(
      (transactions) => {
        return res.json(transactions);
      },
      (err) => stdErrorHandler(err, res)
    );
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
    .then(
      (transactions) => {
        return res.json(transactions);
      },
      (err) => stdErrorHandler(err, res)
    );
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
    .then(
      (transactions) => {
        return res.json(transactions);
      },
      (err) => stdErrorHandler(err, res)
    );
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
    .then(
      (transactions) => {
        return res.json(transactions);
      },
      (err) => stdErrorHandler(err, res)
    );
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
      ` SELECT C.* FROM Transactions T
        LEFT JOIN CommunityListings CL ON CL.offer_id = T.offer_id OR CL.request_id = T.request_id
        LEFT JOIN Communities C ON C.id = CL.community_id WHERE T.id = ${id}
      `
    )
    .then(
      (communities) => {
        return res.json(communities[0]);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getTransactionOngoingOwner(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/ongoing/owner/:id. id has to be a number");
  }

  const sql = `
    SELECT T.*, 
    U.firstname, U.lastname, U.number, U.email, U.rating, U.raters,
    O.product_text as offer_product, O.description as offer_description, O.imgurl, 
    R.product_text as request_product, R.description as request_description
    FROM Transactions T
    LEFT JOIN Offers O    ON T.offer_id = O.id
    LEFT JOIN Requests R  ON T.request_id = R.id
    LEFT JOIN Users U     ON T.responder_id = U.id
    WHERE status in ('accepted', 'responderConfirmed')
      AND (R.user_id = ${id} OR O.user_id = ${id});
    `;

  knex.raw(sql).then(
    (transactions) => {
      res.json(transactions[0]);
    },
    (err) => stdErrorHandler(err, res)
  );
}

function getTransactionOngoingResponder(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json(
        "Usage: /transactions/ongoing/responder/:id. id has to be a number"
      );
  }

  const sql = `
    SELECT T.*, 
    U.firstname, U.lastname, U.number, U.email, U.rating, U.raters,
    O.product_text as offer_product, O.description as offer_description, O.imgurl, 
    R.product_text as request_product, R.description as request_description
    FROM Transactions T
    LEFT JOIN Offers O    ON T.offer_id = O.id
    LEFT JOIN Requests R  ON T.request_id = R.id
    LEFT JOIN Users U     ON R.user_id = U.id OR O.user_id = U.id
    WHERE status in ('accepted', 'ownerConfirmed', 'pending')
      AND T.responder_id = ${id};
    `;

  knex.raw(sql).then(
    (transactions) => {
      return res.json(transactions[0]);
    },
    (err) => stdErrorHandler(err, res)
  );
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
    WHERE status = 'pending'
      AND U.id = ${id};
    `;

  knex.raw(sql).then(
    (transactions) => {
      res.json(transactions[0]);
    },
    (err) => stdErrorHandler(err, res)
  );
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

  knex.raw(sql).then(
    (transactions) => {
      return res.json(transactions[0]);
    },
    (err) => stdErrorHandler(err, res)
  );
}

function addTransaction(req, res, io) {
  const transaction = req.body;

  if (!transactionChecker(transaction)) {
    return res.status(400).json("Invalid transaction properties");
  }

  transaction.status = "pending";
  knex("Transactions")
    .insert(transaction)
    .then(
      (id) => {
        res.json("Transaction inserted with id: " + id);
        req.body.id = id;
        io?.sockets.emit("transaction", req.body);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function updateTransaction(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (!transactionChecker(body)) {
    return res.status(400).json("Invalid transaction properties");
  }

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id. id has to be a number");
  }

  knex("Transactions")
    .where("id", id)
    .update(body)
    .then(
      () => {
        return res.json("Transaction updated with id: " + id);
      },
      (err) => stdErrorHandler(err, res)
    );
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
    .then(
      () => {
        return res.json("Transaction has been removed");
      },
      (err) => stdErrorHandler(err, res)
    );
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

  knex.raw(sql).then(
    () => {
      return res.json("Transaction has been updated");
    },
    (err) => stdErrorHandler(err, res)
  );
}

function ownerConfirmTransaction(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id/ownerConfirm. id has to be a number");
  }
  const getSql = `
    SELECT * FROM Transactions
    WHERE id = ${id}
    FOR UPDATE;
  `;

  knex.raw(getSql).then(
    async (result) => {
      let updateSql;
      const t = result[0];

      if (!t || !t[0] || t[0].lenght == 0) {
        return res.json("no entry found");
      } else if (t[0].status === "accepted") {
        updateSql = `
          UPDATE Transactions SET status = 'ownerConfirmed'
          WHERE id = ${id};
        `;
      } else {
        updateSql = `
          UPDATE Transactions SET status = 'completed'
          WHERE id = ${id};
        `;
        await incrementUserStat(id);
      }

      knex.raw(updateSql).then(
        () => {
          res.json("Transaction has been updated");
        },
        (err) => {
          throw err;
        }
      );
    },
    (err) => stdErrorHandler(err, res)
  );
}

function responderConfirmTransaction(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /transactions/:id/responderConfirm. id has to be a number");
  }
  const getSql = `
    SELECT * FROM Transactions
    WHERE id = ${id}
    FOR UPDATE;
  `;

  knex.raw(getSql).then(
    async (result) => {
      let updateSql;
      const t = result[0];

      if (!t || !t[0] || t[0].lenght == 0) {
        return res.json("no entry found");
      } else if (t[0].status === "accepted") {
        updateSql = `
          UPDATE Transactions SET status = 'responderConfirmed'
          WHERE id = ${id};
        `;
      } else {
        updateSql = `
          UPDATE Transactions SET status = 'completed'
          WHERE id = ${id};
        `;
        await incrementUserStat(id);
      }

      knex.raw(updateSql).then(
        () => {
          res.json("Transaction has been updated");
        },
        (err) => {
          throw err;
        }
      );
    },
    (err) => stdErrorHandler(err, res)
  );
}

async function incrementUserStat(transactionId) {
  let owner;
  let responder;
  let transaction = await knex("Transactions")
    .select()
    .where("id", transactionId)
    .then((result) => result[0]);

  responder = await knex("Users")
    .select()
    .where("id", transaction.responder_id)
    .then((result) => result[0]);

  if (transaction && transaction.request_id) {
    const request = await knex("Requests")
      .select()
      .where("id", transaction.request_id)
      .then((result) => result[0]);
    owner = await knex("Users")
      .select()
      .where("id", request.user_id)
      .then((result) => result[0]);

    owner.taken += 1;
    responder.given += 1;
  } else {
    const offer = await knex("Offers")
      .select()
      .where("id", transaction.offer_id)
      .then((result) => result[0]);

    owner = await knex("Users")
      .select()
      .where("id", offer.user_id)
      .then((result) => result[0]);

    owner.given += 1;
    responder.taken += 1;
  }

  await knex("Users").where("id", owner.id).update(owner);
  await knex("Users").where("id", responder.id).update(responder);
}

export {
  // CRUD
  getTransactions,
  getTransaction,
  getResponderTransactions,
  getListerTransactions,
  getTransactionCommunity,
  getTransactionOngoingOwner,
  getTransactionOngoingResponder,
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
