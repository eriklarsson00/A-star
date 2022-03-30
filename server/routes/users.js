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
      res.sendStatus(400);
    })
    .then((id) => {
      if (id !== undefined) res.json("User inserted with id: " + id);
    });
}

function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (isNaN(id)) {
    return res.status(400).json("Usage: /users/:id. id has to be a number");
  }

  knex("Users")
    .where("id", id)
    .update(body)
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("User updated");
    });
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json("Usage: /users/:id. id has to be a number");
  }

  knex("Users")
    .where("id", id)
    .update({
      firstname: "removed",
      lastname: "removed",
      number: "removed",
      email: "removed",
      adress: "removed",
      location: "removed",
      imgurl: "removed",
      rating: -1,
      raters: -1,
      given: -1,
      taken: -1,
    })
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("User has been removed");
    });
}

function addUserToCommunity(req, res) {
  const body = req.body;
  const user_id = parseInt(body.user_id);
  const community_id = parseInt(body.community_id);
  if (isNaN(user_id) || isNaN(community_id)) {
    res.status(400).json("Body needs to contain 'user_id' and 'community_id'");
    return;
  }
  knex("CommunityUser")
    .insert(body)
    .catch((err) => {
      res.json(err);
      id = undefined;
    })
    .then((id) => {
      if (id !== undefined)
        res.json(
          `User with id ${body.user_id} added to community with id ${body.community_id}`
        );
    });
}

function getUserCommunities(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /users/community/:id. id has to be a number");
  }
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
