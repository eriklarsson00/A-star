import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../Screens/HomeScreen";
import { DetailsScreen } from "../Screens/Details";
import { NewScreen } from "../Screens/NewScreen";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
	<Navigator screenOptions={{ headerShown: false }}>
		<Screen name="Home" component={HomeScreen} />
		<Screen name="Details" component={DetailsScreen} />
		<Screen name="New" component={NewScreen} />
	</Navigator>
);

export const AppNavigator = () => (
	<NavigationContainer>
		<HomeNavigator />
	</NavigationContainer>
);
