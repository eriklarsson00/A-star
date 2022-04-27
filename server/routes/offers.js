import { offerChecker } from "./modelchecker.js";
import { createRequire } from "module";
import { stdErrorHandler } from "./common.js";
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

function getActiveOffersCommunity(req, res) {
  const community = parseInt(req.params.community);

  if (isNaN(community)) {
    return res.status(400).json("Usage: /offers/:id. id has to be a number");
  }

  knex("Offers")
    .select("Offers.*")
    .leftJoin("Transactions", "Transactions.offer_id", "Offers.id")
    .leftJoin("CommunityListings", "CommunityListings.offer_id", "Offers.id")
    .where("Transactions.offer_id", null)
    .andWhere("CommunityListings.community_id", community)
    .then(
      (offers) => {
        return res.json(offers);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getActiveOffers(req, res) {
  knex("Offers")
    .select("Offers.*")
    .leftJoin("Transactions", "Transactions.offer_id", "Offers.id")
    .where("Transactions.offer_id", null)
    .then(
      (offers) => {
        return res.json(offers);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getMyActiveOffers(req, res) {
  const userId = parseInt(req.params.userId);

  if (isNaN(userId)) {
    return res
      .status(400)
      .json("Usage: /offers/myactive/:userId. userId has to be a number");
  }

  knex
    .raw(
      `
    SELECT O.* FROM Offers O
    LEFT JOIN Transactions T ON T.offer_id = O.id
    WHERE O.user_id = ${userId}
      AND (T.status IS NULL OR T.status = 'pending');
  `
    )
    .then(
      (offers) => {
        return res.json(offers[0]);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getOffers(req, res) {
  knex("Offers")
    .select()
    .then(
      (offers) => {
        return res.json(offers);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getOffer(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json("Usage: /offers/:id. id has to be a number");
  }

  knex("Offers")
    .select()
    .where("id", id)
    .then(
      (offers) => {
        return res.json(offers);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function addOffer(req, res) {
  const body = req.body;
  const offer = body?.offer;
  const communities = body?.communities;

  if (!body || !offerChecker(offer))
    return res.status(400).json("Invalid offer properties");

  let offer_id;
  knex("Offers")
    .insert(offer)
    .then(
      (id) => {
        res.json("Offer inserted with id: " + id);
        offer_id = id;
      },
      (err) => stdErrorHandler(err, res)
    )
    .then(
      () => {
        if (!offer_id || !communities) {
          return;
        }
        const communityOffers = communities.map((community) => {
          return { community_id: community, offer_id: offer_id };
        });
        knex("CommunityListings")
          .insert(communityOffers)
          .catch((err) => console.error(err));
      },
      (err) => stdErrorHandler(err, res)
    );
}

function updateOffer(req, res) {
  const id = parseInt(req.params.id);
  const body = req.body;

  if (!offerChecker(body))
    return res.status(400).json("Invalid offer properties");

  if (isNaN(id)) {
    return res.status(400).json("Usage: /offers/:id. id has to be a number");
  }

  knex("Offers")
    .where("id", id)
    .update(body)
    .then(
      () => {
        return res.json("Offer updated with id: " + id);
      },
      (err) => stdErrorHandler(err, res)
    );
}

function deleteOffer(req, res) {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json("Usage: /offers/:id. id has to be a number");
  }

  knex("Offers")
    .where("id", id)
    .delete()
    .then(
      () => {
        return res.json("Offer has been removed");
      },
      (err) => stdErrorHandler(err, res)
    );
}

function getUserOffers(req, res) {
  const user_id = parseInt(req.params.id);

  if (isNaN(user_id)) {
    return res
      .status(400)
      .json("Usage: /offers/user/:id. id has to be a number");
  }

  knex("Offers")
    .select()
    .where("user_id", user_id)
    .then(
      (offers) => res.json(offers),
      (err) => stdErrorHandler(err, res)
    );
}

function getOtherOffersCommunity(req, res) {
  const userId = req.params.userId;
  const communityIdsStr = req.query.communities;

  if (isNaN(userId)) {
    return res
      .status(400)
      .json("Usage: /offers/other/:userId. userId has to be a number");
  }

  if (!communityIdsStr) {
    const errMsg =
      "Usage: /offers/other/:user?communities=:cid1,:cid2,.... " +
      "communities has to be a comma-separated array";
    return res.status(400).json(errMsg);
  }

  const communityIds = communityIdsStr.split(",");

  knex("Offers")
    .select("Offers.*")
    .leftJoin("Transactions", "Transactions.offer_id", "Offers.id")
    .leftJoin("CommunityListings", "CommunityListings.offer_id", "Offers.id")
    .whereIn("CommunityListings.community_id", communityIds)
    .whereNot("Offers.user_id", userId)
    .andWhere("Transactions.offer_id", null)
    .groupBy("Offers.id")
    .then(
      (offers) => {
        return res.json(offers);
      },
      (err) => stdErrorHandler(err, res)
    );
}

export {
  getActiveOffersCommunity,
  getActiveOffers,
  getMyActiveOffers,
  getOffers,
  getOffer,
  addOffer,
  deleteOffer,
  updateOffer,
  getUserOffers,
  getOtherOffersCommunity,
};
