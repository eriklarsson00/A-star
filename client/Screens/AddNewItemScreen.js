import React from "react";
import { SafeAreaView, Text, StyleSheet} from "react-native";
import {TopNavigation, Button , Modal, Card, Divider} from "@ui-kitten/components";
import tw from 'twrnc'

export const AddNewItemScreen = () => {

	const [visible, setVisible] = React.useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<Button style= {styles.btn} onPress={() => setVisible(true)}>Gives</Button>
			<Button style= {styles.btn} onPress={() => setVisible(true)}>Sökes </Button>
			<Modal
					visible={visible}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setVisible(false)}>
					<Card disabled={true}>
					<Text style={tw`text-lg font-semibold`}>text</Text>
					<Divider/>
					<Button onPress={() => setVisible(false)}>OK</Button>
					</Card>
				</Modal>
		</SafeAreaView>
	);
};


const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems:'center',
        justifyContent:'center'
		
	},
	btn: {
	
	}
		
})

