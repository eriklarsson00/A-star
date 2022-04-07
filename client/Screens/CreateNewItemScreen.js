import React from "react";
import { SafeAreaView, Text, StyleSheet} from "react-native";
import {TopNavigation, Button, useTheme, Input, CheckBox, Layout, Icon} from "@ui-kitten/components";
import tw from 'twrnc'

const CreateNewItemScreen = () => {

	const [product_text, setProduct_test] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [quantity, setQuantity] = React.useState('');
	const [time_of_creation, setTime_of_creation] = React.useState('');
	const [time_of_purchase, setTime_of_purchase] = React.useState('');
	const [time_of_expiration, setTime_of_expiration] = React.useState('');
	const [imgurl, setImgurl] = React.useState('');
	const [broken_pkg, setBroken_pkg] = React.useState(false);

	const theme = useTheme();

	const CameraIcon = () => (
		<Icon style={ styles.lockStyle} fill="black" name='camera-outline'/>
	);
	const PlusIcon = () => (
		<Icon style={ styles.lockStyle} fill="black" name='plus-circle-outline'/>
	);

	return (
		<Layout style={styles.container}>
			<Layout style={tw`pl-5 pb-5`}>
				<Button style={styles.btn} appearance="ghost" accessoryLeft={CameraIcon}> </Button>
			</Layout>
		<Input style={tw`pb-2 pl-5 pr-5`} placeholder='Typ av vara' value={product_text} onChangeText={nextValue => setProduct_test(nextValue)}/>
		<Input style={tw`pb-2 pl-5 pr-5`} placeholder='Beskrivning av vara' value={description} onChangeText={nextValue => setDescription(nextValue)}/>
		<Input style={tw`pb-2 pl-5 pr-5`} placeholder='Antal*' value={quantity} onChangeText={nextValue => setQuantity(nextValue)}/>
		 {/* <Input label='Enhet' value={unit} /> */}
		<Input style={tw`pb-2 pl-5 pr-5`} placeholder='Datum varan köptes' value={time_of_purchase} onChangeText={nextValue => setTime_of_purchase(nextValue)}/>
		<Input style={tw`pb-2 pl-5 pr-5`} placeholder='Datum varan skapades' value={time_of_creation} onChangeText={nextValue => setTime_of_creation(nextValue)}/>
		<Input style={tw`pb-2 pl-5 pr-5`} placeholder='Utgångsdatum' value={time_of_expiration} onChangeText={nextValue => setTime_of_expiration(nextValue)}/>
		<CheckBox style={styles.checkbox} checked={broken_pkg} onChange={nextChecked => setBroken_pkg(nextChecked)}> 
			{evaProps => <Text {...evaProps} style={{fontSize: 16, paddingLeft: 5, color: theme['color-basic-700'] }}>Bruten förpackning</Text>}</CheckBox>
		<Layout style={tw`pl-5 pb-5`}>
			<Button style={styles.btn} appearance="ghost" accessoryLeft={PlusIcon}> </Button>
		</Layout>
		<Layout style={tw`pt-25`}>
			<Button style={styles.createBtn}>Skapa inlägg</Button>
		</Layout>
		</Layout>
	);
};

export default CreateNewItemScreen


const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		paddingTop:50,
		
	},
	checkbox: {
		paddingTop: 10,
		paddingLeft: 20,
	  },
	lockStyle: {
		width: 55,
		height: 55,
	},
	btn: {
		width: 75,
		height: 70,
		borderColor: "grey",
		paddingLeft: 33,
	},
	createBtn: {
		alignSelf: "center",
		width: 200,
		height: 50,
	}
		
})

