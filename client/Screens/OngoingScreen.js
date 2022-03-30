import React from "react";
import { SafeAreaView, Text } from "react-native";
import { } from "@ui-kitten/components";
import { UserInfo } from '../assets/AppContext'
import tw from 'twrnc'

export const OngoingScreen = () => {
	const { userName, setUserName } = React.useContext(UserInfo);

	return (
		<SafeAreaView>
			<Text>Ongoing screen</Text>
			<Text>YOU ARE: {userName}</Text>
		</SafeAreaView>
	);
};
