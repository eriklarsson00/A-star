import { createRequire } from "module";
import { checkIntID, checkEmptyBody, checkEmptyParam } from "./common.js";
import { uploadImageOnS3 } from "./upload";
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

  if (checkIntID(id, res, "Usage: /users/:id. id has to be a number")) {
    return;
  }

  knex("Users")
    .select()
    .where("id", id)
    .then((users) => {
      res.json(users);
    });
}

function getUserEmail(req, res) {
  const email = req.params.email;
  const errMsg = "Usage: /users/email/:email. email has to be a string";

  if (checkEmptyParam(email, res, errMsg)) {
    return;
  }

  knex("Users")
    .select()
    .where("email", email)
    .then((users) => {
      res.json(users);
    });
}

function addUser(req, res) {
  const body = req.body;

  if (checkEmptyBody(body, res, "Body cannot be empty")) {
    return;
  }

  knex("Users")
    .insert(body)
    .catch((err) => {
      res.status(500).json(err);
    })
    .then((id) => {
      if (id !== undefined) res.json("User inserted with id: " + id);
    });
}

function updateUser(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (
    checkIntID(id, res, "Usage: /users/:id. id has to be a number") ||
    checkEmptyBody(body, res, "Body cannot be empty")
  ) {
    return;
  }

  knex("Users")
    .where("id", id)
    .update(body)
    .catch((err) => {
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("User updated");
    });
}

async function updateProfilePicture(req, res) {
  const file = req.file;
  const id = parseInt(req.params.id);

  if (!file || isNaN(id)) {
    res.status(400).json("File to upload is not present or id is malformed");
    return;
  }

  uploadImageOnS3(file, "profilePictures/" + file.filename).then((data) => {
    const loc = data.Location;

    if (!loc) {
      return res.status(500).json("Could not upload image to S3");
    }

    knex("Users")
      .where("id", id)
      .update({ imgurl: location })
      .catch((err) => {
        res.status(500).json(err);
      })
      .then(() => {
        res.json(loc);
      });
  });
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id);

  if (checkIntID(id, res, "Usage: /users/:id. id has to be a number")) {
    return;
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
      res.status(500).json(err);
      id = undefined;
    })
    .then(() => {
      if (id !== undefined) res.json("User has been removed");
    });
}

function addUserToCommunity(req, res) {
  const body = req.body;

  if (checkEmptyBody(body, res, "Body cannot be empty")) {
    return;
  }

  const user_id = parseInt(body.user_id);
  const community_id = parseInt(body.community_id);

  if (isNaN(user_id) || isNaN(community_id)) {
    res.status(400).json("Body needs to contain 'user_id' and 'community_id'");
    return;
  }

  knex("CommunityUser")
    .insert(body)
    .catch((err) => {
      res.status(500).json(err);
      return;
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
  const errMsg = "Usage: /users/communities/:id. id has to be a number";

  if (checkIntID(id, res, errMsg)) {
    return;
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
  updateProfilePicture,
  deleteUser,
  addUserToCommunity,
  getUserCommunities,
};
