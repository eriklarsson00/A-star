const dbconfig = require("./dbconfig").config;
const knex = require("knex")({
  client: "mysql2",
  connection: dbconfig,
});

knex("Communities")
  .insert({
    name: "Majklockan",
    description: "Grannskap för majklockan",
    location: "Majklockan",
    private: false,
  })
  .then(() => console.log("data inserted"))
  .finally(() => {
    knex.destroy();
  });

knex
  .select()
  .from("Communities")
  .then((rows) => {
    console.log(rows);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
