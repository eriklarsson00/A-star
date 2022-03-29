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
  

function getOffers(req, res) {
  console.log("GET Offers", new Date());
  knex("Offers")
    .select()
    .then((offers) => {
      res.json(offers);
    });
}

function getOffer(req, res) {
  const id = req.params.id;
  console.log("GET Offers/" + id, new Date());
  knex("Offers")
    .select()
    .where("id", id)
    .then((offers) => {
      res.json(offers);
    });
}

export { getOffers, getOffer }
