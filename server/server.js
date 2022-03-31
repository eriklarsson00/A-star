import "dotenv/config";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import "dotenv/config";

/*
*************************
    REST API SETUP
*************************
*/

const express = require("express");
const app = express();
app.use(express.json());

/*
*************************
    WebSocket SETUP
*************************
*/

const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const path = require("path");
const fs = require("fs");
const multer = require("multer");



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
  getActiveOffers,
} from "./routes/offers.js";
import {
  getRequests,
  getRequest,
  addRequest,
  getActiveRequests,
} from "./routes/requests.js";
import {
  getTransactions,
  getTransaction,
  getResponderTransactions,
  getListerTransactions,
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

app.route("/offers/:id").get(getOffer);

app.route("/offers/active").get(getActiveOffers);

//*************************REQUESTS*************************

app.route("/requests").get(getRequests).post(addRequest);

app.route("/requests/:id").get(getRequest);

app.route("/requests/active").get(getActiveRequests);

//*************************TRANSACTIONS*************************

app.route("/transactions").get(getTransactions);

app.route("/transactions/:id").get(getTransaction);

app.route("/transactions/responder/:id").get(getResponderTransactions);

app.route("/transactions/lister/:id").get(getListerTransactions);

//*************************SERVER*************************

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Images")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer( {storage: fileStorageEngine});
const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

app.post("/", upload.single("image"), (req, 
  res) => {
    console.log(req.file);
    res.send("Single File test");
  })
/*
const upload = multer({
  storage: multer.diskStorage({
  dest: "./Images"
  })
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

*/

/*
app.post(
  "/",

  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");
    console.log(req.file);
    
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    
  }
);
*/


server.listen(8080, () => {
  console.log("Listening to port 8080");
});

export { server }; // Needed for testing purposes
