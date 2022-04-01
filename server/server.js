import "dotenv/config";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import "dotenv/config";

/*
*************************
    SERVER SETUP
*************************
*/

const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http");
const https = require("https");
const WebSocket = require("ws");
app.use(express.json());

let sslKey;
let sslCert;
let sserver;
if (process.env.NODE_ENV === "prod") {
  sslKey = fs.readFileSync("ca.key", "utf8");
  sslCert = fs.readFileSync("ca.crt", "utf8");
  sserver = https.createServer({ key: sslKey, cert: sslCert }, app);
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message, isBinary) {
    console.log(message.toString());
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

/*
*************************
    REST API ROUTES
*************************
*/

import {
  getUser,
  getUsers,
  getUserEmail,
  addUser,
  updateUser,
  deleteUser,
  addUserToCommunity,
  getUserCommunities,
} from "./routes/users.js";
import { userExists } from "./routes/login.js";
import {
  getCommunities,
  getCommunity,
  addCommunity,
  updateCommunity,
  deleteCommunity,
} from "./routes/communities.js";
import {
  getOffers,
  getOffer,
  addOffer,
  deleteOffer,
  getActiveOffers,
  getActiveOffersCommunity,
} from "./routes/offers.js";
import {
  getRequests,
  getRequest,
  addRequest,
  deleteRequest,
  getActiveRequests,
  getActiveRequestsCommunity,
} from "./routes/requests.js";
import {
  getTransactions,
  getTransaction,
  getResponderTransactions,
  getListerTransactions,
  getTransactionCommunity,
  addTransaction,
  deleteTransaction,
} from "./routes/transactions.js";
import { getProduct } from "./routes/products.js";
import { deployServer } from "./routes/ci.js";

//*************************CI*************************

app.route("/ci/deploy").post(deployServer);

//*************************PRODUCTS*************************

app.route("/products/:gtin").get(getProduct);

//*************************USERS*************************

app.route("/users").get(getUsers).post(addUser);

app.route("/users/:id").get(getUser).put(updateUser).delete(deleteUser);

app.route("/users/email/:email").get(getUserEmail);

app.route("/users/community").post(addUserToCommunity);

app.route("/users/community/:id").get(getUserCommunities);

//*************************LOGIN*************************

app.route("/login").post(userExists);

//*************************COMMUNITIES*************************

app.route("/communities").get(getCommunities).post(addCommunity);

app
  .route("/communities/:id")
  .get(getCommunity)
  .put(updateCommunity)
  .delete(deleteCommunity);

//*************************OFFERS*************************

app.route("/offers").get(getOffers).post(addOffer);

app.route("/offers/:id").get(getOffer).delete(deleteOffer);

app.route("/offers/active").get(getActiveOffers);

app.route("/offers/active/:community").get(getActiveOffersCommunity);

//*************************REQUESTS*************************

app.route("/requests").get(getRequests).post(addRequest);

app.route("/requests/:id").get(getRequest).delete(deleteRequest);

app.route("/requests/active").get(getActiveRequests);

app.route("/requests/active/:community").get(getActiveRequestsCommunity);

//*************************TRANSACTIONS*************************

app.route("/transactions").get(getTransactions).post(addTransaction);

app.route("/transactions/:id").get(getTransaction).delete(deleteTransaction);

app.route("/transactions/community/:id").get(getTransactionCommunity);

app.route("/transactions/responder/:id").get(getResponderTransactions);

app.route("/transactions/lister/:id").get(getListerTransactions);

//*************************SERVER*************************

if (sserver) {
  sserver.listen(process.env.SERVER_PORT_HTTPS, () => {
    console.log(
      "Listening to port " +
        process.env.SERVER_PORT_HTTPS +
        " with auto reload!"
    );
  });
}

server.listen(process.env.SERVER_PORT_HTTP, () => {
  console.log(
    "Listening to port " + process.env.SERVER_PORT_HTTP + " with auto reload!"
  );
});

export { server }; // Needed for testing purposes
