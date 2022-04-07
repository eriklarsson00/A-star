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

const users = await request("POST", "/users", {firstname: "kalle"});

const communities = await request("GET", "/communities");

const user = async (id) => await request("GET", "/users/" + id);

const userEmail = async (email) =>
  await request("GET", "/users/email/" + email);

const userCommunities = async (id) =>
  await request("GET", "/users/community/" + id);

//ROUTES
//  
//  /users 
//    GET: Returns all users in database
//    POST: Adds user to database
//  /users/:id
//    GET: Get user on id
//    PUT: Update user on id
//    DELETE: Delete user on id
//  /users/community
//    POST: Add user to community
//    (BODY EXAMPLE : {user_id: 1, community_id: 2})
//  /users/community/:id
//    GET: Get all communities user id has joined
//
//  /login
//    POST: Send body {email:"email"} to find out if user with email exists
//
//  /communities
//    GET: Returns all communities in the database
//    POST: Adds commmunity to the database
//
//  /communities/:id
//    GET: Return community on id
//    PUT: Update community on id
//    DELETE: Delete community on id
//
//  /communities/members/:id
//    GET: Return members in community
//
//  /offers
//    GET: Returns all offers in the database
//    POST: Adds offer to the database, sends offer over WebSocket to all connected clients in community
//
//  /offers/:id
//    GET: Return offer on id
//    PUT: Update offer on id
//    DELETE: Delete offer on id
//
//  /offers/active
//    GET: Returns all offers that are not in a transaction
//
//  /offers/active/:community
//    GET: Returns all offers that are not in a transaction in community id
//
//  /requests
//    GET: Returns all requests in the database
//    POST: Adds request to the database, sends request over WebSocket to all connected clients in community
//
//  /requests/:id
//    GET: Return request on id
//    PUT: Update request on id
//    DELETE: Delete request on id
//
//  /requests/active
//    GET: Returns all requests that are not in a transaction
//
//  /requests/active/:community
//    GET: Returns all requests that are not in a transaction in community id
//
//  /transactions
//    GET: Returns all transactions in database
//    POST: Adds new transaction to databse
//
//  /transactions/:id
//    GET: Return transaction on id
//    PUT: Update transaction on id
//    DELETE: Delete transaction on id
//
//  /transactions/community/:id
//    GET: Return communities that offer / request was listed in
//
//  /transactions/responder/:id
//    GET: Return transactions that user_id id has responded to
//
//  /transactions/lister/:id
//    GET: Return transaction that user_id id has listed
//