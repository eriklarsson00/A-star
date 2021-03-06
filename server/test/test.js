import { communityTests } from "./communities.js";
import { createRequire } from "module";
import { offerTests } from "./offers.js";
import { requestTests } from "./requests.js";
import { server } from "../server.js";
import { transactionTests } from "./transactions.js";
import { userTests } from "./users.js";
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

describe("", () => {
  before(async () => {
    await knex
      .raw("call p_insert_dummy_data();")
      .then(() => console.log("Cleared test-db and inserted dummy data.\n"));
  });

  describe("Database endpoints", () => {
    userTests(server);
    communityTests(server);
    offerTests(server);
    requestTests(server);
    transactionTests(server);
  });
});
