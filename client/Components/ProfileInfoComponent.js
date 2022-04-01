import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { TopNavigation, Button, Text, Avatar, Layout , Divider} from "@ui-kitten/components";
import { UserInfo } from '../assets/AppContext'
import tw from 'twrnc';

const ProfileInfoComponent = (props) => {
	return (
		<Layout style={styles.container}>
			{/* <Text> {props.value} </Text>
			<Divider style={styles.divider} />
			<Text> {props.heading} </Text>  */}
		</Layout>
	)
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: "center",
		flex: 1,
	},
	divider:{ 
		marginLeft: 12,
		alignSelf : 'stretch', 
		width:50, 
		backgroundColor : 'gray'},
})

export default ProfileInfoComponent;
