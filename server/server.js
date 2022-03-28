const express = require("express");
const http = require("http");
const dbconfig = require("./dbconfig").config;
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const knex = require("knex")({
  client: "mysql2",
  connection: dbconfig,
});

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

//GETS

//USERS

app.get("/users", (req, res) => {
  console.log("GET Users", new Date());
  knex("Users")
    .select()
    .then((users) => {
      res.json(users);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET Users/" + id, new Date());
  knex("Users")
    .select()
    .where("id", id)
    .then((users) => {
      res.json(users);
    });
});

app.get("/users/name/:name", (req, res) => {
  const name = req.params.name;
  console.log("GET Users/name/" + name, new Date());
  knex("Users")
    .select()
    .where("firstname", name)
    .then((users) => {
      res.json(users);
    });
});

//COMMUNITIES

app.get("/communities", (req, res) => {
  console.log("GET Communities", new Date());
  knex("Communities")
    .select()
    .then((communities) => {
      res.json(communities);
    });
});

app.get("/communities/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET Communities/" + id, new Date());
  knex("Communities")
    .select()
    .where("id", id)
    .then((communities) => {
      res.json(communities);
    });
});

//OFFERS

app.get("/offers", (req, res) => {
  console.log("GET Offers", new Date());
  knex("Offers")
    .select()
    .then((offers) => {
      res.json(offers);
    });
});

app.get("/offers/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET Offers/" + id, new Date());
  knex("Offers")
    .select()
    .where("id", id)
    .then((offers) => {
      res.json(offers);
    });
});

//REQUESTS

app.get("/requests", (req, res) => {
  console.log("GET Requests", new Date());
  knex("Requests")
    .select()
    .then((requests) => {
      res.json(requests);
    });
});

app.get("/requests/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET Requests/" + id, new Date());
  knex("Requests")
    .select()
    .where("id", id)
    .then((requests) => {
      res.json(requests);
    });
});

//TRANSACTIONS

app.get("/transactions", (req, res) => {
  console.log("GET Transactions", new Date());
  knex("Transactions")
    .select()
    .then((transactions) => {
      res.json(transactions);
    });
});

app.get("/transactions/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET Transactions/" + id, new Date());
  knex("Transactions")
    .select()
    .where("id", id)
    .then((transactions) => {
      res.json(transactions);
    });
});

app.get("/transactions/responder/:id", (req, res) => {
  const id = req.params.id;
  console.log("GET Transactions/responder/" + id, new Date());
  knex("Transactions")
    .select()
    .where("responder_id", id)
    .then((transactions) => {
      res.json(transactions);
    });
});

app.get("/transactions/lister/:id", (req, res) => {
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
});

//POSTS

app.post("/users", (req, res) => {
  const body = req.body;
  knex("Users")
    .insert(body)
    .catch(() => {
      res.sendStatus(404);
    })
    .then((id) => {
      if (id !== undefined) res.json("User inserted with id: " + id);
    });
});

server.listen(8080, () => {
  console.log("Listening to port 8080");
});
