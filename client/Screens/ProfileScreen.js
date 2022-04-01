import React from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import { TopNavigation, Button, Text, Avatar, Layout, Card, Divider, ButtonGroup, List, ListItem} from "@ui-kitten/components";
import { UserInfo } from '../assets/AppContext'
import ProfileInfoComponent from '../Components/ProfileInfoComponent'
import tw from 'twrnc';

// ska hämta info från databasen
export const ProfileScreen = () => {
   
	const info = [{
		given: '15',
		taken: "10",
		rating: "3/5"
	}];

	return(
	<Layout style={styles.outerContainer} level='1'>
	  <Layout style={tw`py-10`} >
	 		<Image style={tw`rounded-full`} source={{uri: "https://picsum.photos/150/150", height: 150, width: 150}}/>
	  </Layout>
			<Text style={tw`text-3xl`}>Förnamn Efternamn</Text>
	  <Layout style={styles.container}>
		<Card style={styles.card}>
			<Text>{info.given}</Text>
			<Divider/>
			<Text>Gett bort</Text>
		</Card>
	
		<Card style={styles.card} >
			<Text>123</Text>
			<Divider/>
			<Text>tagit emot</Text>
		</Card>

		<Card style={styles.card}>
			<Text>5/3</Text>
			<Divider/>
			<Text>Betyg</Text>
		</Card>
		</Layout>
		<Layout style={tw`py-20 `}>

			<Button>Logga ut</Button>
		</Layout>

	</Layout>
	);
};
  
  const styles = StyleSheet.create({
	container: {
		paddingTop: 30,
	 	flexDirection: 'row',
		flexWrap: 'wrap',
	},
	outerContainer: {
		paddingTop: 50,
		flexDirection: 'column',
	  	flexWrap: 'wrap',
		alignItems: "center"
	},
	card: {
		alignItems: "center",
		justifyContent: "center",
	 	margin: 5,
		width: 120, 
	},
	btn: {
		
	}
  });