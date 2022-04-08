import { host } from "./ServerHost";

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
    throw err;
  }
};

//Fetches a user profile with the email email.
//Returns a profile object if the user exists, otherwise
//An empty array
const getUserProfileByEmail = async (email) => {
  let userProfile = await request("GET", "/users/email/" + email);
  return userProfile;
};

//Fetches a user profile with the email email.
//Returns a profile object if the user exists, otherwise
//An empty array
const getUserProfileById = async (id) => {
  let userProfile = await request("GET", "/users/" + id);
  return userProfile;
};

const getOffers = async (communities) => {
  let offers = await request("GET", "/offers");
  // await communities.forEach(async (community) => {
  //   offers = await request("GET", "/offers/active/" + community);
  // });
  return [...new Set(offers)];
};

const getRequests = async (communities) => {
  let requests = [];
  communities.forEach(async (community) => {
    requests = [
      ...requests,
      ...(await request("GET", "/requests/active/" + community)),
    ];
  });
  return [...new Set(requests)];
};

//Sends an profile to the database, returns the profile
//object with their id added.
const addProfile = async (profile) => {
  const users = await request("POST", "/users", profile);
  const updatedProfile = await getUserProfileByEmail(profile.email);
  return updatedProfile;
};

//Sends an profile to the database, returns the profile
//object with their id added.
const deleteProfile = async (id) => {
  console.log(id);
  const res = await request("DELETE", "/users/" + id)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return res;
};

export {
  getOffers,
  getRequests,
  getUserProfileByEmail,
  getUserProfileById,
  addProfile,
  deleteProfile,
};
