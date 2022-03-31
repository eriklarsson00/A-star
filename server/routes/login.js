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

function userExists(req, res) {
  const body = req.body;
  const email = body.email;
  knex("Users")
    .select()
    .where("email", email)
    .then((users) => {
      res.json({ exists: users.length });
    });
}

export { userExists };
