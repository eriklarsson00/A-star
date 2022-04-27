import fetch from "node-fetch";
import { stdErrorHandler } from "./common.js";

function getProduct(req, res) {
  const gtin = req.params.gtin;
  const url = "https://productsearch.gs1.se/foodservice/tradeItem/search";
  postData(url, { query: gtin }).then(
    (data) => {
      res.json(data.results[0]);
    },
    (err) => stdErrorHandler(err, res)
  );
}

const postData = (url = "", data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((response) => response.json()); // parses JSON response into native JavaScript objects
};

export { getProduct };
