import React from "react";
import { SafeAreaView } from "react-native";
import { Text, Layout} from "@ui-kitten/components";
import { UserInfo, CommunityInfo } from '../assets/AppContext'
import tw from 'twrnc'

export const OngoingScreen = () => {
	const { userName, setUserName } = React.useContext(UserInfo);
	const {community, setCommunity} = React.useContext(CommunityInfo);
	console.log(userName)
	console.log(community)

	return (
		<SafeAreaView>
			<Text>Ongoing screen</Text>
			<Text>YOU ARE: {userName}</Text>
			<Text>YOU ARE INnnn: {community}</Text>

		</SafeAreaView>
	);
};
