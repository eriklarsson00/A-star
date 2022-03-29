import React from "react";
import { SafeAreaView } from "react-native";
import {
	Divider,
	Icon,
	Layout,
	Text,
	TopNavigation,
	TopNavigationAction,
} from "@ui-kitten/components";
import LoginScreen from "../Screens/LoginScreen";

export const NewScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<LoginScreen />
		</SafeAreaView>
	);
};
