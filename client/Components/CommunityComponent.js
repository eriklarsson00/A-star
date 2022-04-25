import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, View } from "react-native";
import {
	Text,
	Layout,
	Button,
	useTheme,
	Modal,
	Card,
	Icon,
	Divider,
} from "@ui-kitten/components";
import {
	ShowCommunityIds,
	MyCommunitysInfo,
	UserInfo,
} from "../assets/AppContext";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import { removeUserFromCommunity } from "../Services/ServerCommunication";

const CommunityComponent = (props) => {
	const theme = useTheme();

	//CONTEXT
	const { showCommunityIds, setShowCommunityIds } =
		React.useContext(ShowCommunityIds);

	const { myCommunitysInfo, setMyCommunitysInfo } =
		React.useContext(MyCommunitysInfo);

	const { userInfo } = React.useContext(UserInfo);

	//STATE
	const [removeCommunityVisible, setRemoveCommunityVisible] =
		React.useState(false);

	const [checked, setChecked] = React.useState(
		showCommunityIds.includes(props.community.id)
	);

	//ICONS

	const CrossIcon = () => (
		<Icon
			style={styles.crossStyle}
			fill={theme["color-basic-600"]}
			name="close-circle-outline"
		/>
	);

	async function removeCommunity() {
		if (showCommunityIds.includes(props.community.id)) {
			const newIds = showCommunityIds.filter(
				(comId) => comId != props.community.id
			);
			setShowCommunityIds(newIds);
			await AsyncStorage.setItem("showCommunityIds", JSON.stringify(newIds));
		}
		setMyCommunitysInfo(
			myCommunitysInfo.filter(
				(community) => community.id != props.community.id
			)
		);
		props.setMyCommunityNames(
			props.myCommunityNames.filter((name) => name != props.community.name)
		);
		setRemoveCommunityVisible(false);

		// Remove from database
		await removeUserFromCommunity(userInfo.id, props.community.id);
	}

	const RemoveCommunityModal = () => {
		return (
			<Modal
				visible={removeCommunityVisible}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => setRemoveCommunityVisible(false)}
			>
				<Card disabled={true}>
					<Text style={tw`text-center text-base`}>
						Vill du ta bort {props.community.name} från dina grannskap?
					</Text>
					<Divider />
					<View style={styles.removeCommunityButtons}>
						<Button
							style={{ width: 100, margin: 15 }}
							onPress={async () => await removeCommunity()}
						>
							Ja
						</Button>
						<Button
							style={{ width: 100, margin: 15 }}
							onPress={() => {
								setRemoveCommunityVisible(false);
							}}
						>
							Avbryt
						</Button>
					</View>
				</Card>
			</Modal>
		);
	};

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={async () => {
				setChecked(!checked);
				let newIds;
				if (showCommunityIds.includes(props.community.id)) {
					newIds = showCommunityIds.filter(
						(comId) => comId != props.community.id
					);
					setShowCommunityIds(newIds);
				} else {
					newIds = [...showCommunityIds, props.community.id];
					setShowCommunityIds(newIds);
				}

				await AsyncStorage.setItem(
					"showCommunityIds",
					JSON.stringify(newIds)
				);
			}}
		>
			<Layout style={styles.outer_container}>
				<RemoveCommunityModal />
				<Layout
					style={[
						styles.container,
						{
							backgroundColor: checked
								? theme["color-primary-500"]
								: theme["color-primary-300"],
						},
					]}
				>
					<View style={{ width: 280, flexDirection: "row" }}>
						<Image
							style={tw`ml-5 rounded-md`}
							source={{
								uri: props.community.imgurl,
								height: 50,
								width: 50,
							}}
						/>
						<Text style={tw`pl-2 pt-2.5 text-lg`}>
							{props.community.name}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							setRemoveCommunityVisible(true);
						}}
					>
						<CrossIcon />
					</TouchableOpacity>
				</Layout>
			</Layout>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	container: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		margin: 5,
		width: "90%",
		height: 80,
		borderRadius: 15,
	},
	crossStyle: {
		height: 30,
		width: 30,
	},
	outer_container: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#F5F5F5",
	},
	radio: {
		marginLeft: 260,
		position: "absolute",
	},
	removeCommunityButtons: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
});

export default CommunityComponent;

//OLD layout
{
	/* <Layout
style={[
	styles.container,
	{
		backgroundColor: checked
			? theme["color-primary-400"]
			: theme["color-primary-300"],
	},
]}
>
<View style={{ width: 200 }}>
	<Text style={tw`pl-7 text-lg`}>{props.community.name}</Text>
</View>

<CheckBox
	style={styles.radio}
	checked={
		checked || showCommunityIds.includes(props.community.id)
	}
	onChange={(nextChecked) => {
		setChecked(nextChecked);
		showCommunityIds.includes(props.community.id)
			? setShowCommunityIds(
					showCommunityIds.filter(
						(comId) => comId != props.community.id
					)
			  )
			: setShowCommunityIds([
					...showCommunityIds,
					props.community.id,
			  ]);
	}}
/>
<View style={{ marginLeft: 115, marginBottom: 35 }}>
	<TouchableOpacity
		onPress={() => {
			setRemoveCommunityVisible(true);
		}}
	>
		<CrossIcon />
	</TouchableOpacity>
</View>
</Layout> */
}
