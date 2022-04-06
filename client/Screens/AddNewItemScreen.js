import React from "react";
import { SafeAreaView, Text, StyleSheet} from "react-native";
import {TopNavigation, Button, useTheme, Layout} from "@ui-kitten/components";
import tw from 'twrnc'

const AddNewItemScreen = ({navigation}) => {

	const [visible, setVisible] = React.useState(false);
	const theme = useTheme();

	return (
		<Layout style={styles.container}>
			<Button style={[styles.btn, {backgroundColor: theme['color-primary-400'], borderColor: theme['color-primary-400']}]} onPress={() => setVisible(true)}>Gives</Button>
			<Button style={[styles.btn, {backgroundColor: theme['color-primary-500']}]} onPress={() => navigation.navigate('CreateNewItemScreen')}>Sökes </Button>
			{/* <Modal
					presentationStyle="pageSheet"
					visible={visible}
					backdropStyle={styles.backdrop}
					onBackdropPress={() => setVisible(false)}>
					<Card disabled={true}>
					<Text style={tw`text-lg font-semibold`}>text</Text>
					<Divider/>
					<Button onPress={() => setVisible(false)}>OK</Button>
					</Card>
				</Modal> */}
		</Layout>
	);
};

export default AddNewItemScreen


const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems:'center',
        justifyContent:'center'
		
	},
	btn: {
		borderRadius: 15,
		width: 150,
		height: 70,
		margin: 50, 
	
	}
		
})

