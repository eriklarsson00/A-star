import {
  checkEmptyBody,
  checkEmptyParam,
  checkIntID,
  stdErrorHandler,
} from "./common.js";

import { createRequire } from "module";
import { uploadImageOnS3 } from "./upload.js";
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
    .then(
      (users) => {
        return res.json(users);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getUser(req, res) {
  const id = req.params.id;

  if (isNaN(id)) {
    return res.status(400).json("Usage: /users/:id. id has to be a number");
  }

  knex("Users")
    .select()
    .where("id", id)
    .then(
      (users) => {
        return res.json(users);
      },
      (err) => stdErrorHandler(err, res)
    );
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
    .then(
      (users) => {
        return res.json(users);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function addUser(req, res) {
  const body = req.body;

  if (checkEmptyBody(body, res, "Body cannot be empty")) {
    return;
  }

  knex("Users")
    .insert(body)
    .then(
      (id) => {
        return res.json("User inserted with id: " + id);
      },
      (err) => stdErrorHandler(err, res)
    );
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
    .then(
      () => {
        return res.json("User updated");
      },
      (err) => stdErrorHandler(err, res)
    );
}

async function updateProfilePicture(req, res) {
  const file = req.file;
  const id = parseInt(req.params.id);

  if (!file || isNaN(id)) {
    return res
      .status(400)
      .json("File to upload is not present or id is malformed");
  }

  uploadImageOnS3(file, "profilePictures/" + file.filename).then(
    (data) => {
      const loc = data.Location;

      if (!loc) {
        return res.status(500).json("Could not upload image to S3");
      }

      knex("Users")
        .where("id", id)
        .update({ imgurl: loc })
        .then(
          () => {
            return res.json(loc);
          },
          (err) => {
            throw err;
          }
        );
    },
    (err) => stdErrorHandler(err, res)
  );
}

function deleteUser(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json("Usage: /users/:id. id has to be a number");
  }

  const removedUser = {
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
  };

  knex("Users")
    .where("id", id)
    .update(removedUser)
    .then(
      () => {
        return res.json("User has been removed");
      },
      (err) => stdErrorHandler(err, res)
    );
}

function addUserToCommunity(req, res) {
  const body = req.body;

  if (checkEmptyBody(body, res, "Body cannot be empty")) {
    return;
  }

  const user_id = parseInt(body.user_id);
  const community_id = parseInt(body.community_id);

  if (isNaN(user_id) || isNaN(community_id)) {
    return res
      .status(400)
      .json("Body needs to contain 'user_id' and 'community_id'");
  }

  knex("CommunityUser")
    .insert(body)
    .then(
      () => {
        const msg = `User with id ${body.user_id} 
                   added to community with id ${body.community_id}`;
        return res.json(msg);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function removeUserFromCommunity(req, res) {
  const body = req.body;

  if (checkEmptyBody(body, res, "Body cannot be empty")) {
    return;
  }

  const user_id = parseInt(body.user_id);
  const community_id = parseInt(body.community_id);

  if (isNaN(user_id) || isNaN(community_id)) {
    return res
      .status(400)
      .json("Body needs to contain 'user_id' and 'community_id'");
  }

  knex("CommunityUser")
    .where("user_id", user_id)
    .andWhere("community_id", community_id)
    .del()
    .then(
      () => {
        const msg = `User with id ${body.user_id} 
                   removed from community with id ${body.community_id}`;
        return res.json(msg);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getUserCommunities(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res
      .status(400)
      .json("Usage: /users/communities/:id. id has to be a number");
  }

  knex("Communities")
    .select("Communities.*")
    .leftJoin("CommunityUser", "CommunityUser.community_id", "Communities.id")
    .leftJoin("Users", "Users.id", "CommunityUser.user_id")
    .where("Users.id", id)
    .then(
      (communities) => {
        return res.json(communities);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function rateUser(req, res) {
  const body = req.body;
  const id = parseInt(req.params.id);
  const rating = parseInt(body ? body.rating : "");

  if (isNaN(id) || isNaN(rating)) {
    return res.status(400).json("Body needs to contain 'user_id' and 'rating'");
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json("ratting has to be between 1 and 5");
  }

  knex
    .raw(
      `
      UPDATE Users SET rating = rating + ${rating}, raters = raters + 1  
      WHERE id = ${id};
    `
    )
    .then(
      () => {
        return res.json("Rating recieved");
      },
      (err) => stdErrorHandler(err, res)
    );
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
  removeUserFromCommunity,
  getUserCommunities,
  rateUser,
};
