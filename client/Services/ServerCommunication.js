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
  return await request("GET", "/users/email/" + email);
};

//Fetches a user profile with the email email.
//Returns a profile object if the user exists, otherwise
//An empty array
const getUserProfileById = async (id) => {
  return await request("GET", "/users/" + id);
};

const getMyActiveOffers = async (id) => {
  return await request("GET", "/offers/myactive/" + id);
};

const getOffers = async (id, communities) => {
  let query = "?communities=" + communities.join(",");
  let offers = await request("GET", "/offers/other/" + id + query);
  return offers;
};

const getCommunities = async () => {
  let communities = await request("Get", "/communities");
  return [...new Set(communities)];
};

const getUserCommunities = async (user_id) => {
  return await request("Get", "/users/community/" + user_id);
};

const getMyActiveRequests = async (id) => {
  return await request("GET", "/requests/myactive/" + id);
};

const getRequests = async (id, communities) => {
  let query = "?communities=" + communities.join(",");
  return await request("GET", "/requests/other/" + id + query);
};

const getOngoingTransactionsOwner = async (uid) => {
  return await request("GET", `/transactions/ongoing/owner/${uid}`);
};

const getOngoingTransactionsResponder = async (uid) => {
  return await request("GET", `/transactions/ongoing/responder/${uid}`);
};

//Sends an profile to the database, returns an array with the profile
//object with their id added.
const addProfile = async (profile, communities) => {
  await request("POST", "/users", profile);
  const updatedProfile = await getUserProfileByEmail(profile.email);
  await addToCommunity(updatedProfile[0].id, communities);
  return updatedProfile;
};

const editProfile = async (profile, user_id) => {
  const updatedProfile = await request("PUT", "/users/" + user_id, profile);
  return updatedProfile;
};

const getPendingTransactions = async (user_id) => {
  let transactions = await request(
    "Get",
    "/transactions/pending/user/" + user_id
  );
  return transactions;
};

const getCompletedTransactions = async (user_id) => {
  let completedResponder = await request(
    "GET",
    "/transactions/completed/responder/" + user_id
  );
  let completedLister = await request(
    "GET",
    "/transactions/completed/owner/" + user_id
  );
  return completedLister.concat(completedResponder);
};

const addTransaction = async (transaction) => {
  return await request("POST", "/transactions", transaction);
};

const deleteTransaction = async (id) => {
  return await request("DELETE", `/transactions/${id}`);
};

const acceptTransaction = async (id) => {
  return await request("PUT", `/transactions/${id}/accept`);
};

const ownerConfirmTransaction = async (id) => {
  return await request("PUT", `/transactions/${id}/ownerConfirm`);
};

const responderConfirmTransaction = async (id) => {
  return await request("PUT", `/transactions/${id}/responderConfirm`);
};

const updateRating = async (user_id, rating) => {
  let msg_body = { rating: rating };
  return await request("PUT", `/users/${user_id}/rate`, msg_body);
};

const addToCommunity = async (profile_id, communities) => {
  // Should be refactored to only send one request with all communities
  for (const id of communities) {
    const upload_obj = {
      user_id: profile_id,
      community_id: id,
    };

    const result = await request("POST", "/users/community/", upload_obj);
  }
};

const deleteProfile = async (id) => {
  return await request("DELETE", "/users/" + id).catch((err) =>
    console.error(err)
  );
};

const removeUserFromCommunity = async (userId, communityId) => {
  const obj = {
    user_id: userId,
    community_id: communityId,
  };

  return await request("DELETE", "/users/community", obj).catch((err) =>
    console.error(err)
  );
};

const pushImagesToServer = async (image, serverPath, userId) => {
  const body = new FormData();
  if (!image) {
    //om det inte finns någon bild ska det bli en stock photo
    body.append("image", {
      name: "photo.jpg",
      type: "jpg",
      uri: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
    });
  } else {
    body.append("image", {
      name: "photo.jpg",
      type: image.type,
      uri: image.uri,
    });
  }
  var url = "";
  if (serverPath === "Profile") {
    url = host + "/users/profile/" + userId;
  } else {
    url = host + "/" + serverPath;
  }

  return await fetch(url, {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((data) => data.json())
    .catch((err) => console.err(err));
};

const postOffer = async (offers, usercommunities) => {
  const upload_obj = {
    offer: offers,
    communities: usercommunities,
  };
  return await request("POST", "/offers", upload_obj);
};

const postRequest = async (requests, usercommunities) => {
  console.log("communities");
  console.log(usercommunities);
  const upload_obj = {
    request: requests,
    communities: usercommunities,
  };

  const response = await request("POST", "/requests", upload_obj);
  console;
  console.log(response);
  return response;
};

const addCommunity = async (community) => {
  return await request("POST", "/communities", community);
};

const deleteOffer = async (id) => {
  return await request("DELETE", `/offers/${id}`);
};

const deleteRequest = async (id) => {
  return await request("DELETE", `/requests/${id}`);
};
export {
  getMyActiveOffers,
  getOffers,
  getMyActiveRequests,
  getRequests,
  getUserProfileById,
  getUserProfileByEmail,
  addProfile,
  getPendingTransactions,
  getCompletedTransactions,
  getCommunities,
  getUserCommunities,
  getOngoingTransactionsOwner,
  getOngoingTransactionsResponder,
  addToCommunity,
  acceptTransaction,
  ownerConfirmTransaction,
  responderConfirmTransaction,
  updateRating,
  addTransaction,
  deleteProfile,
  deleteTransaction,
  removeUserFromCommunity,
  pushImagesToServer,
  postOffer,
  postRequest,
  addCommunity,
  editProfile,
  deleteRequest,
  deleteOffer,
};
