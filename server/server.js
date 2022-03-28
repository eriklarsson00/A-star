const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const http = require("http");
const dbconfig = require("./dbconfig").config;
const knex = require("knex")({
  client: "mysql2",
  connection: dbconfig,
});
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const jsonParser = bodyParser.json()

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

app.get("/users", (req, res) => {
  knex("Users")
    .select()
    .then((users) => {
      res.json(users);
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  knex("Users")
    .select()
    .where("id", id)
    .then((users) => {
      res.json(users);
    });
});

app.post("/users", (req, res) => {
  console.log(req.body);
});

server.listen(8080, () => {
  console.log("Listening to port 8080");
});
