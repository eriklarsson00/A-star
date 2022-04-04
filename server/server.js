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
  getCommunityMembers,
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
import { upload, uploadImageOnS3 } from "./routes/upload.js";


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

app.route("communities/members/:id").get(getCommunityMembers);

//*************************OFFERS*************************

app
  .route("/offers")
  .get(getOffers)
  .post((req, res) => {
    const communities = req.body.communities;
    communities.forEach((community) => {
      io.sockets.to(community).emit("newOffer", req.body.offer);
    });
    addOffer(req, res)
  });

app.route("/offers/:id").get(getOffer).delete(deleteOffer);

app.route("/offers/active").get(getActiveOffers);

app.route("/offers/active/:community").get(getActiveOffersCommunity);

//*************************REQUESTS*************************

app
  .route("/requests")
  .get(getRequests)
  .post((req, res) => {
    const communities = req.body.communities;
    communities.forEach((community) => {
      io.sockets.to(community).emit("newRequest", req.body.request);
    });
    addRequest(req, res)
  });

app.route("/requests/:id").get(getRequest).delete(deleteRequest);

app.route("/requests/active").get(getActiveRequests);

app.route("/requests/active/:community").get(getActiveRequestsCommunity);

//*************************TRANSACTIONS*************************

app.route("/transactions").get(getTransactions).post(addTransaction);

app.route("/transactions/:id").get(getTransaction).delete(deleteTransaction);

app.route("/transactions/community/:id").get(getTransactionCommunity);

app.route("/transactions/responder/:id").get(getResponderTransactions);

app.route("/transactions/lister/:id").get(getListerTransactions);

//*************************IMAGES*********************




app.post("/images", upload.single("image"), (req, 
  res) => {
    uploadImageOnS3(req.file);
    console.log(req.file);
    res.send("Single File test");
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
