import "dotenv/config";

import * as ci from "./routes/ci.js";
import * as communities from "./routes/communities.js";
import * as offers from "./routes/offers.js";
import * as products from "./routes/products.js";
import * as requests from "./routes/requests.js";
import * as transactions from "./routes/transactions.js";
import * as users from "./routes/users.js";

import { upload, uploadImageOnS3 } from "./routes/upload.js";

import { createRequire } from "module";

const require = createRequire(import.meta.url);

/*
*************************
    SERVER SETUP
*************************
*/

const express = require("express");
const app = express();
const socketio = require("socket.io");
const fs = require("fs");
const http = require("http");
const https = require("https");
app.use(express.json());

let sslKey;
let sslCert;
let server;
if (process.env.NODE_ENV === "prod") {
  sslKey = fs.readFileSync("ca.key", "utf8");
  sslCert = fs.readFileSync("ca.crt", "utf8");
  server = https.createServer({ key: sslKey, cert: sslCert }, app);
} else {
  server = http.createServer(app);
}

/*
*************************
    WebSocket SETUP
*************************
*/

const io = socketio(server);

io.on("connection", (socket) => {
  const connectedClients = () => {
    return `${io.of("/").sockets.size} clients connected`;
  };
  socket.emit(
    "message",
    `Connected to WebSocket server\n ${connectedClients()}`
  );

  socket.broadcast.emit(
    "message",
    `A new client connected to the WebSocket server\n ${connectedClients()}`
  );

  socket.on("disconnect", () => {
    io.emit(
      "message",
      `A client has disconnected from the server \n ${connectedClients()}`
    );
  });
});

//*************************CI*************************

app.route("/ci/deploy").post(ci.deployServer);

//*************************PRODUCTS*************************

app.route("/products/:gtin").get(products.getProduct);

//*************************USERS*************************

app.route("/users").get(users.getUsers).post(users.addUser);

app.route("/users/email/:email").get(users.getUserEmail);

app
  .route("/users/community")
  .post(users.addUserToCommunity)
  .delete(users.removeUserFromCommunity);

app.route("/users/community/:id").get(users.getUserCommunities);

app.post(
  "/users/profile/:id",
  upload.single("image"),
  users.updateProfilePicture
);

app.route("/users/:id/rate").put(users.rateUser);

app
  .route("/users/:id")
  .get(users.getUser)
  .put(users.updateUser)
  .delete(users.deleteUser);

//*************************COMMUNITIES*************************

app
  .route("/communities")
  .get(communities.getCommunities)
  .post(communities.addCommunity);

app
  .route("/communities/:id")
  .get(communities.getCommunity)
  .put(communities.updateCommunity)
  .delete(communities.deleteCommunity);

app.route("communities/members/:id").get(communities.getCommunityMembers);

//*************************OFFERS*************************

app.route("/offers/active").get(offers.getActiveOffers);

app.route("/offers/myactive/:userId").get(offers.getMyActiveOffers);

app.route("/offers/active/:community").get(offers.getActiveOffersCommunity);

app
  .route("/offers")
  .get(offers.getOffers)
  .post((req, res) => {
    offers.addOffer(req, res, io);
  });

app
  .route("/offers/:id")
  .get(offers.getOffer)
  .put(offers.updateOffer)
  .delete((req, res) => {
    offers.deleteOffer(req, res);
    io.sockets.emit("deleteOffer", req.params.id);
  });

app.route("/offers/user/:id").get(offers.getUserOffers);

app.route("/offers/other/:userId").get(offers.getOtherOffersCommunity);

//*************************REQUESTS*************************

app.route("/requests/active").get(requests.getActiveRequests);

app.route("/requests/myactive/:userId").get(requests.getMyActiveRequests);

app
  .route("/requests/active/:community")
  .get(requests.getActiveRequestsCommunity);

app
  .route("/requests")
  .get(requests.getRequests)
  .post((req, res) => {
    requests.addRequest(req, res, io);
  });

app
  .route("/requests/:id")
  .get(requests.getRequest)
  .put(requests.updateRequest)
  .delete((req, res) => {
    requests.deleteRequest(req, res);
    io.sockets.emit("deleteRequest", req.params.id);
  });

app.route("/requests/user/:id").get(requests.getUserRequests);

app.route("/requests/other/:userId").get(requests.getOtherRequestsCommunity);

//*************************TRANSACTIONS*************************

app
  .route("/transactions")
  .get(transactions.getTransactions)
  .post((req, res) => {
    transactions.addTransaction(req, res, io);
  });

app
  .route("/transactions/:id")
  .put(transactions.updateTransaction)
  .get(transactions.getTransaction)
  .delete(transactions.deleteTransaction);

app.route("/transactions/:id/accept").put((req, res) => {
  transactions.acceptTransaction(req, res);
  io.sockets.emit("acceptTransaction", req.params.id);
});

app
  .route("/transactions/:id/ownerConfirm")
  .put(transactions.ownerConfirmTransaction);

app
  .route("/transactions/:id/responderConfirm")
  .put(transactions.responderConfirmTransaction);

app
  .route("/transactions/community/:id")
  .get(transactions.getTransactionCommunity);

app
  .route("/transactions/ongoing/owner/:id")
  .get(transactions.getTransactionOngoingOwner);

app
  .route("/transactions/ongoing/responder/:id")
  .get(transactions.getTransactionOngoingResponder);

app
  .route("/transactions/pending/user/:id")
  .get(transactions.getTransactionPendingUser);

app
  .route("/transactions/completed/responder/:id")
  .get(transactions.getTransactionCompletedResponder);

app
  .route("/transactions/completed/owner/:id")
  .get(transactions.getTransactionCompletedOwner);

app.route("/transactions/user/:id").get(transactions.getTransactionUser);

app
  .route("/transactions/responder/:id")
  .get(transactions.getResponderTransactions);

//*************************IMAGES*********************

app.post("/itemimages", upload.single("image"), (req, res) => {
  try {
    uploadImageOnS3(req.file, "itemImages/" + req.file.filename);
    res.json(
      "https://matsamverkan.s3.us-east-1.amazonaws.com/itemImages/" +
        req.file.filename
    );
  } catch (err) {
    res.status(500);
    res.json("Upload failed: " + err);
  }
});

app.post("/communityimages", upload.single("image"), (req, res) => {
  try {
    uploadImageOnS3(req.file, "communityImages/" + req.file.filename);
    res.json(
      "https://matsamverkan.s3.us-east-1.amazonaws.com/communityImages/" +
        req.file.filename
    );
  } catch (err) {
    res.status(500);
    res.json("Upload failed: " + err);
  }
});

//*************************SERVER*************************//

let msg;
let port;

if (process.env.NODE_ENV === "prod") {
  msg = `Listening to port ${process.env.SERVER_PORT_HTTPS} with auto reload!`;
  port = process.env.SERVER_PORT_HTTPS;
} else {
  msg = `Listening to port ${process.env.SERVER_PORT_HTTP} with auto reload!`;
  port = process.env.SERVER_PORT_HTTP;
}

server.listen(port, () => console.log(msg));

export { server }; // Needed for testing purposes
