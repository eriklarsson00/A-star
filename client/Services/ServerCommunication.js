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

const getCommunities = async () => {
  let communities = await request("Get", "/communities");
  return [...new Set(communities)];
};

const getRequests = async (communities) => {
  let requests = await request("GET", "/requests");
  // communities.forEach(async (community) => {
  //   requests = [...requests, ...await request("GET", "/requests/active/" + community)];
  // });
  return [...new Set(requests)];
};

//Sends an profile to the database, returns an array with the profile
//object with their id added.
const addProfile = async (profile, communities) => {
  const users = await request("POST", "/users", profile);
  const updatedProfile = await getUserProfileByEmail(profile.email);
  await addToCommunity(updatedProfile[0].id, communities);
  return updatedProfile;
};

const addTransaction = async (transaction) => {
  return await request("POST", "/transactions", transaction);
};

const addToCommunity = async (profile_id, communities) => {
  for (const id of communities) {
    let upload_obj = {
      user_id: profile_id,
      community_id: id,
    };
    const result = await request("POST", "/users/community/", upload_obj);
  }
};
const deleteProfile = async (id) => {
  const res = await request("DELETE", "/users/" + id)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return res;
};

const pushToServer = async (result) => {
  const image = await resizeImage(result, props.resize);
  const body = new FormData();
  body.append("image", {
    name: "photo.jpg",
    type: image.type,
    uri: image.uri,
  });

  var url =
    "http://ec2-3-215-18-23.compute-1.amazonaws.com/users/profile/" +
    userInfo.id;

  fetch(url, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((data) => data.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

resizeImage = async (result, resize = 1) => {
  const manipResult = await ImageManipulator.manipulateAsync(
    result.uri,
    [
      {
        resize: {
          width: result.width * resize,
          height: result.height * resize,
        },
      },
    ],
    { compress: 1 }
  );
  return manipResult;
};

export {
  getOffers,
  getRequests,
  getUserProfileById,
  getUserProfileByEmail,
  addProfile,
  getCommunities,
  addToCommunity,
  addTransaction,
  deleteProfile,
  pushToServer,
};
