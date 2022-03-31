import React from "react";
import {StyleSheet} from "react-native";
import {Text, Layout, Divider, Button, Modal, Card, Input,List } from "@ui-kitten/components";
import CommunityComponent from '../Components/CommunityComponent'
import tw from 'twrnc'

export const CommunityScreen= () => {
	const [visible, setVisible] = React.useState(false);
	const avaliableCommunities = ['Ängsklockan', 'Rackarberget', 'Majklockan']
	const printCommunity = ({ item, index }) => (
		<CommunityComponent name={item}/>
	  );
	
	console.log(avaliableCommunities)
	return (
			<Layout style={styles.container}>
				<Layout style={tw`pt-5 pb-2`}>
					<Text style={tw`text-lg text-center`}>Community </Text>
				</Layout>
				<Divider/>
				<List
				style={styles.container_list}
				data={avaliableCommunities}
				renderItem={printCommunity}
				key={avaliableCommunities}
    />
				<Layout style={styles.buttonCont}>
					<Button style={styles.button} onPress={() => setVisible(true)}>Lägg till grannskap</Button>
				</Layout>
				<Modal
					visible={visible}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setVisible(false)}>
					<Card disabled={true}>
					<Text>Här ska du skapa nytt grannskap</Text>
					<Input placeholder='Place your Text'/>
					<Button onPress={() => setVisible(false)}>OK</Button>
					</Card>
				</Modal>
            </Layout>
	
	);
};

const styles = StyleSheet.create({ 
    container: {
		flex: 1,
		height: '100%',
		paddingTop:50,
},
container_list: {
	height: 200,
},
buttonCont: {
	alignItems: "center",
	justifyContent: "center",
	position: 'absolute',
	left: 95,
	bottom: 25,
},
button: {
	width: 200,
		
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	  },
}); 