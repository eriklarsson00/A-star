import fetch from "node-fetch";

const host = "http://localhost:8080";

const request = async (type, route, body) => {
  try {
    let response = await fetch(`${host}${route}`, {
      method: type,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // body data type must match "Content-Type" header
    }).then((data) => data.json());
    return await response;
  } catch (err) {
    return err;
  }
};

const users = await request("GET", "/users");

const communities = await request("GET", "/communities");

const user = async (id) => await request("GET", "/users/" + id);

const userEmail = async (email) =>
  await request("GET", "/users/email/" + email);

const userCommunities = async (id) =>
  await request("GET", "/users/community/" + id);