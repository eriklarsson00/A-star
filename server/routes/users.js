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

function getUsers(req, res) {
  knex("Users")
    .select()
    .then((users) => {
      res.json(users);
    });
}

function getUser(req, res) {
  const id = req.params.id;
  knex("Users")
    .select()
    .where("id", id)
    .then((users) => {
      res.json(users);
    });
}

function getUserEmail(req, res) {
  const email = req.params.email;
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

function addUserToCommunity(req, res) {
  const body = req.body;
  if (!body.user_id || !body.community_id) {
    res.sendStatus(404);
    return;
  }
  knex("CommunityUser")
    .insert(body)
    .catch(() => {
      res.sendStatus(404);
    })
    .then((id) => {
      if (id !== undefined)
        res.json(
          `User with id ${body.user_id} added to community with id ${body.community_id}`
        );
    });
}

function getUserCommunities(req, res) {
  const id = req.params.id;
  knex("Communities")
    .select("Communities.*")
    .leftJoin("CommunityUser", "CommunityUser.community_id", "Communities.id")
    .leftJoin("Users", "Users.id", "CommunityUser.user_id")
    .where("Users.id", id)
    .then((communities) => {
      res.json(communities);
    });
}

export {
  getUser,
  getUsers,
  getUserEmail,
  addUser,
  updateUser,
  deleteUser,
  addUserToCommunity,
  getUserCommunities,
};
