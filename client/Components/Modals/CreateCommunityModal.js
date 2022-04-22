import React from "react";
import {
	StyleSheet,
	View,
	Image,
	ScrollView,
	FlatList,
	TouchableOpacity,
} from "react-native";
import {
	Text,
	Modal,
	Card,
	Button,
	Layout,
	Icon,
	Divider,
	Input,
	useTheme,
	Toggle,
	CheckBox,
} from "@ui-kitten/components";
import tw from "twrnc";
import ImagePicker from "../ImagePicker";

export const CreateCommunityModal = (props) => {
	const theme = useTheme();

	//STATES
	const [communityName, setCommunityName] = React.useState("");
	const [communityDescription, setCommunityDescription] = React.useState("");
	const [communityPassword, setCommunityPassword] = React.useState(null);
	const [communityPrivate, setCommunityPrivate] = React.useState(false);
	const [communityImageUrl, setCommunityImageUrl] = React.useState("");
	const [image, setImage] = React.useState(
		"https://www.uppsalahem.se/globalassets/bilder/omradesbilder/7002/Rackarberget_3.jpg?w=320"
	);
	const [chooseImageVisible, setChooseImageVisible] = React.useState(false);

	const CrossIcon = () => (
		<Icon
			style={styles.crossStyle}
			fill={theme["color-basic-600"]}
			name="arrow-circle-left-outline"
		/>
	);
	const AddIcon = () => (
		<Icon
			style={styles.addIconStyle}
			fill="#8F9BB3"
			name="plus-circle-outline"
		/>
	);
	const CameraIcon = () => (
		<Icon
			style={styles.cameraStyle}
			fill={theme["color-basic-600"]}
			name="camera-outline"
		/>
	);
	const onCheckedChange = (isChecked) => {
		setCommunityPrivate(isChecked);
	};
	const CloseCreateCommunityIcon = () => {
		return (
			<TouchableOpacity onPress={() => props.setVisible(false)}>
				<CrossIcon />
			</TouchableOpacity>
		);
	};
	const ChooseImageIcon = () => {
		return (
			<>
				<Image
					style={tw`rounded-full mt-2`}
					source={{ uri: image, height: 80, width: 80 }}
				/>
				<TouchableOpacity
					onPress={() => {
						setChooseImageVisible(true);
					}}
					style={styles.AddIconContainer}
				>
					<AddIcon />
				</TouchableOpacity>
			</>
		);
	};
	const ChoseImageModal = () => {
		return (
			<Modal
				visible={chooseImageVisible}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => {
					setChooseImageVisible(false);
				}}
			>
				<Card disabled={true}>
					<ImagePicker
						context="CommunityImage" //TODO
						updateResult={(result) => {
							console.log("New picked image path: " + result.uri);
							setImage(result.uri);
						}}
					/>
					<Button
						style={tw`mt-2 w-50`}
						onPress={() => setChooseImageVisible(false)}
					>
						Klar
					</Button>
				</Card>
			</Modal>
		);
	};

	async function createCommunity() {
		// let communityData = {
		// 	name: communityName,
		// 	description: communityDescription,
		// 	private: communityPrivate,
		// 	communityPassword: communityPassword,
		// };
		// await addProfile(accountData, communityIDs); //TODO
		console.log("skapar");
		props.setVisible(false);
	}
	return (
		<Modal
			visible={props.visible}
			backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
			onBackdropPress={() => props.setVisible(false)}
		>
			<Card disabled={true}>
				<ChoseImageModal />
				<View style={{ height: 393, width: 260 }}>
					<View style={{ flexDirection: "row" }}>
						<View style={{ width: 40 }}>
							<CloseCreateCommunityIcon />
						</View>
						<Text style={tw`text-lg font-semibold`}>
							Skapa nytt grannskap
						</Text>
					</View>
					<Divider />
					<ScrollView style={{ flexDirection: "column" }}>
						<View style={{ flexDirection: "row" }}>
							<ChooseImageIcon />
						</View>
						<Input
							style={{ marginTop: 10 }}
							label="Grannskapets namn"
							value={communityName}
							onChangeText={(nextValue) => setCommunityName(nextValue)}
						/>
						<Input
							style={{ marginTop: 10 }}
							label="Beskrivning"
							multiline={true}
							textStyle={{ minHeight: 64 }}
							value={communityDescription}
							onChangeText={(nextValue) =>
								setCommunityDescription(nextValue)
							}
						/>
						<View
							style={{
								marginTop: 10,
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<CheckBox
								style={{ marginRight: 10 }}
								checked={communityPrivate}
								onChange={onCheckedChange}
							/>
							<Text>Privat grannskap</Text>
						</View>
						{communityPrivate && (
							<Input
								style={{ marginTop: 10 }}
								label="Lösenord"
								value={communityPassword}
								onChangeText={(nextValue) =>
									setCommunityPassword(nextValue)
								}
							/>
						)}
						<Button style={tw`mt-2`} onPress={createCommunity}>
							Skapa grannskap
						</Button>
					</ScrollView>
				</View>
			</Card>
		</Modal>
	);
};

const styles = StyleSheet.create({
	addIconStyle: {
		width: 40,
		height: 40,
	},
	AddIconContainer: {
		position: "absolute",
		marginTop: 50,
		marginLeft: 50,
		backgroundColor: "white",
		borderRadius: 50,
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	cameraStyle: {
		width: 60,
		height: 60,
	},
	crossStyle: {
		width: 30,
		height: 30,
		marginBottom: 10,
	},
});

export default CreateCommunityModal;
