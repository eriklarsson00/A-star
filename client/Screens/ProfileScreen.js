import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { TopNavigation, Button, Text, Avatar, Layout } from "@ui-kitten/components";
import { UserInfo } from '../assets/AppContext'
import ProfileInfoComponent from '../Components/ProfileInfoComponent'
import tw from 'twrnc';

export const ProfileScreen = () => {
	 
	const ratingInfo = new Array(20).fill({
		given: '15',
		taken: "10",
		rating: "3/5"
	})
	return (
		<Layout style= {styles.container}>
			
				<Avatar style={styles.avatar} size='giant' source={require('../assets/favicon.png')}/> 
				<Layout styles={styles.con}>
					<ProfileInfoComponent value ={2} heading={"Gett bort"}/>
					<ProfileInfoComponent value ={2} heading={"Tagit emot"}/>
				 </Layout>
			
		</Layout>
	)
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: "center",
		flex: 1,
	},
	con: {
		flexDirection: "row",
	},
	avatar: {
		margin: 8,

	}
})
// {/* <Text>Profile screen</Text>
// <Text>Hello {userName}</Text>
// <Button style={tw`m-2 w-20`}onPress={() =>{
// setUserName('Kajsa')
// }} title="Kajsa"> Kajsa </Button>
// <Button style={tw`m-2 w-20`} onPress={() =>{
// setUserName('Anna')
// }} title="Anna">Anna</Button> */}
// 	);
