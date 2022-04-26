import React from "react";

/*Information if the user is logged in or not */
export const UserLoggedIn = React.createContext();

/* Ids of the communities currently selected to see in
the explore screen*/
export const ShowCommunityIds = React.createContext();

/* Google information */
export const GoogleInfo = React.createContext();

/* Information about all the communties the user is in */
export const MyCommunitysInfo = React.createContext();

/* info om användaren. Innehåller ett objekt med fälten som ska finnas i databasen */
export const UserInfo = React.createContext();
