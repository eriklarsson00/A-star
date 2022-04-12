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

const getUserCommunities = async (user_id) => {
	let userCommunities = await request("Get", "/users/communities" + user_id);
	return userCommunities;
	//console.log(userCommunities);
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

export {
	getOffers,
	getRequests,
	getUserProfileById,
	getUserProfileByEmail,
	addProfile,
	getCommunities,
	getUserCommunities,
	addToCommunity,
	deleteProfile,
};
