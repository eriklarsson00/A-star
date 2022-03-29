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

console.log({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function getUsers(req, res) {
  console.log("GET Users", new Date());
  knex("Users")
    .select()
    .then((users) => {
      res.json(users);
    });
}

function getUser(req, res) {
  const id = req.params.id;
  console.log("GET Users/" + id, new Date());
  knex("Users")
    .select()
    .where("id", id)
    .then((users) => {
      res.json(users);
    });
}

function getUserEmail(req, res) {
  const name = req.params.email;
  console.log("GET Users/email/" + email, new Date());
  knex("Users")
    .select()
    .where("email", email)
    .then((users) => {
      res.json(users);
    });
}

function addUser(req, res) {
  const body = req.body;
  knex("Users")
    .insert(body)
    .catch(() => {
      res.sendStatus(404);
    })
    .then((id) => {
      if (id !== undefined) res.json("User inserted with id: " + id);
    });
}

function updateUser(req, res) {
  const id = req.params.id;
  const body = req.body;
  knex("Users")
    .where("id", id)
    .update(body)
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json(body);
    });
}

function deleteUser(req, res) {
  const id = req.params.id;
  knex("Users")
    .where("id", id)
    .del()
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then(() => {
      res.json("User deleted");
    });
}

export { getUser, getUsers, getUserEmail, addUser, updateUser, deleteUser };
