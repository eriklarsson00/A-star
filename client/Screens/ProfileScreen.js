import React from "react";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import { TopNavigation, Button, Text, Avatar, Layout, Card, Divider, useTheme} from "@ui-kitten/components";
import { UserInfo } from '../assets/AppContext';
import tw from 'twrnc';

export const ProfileScreen = () => {
	return(
	<Layout style={styles.outerContainer} level='1'>
	  <Layout style={tw`py-10`} >
	 		<Image style={tw`rounded-full`} source={{uri: "https://picsum.photos/150/150", height: 150, width: 150}}/>
	  </Layout>
			<Text style={tw`text-3xl`}>Förnamn Efternamn</Text>
	  <Layout style={styles.container}>
		<Card style={styles.card}>
			<Text style={tw`text-center`}>{12}</Text>
			<Divider  />
			<Text style={tw`text-center`}>Gett bort</Text>
		</Card>
	
		<Card style={styles.card} >
			<Text style={tw`text-center`}>123</Text>
			<Divider/>
			<Text style={tw`text-center`}>Tagit</Text>
		</Card>

		<Card style={styles.card}>
			<Text style={tw`text-center`}>5/3</Text>
			<Divider/>
			<Text style={tw`text-center`}>Betyg</Text>
		</Card>
		</Layout>
		<Layout style={[{width:"100%", paddingTop: 66, paddingBottom: 40}]} >
		<Button style={styles.btn} appearance='ghost'> Mina produkter</Button>
		<Button style={styles.btn} appearance='ghost'> Historik </Button>
		<Button style={styles.btn} appearance='ghost'> Kontoinställningar</Button>
		<Button style={styles.btn} appearance='ghost'> Ta bort konto</Button>
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
		alignItems: "center",
	},
	card: {
		alignItems: "center",
		justifyContent: "center",
	 	margin: 5,
		width: 120, 
	},
	btn: {
		borderRadius: 1,
		borderBottomColor: 'gainsboro',
		borderTopColor: "white",
		borderLeftColor: "white",
		borderRightColor: "white",
		margin: 5, 	
	},
	logOut: {
		width: 200,
		borderRadius: 15,
		borderColor: "gainsboro",
		alignSelf: "center",
	},
  });