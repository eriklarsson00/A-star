import React from "react";
import { SafeAreaView, Text } from "react-native";
import { TopNavigation, Button } from "@ui-kitten/components";
import { UserInfo } from '../assets/AppContext'
import tw from 'twrnc';
export const ProfileScreen = () => {
	 
	const { userName, setUserName } = React.useContext(UserInfo);
	return (
		<SafeAreaView>
			<Text>Profile screen</Text>
			<Text>Hello {userName}</Text>
			<Button style={tw`m-2 w-20`}onPress={() =>{
		 setUserName('Kajsa')
	 }} title="Kajsa"> Kajsa </Button>
	 	<Button style={tw`m-2 w-20`} onPress={() =>{
		 setUserName('Anna')
	 }} title="Anna">Anna</Button>
		</SafeAreaView>
		
	);
};
