import "dotenv/config";
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
let sserver;
if (process.env.NODE_ENV === "prod") {
  sslKey = fs.readFileSync("ca.key", "utf8");
  sslCert = fs.readFileSync("ca.crt", "utf8");
  sserver = https.createServer({ key: sslKey, cert: sslCert }, app);
}

const server = http.createServer(app);

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
  console.log(socket.id, "has connected");
  socket.emit(
    "message",
    `Connected to WebSocket server\n ${connectedClients()}`
  );

  socket.on("communities", (communities) => {
    console.log(communities);
    socket.join(communities.ids);
  });

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

/*
*************************
    REST API ROUTES
*************************
*/

import * as users from "./routes/users.js";
import * as login from "./routes/login.js";
import * as communities from "./routes/communities.js";
import * as offers from "./routes/offers.js";
import * as requests from "./routes/requests.js";
import * as transactions from "./routes/transactions.js";
import * as products from "./routes/products.js";
import * as ci from "./routes/ci.js";
import * as uploadS3 from "./routes/upload.js";

//*************************CI*************************

app.route("/ci/deploy").post(ci.deployServer);

//*************************PRODUCTS*************************

app.route("/products/:gtin").get(products.getProduct);

//*************************USERS*************************

app.route("/users").get(users.getUsers).post(users.addUser);

app
  .route("/users/:id")
  .get(users.getUser)
  .put(users.updateUser)
  .delete(users.deleteUser);

app.route("/users/email/:email").get(users.getUserEmail);

app.route("/users/community").post(users.addUserToCommunity);

app.route("/users/community/:id").get(users.getUserCommunities);

//*************************LOGIN*************************

app.route("/login").post(login.userExists);

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

app.route("/offers/active/:community").get(offers.getActiveOffersCommunity);

app
  .route("/offers")
  .get(offers.getOffers)
  .post((req, res) => {
    offers.addOffer(req, res);
    const communities = req.body.communities;
    communities.forEach((community) => {
      io.sockets.to(community).emit("offer", req.body.offer);
    });
    offers.addOffer(req, res);
  });

app
  .route("/offers/:id")
  .get(offers.getOffer)
  .put(offers.updateOffer)
  .delete(offers.deleteOffer);

//*************************REQUESTS*************************

app.route("/requests/active").get(requests.getActiveRequests);

app
  .route("/requests/active/:community")
  .get(requests.getActiveRequestsCommunity);

app
  .route("/requests")
  .get(requests.getRequests)
  .post((req, res) => {
    const communities = req.body.communities;
    communities.forEach((community) => {
      io.sockets.to(community).emit("request", req.body.request);
    });
    requests.addRequest(req, res);
  });

app
  .route("/requests/:id")
  .get(requests.getRequest)
  .put(requests.updateRequest)
  .delete(requests.deleteRequest);

//*************************TRANSACTIONS*************************

app
  .route("/transactions")
  .get(transactions.getTransactions)
  .post(transactions.addTransaction);

app
  .route("/transactions/:id")
  .put(transactions.updateTransaction)
  .get(transactions.getTransaction)
  .delete(transactions.deleteTransaction);

app
  .route("/transactions/community/:id")
  .get(transactions.getTransactionCommunity);

app
  .route("/transactions/responder/:id")
  .get(transactions.getResponderTransactions);

app.route("/transactions/lister/:id").get(transactions.getListerTransactions);

//*************************IMAGES*********************

app.post("/Image", async (req, res) => {
  try {
    await uploadImageOnS3(req.file, "/images");
    res.send("Succesfully sent to images");
  } catch (err) {
    res.send("Upload failed " + err);
  }
});

app.post("/Profile", async (req, res) => {
  try {
    console.log("IN /Profile on server.js!!!!\n");
    await uploadImageOnS3(req.file, "/profilePictures/test.png");
    console.log("VI ÄR FÖRBI UIOS3 funktionen!!!\n");
    res.send("Succesfully sent to profiles");
  } catch (err) {
    console.log(err);
    res.send("Upload failed " + err);
  }
});
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
