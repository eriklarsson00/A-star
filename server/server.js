import { createRequire } from "module";
const require = createRequire(import.meta.url);

import 'dotenv/config'

const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

import { getUser, getUsers, getUserEmail, addUser, updateUser, deleteUser } from "./routes/users.js"
import { userExists } from "./routes/login.js";
import { getCommunities, getCommunity } from "./routes/communities.js";
import { getOffers, getOffer } from "./routes/offers.js"
import { getRequests, getRequest } from "./routes/requests.js"
import { getTransactions, getTransaction, getResponderTransactions, getListerTransactions } from "./routes/transactions.js"
import { getProduct } from "./routes/products.js"

app.use(express.json());

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

//PRODUCTS

app.route("/products/:gtin").get(getProduct)

//USERS

app.route("/users").get(getUsers).post(addUser);

app
  .route("/users/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

app.route("/users/email/:email").get(getUserEmail);

//LOGIN

app.route("/login").post(userExists);

//COMMUNITIES

app.route("/communities").get(getCommunities);

app.route("/communities/:id").get(getCommunity);

//OFFERS

app.route("/offers").get(getOffers);

app.route("/offers/:id").get(getOffer);

//REQUESTS

app.route("/requests").get(getRequests);

app.route("/requests/:id").get(getRequest);

//TRANSACTIONS

app.route("/transactions").get(getTransactions);

app.route("/transactions/:id").get(getTransaction);

app
  .route("/transactions/responder/:id")
  .get(getResponderTransactions);

app.route("/transactions/lister/:id").get(getListerTransactions);

//*************************SERVER*************************

server.listen(8080, () => {
  console.log("Listening to port 8080");
});
