import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
	Text,
	Layout,
	Divider,
	Button,
	Modal,
	Card,
	Input,
	Icon,
	List,
	useTheme,
	ListItem,
} from "@ui-kitten/components";
import CommunityComponent from "../Components/CommunityComponent";
import CreateCommunityModal from "../Components/Modals/CreateCommunityModal";
import tw from "twrnc";
import {
	UserInfo,
	MyCommunitysInfo,
	ShowCommunityIds,
	ProfileImagePath,
} from "../assets/AppContext";
import {
	getCommunities,
	addToCommunity,
} from "../Services/ServerCommunication";

async function getAllCommunities() {
	let communities = await getCommunities();
	return communities;
}

export const CommunityScreen = () => {
	//CONTEXT
	const { myCommunitysInfo, setMyCommunitysInfo } =
		React.useContext(MyCommunitysInfo);
	const { showCommunityIds, setShowCommunityIds } =
		React.useContext(ShowCommunityIds);
	const { userInfo, setUserInfo } = React.useContext(UserInfo);

	//STATE
	const [addCommunityVisible, setAddCommunityVisible] = React.useState(false);
	const [createCommunityVisible, setCreateCommunityVisible] =
		React.useState(false);
	const [joinCommunity, setJoinCommunity] = React.useState(false);
	const [IncorrectCommunityPassword, setIncorrectCommunityPassword] =
		React.useState(false);
	const [joinPrivateCommunity, setJoinPrivateCommunity] =
		React.useState(false);
	const [communityPasswordInput, setCommunityPasswordInput] =
		React.useState("");
	const [chosenCommunity, setChosenCommunity] = React.useState({});
	const [dataBaseCommunities, setDataBaseCommunities] = React.useState([]);
	const [myCommunityNames, setMyCommunityNames] = React.useState([]);

	//ÖVRIGT
	const isFocused = useIsFocused();
	const theme = useTheme();

	React.useEffect(() => {
		const getComm = async () => {
			setDataBaseCommunities(await getAllCommunities());
		};
		getComm();
		setMyCommunityNames(myCommunitysInfo.map((comm) => comm.name));
	}, [isFocused]);

	//FUNKTIONER SOM RETURNERAR KOD
	const printCommunity = ({ item, index }) => (
		<CommunityComponent
			community={item}
			setMyCommunityNames={setMyCommunityNames}
			myCommunityNames={myCommunityNames}
		/>
	);

	const CloseAddCommunityIcon = () => {
		return (
			<TouchableOpacity onPress={() => closeAddCommunity()}>
				<CrossIcon />
			</TouchableOpacity>
		);
	};

	const printExistingCommunities = (
		{ item, index } //DETTA ÄR VAD SOM RENDERAS FÖR VARJE ITEM I LÄGG TILL GRANNSKAP
	) => (
		<TouchableOpacity
			style={[
				styles.touchableStyle,
				{
					backgroundColor:
						chosenCommunity.name == item.name
							? theme["color-basic-300"]
							: theme["color-basic-100"],
				},
			]}
			onPress={() => {
				chosenCommunity.name == item.name
					? setChosenCommunity({})
					: setChosenCommunity(item);
			}}
		>
			<View style={styles.communityContainer}>
				<View style={{ width: 215 }}>
					<Text style={tw`text-lg`}>{item.name}</Text>
				</View>
				{item.private === 1 && <LockIcon />}
			</View>
			{chosenCommunity.name == item.name && (
				<View>
					<Divider
						style={{
							marginBottom: 5,
							alignSelf: "stretch",
							backgroundColor: theme["color-basic-400"],
						}}
					/>
					<View style={styles.communityImageContainer}>
						<Image
							style={styles.communityImage}
							source={{
								uri: item.imgurl,
								height: 60,
								width: 80,
							}}
						/>
						<View style={styles.communityDescription}>
							<Text style={tw`mb-2 mt-1`}>{item.description}</Text>
							<View style={styles.communityImageJoin}></View>
						</View>
					</View>
					{item.private === 1 && (
						<Text style={tw`font-semibold`}>Privat grannskap</Text>
					)}
					<Text>Antal medlemmar {item.members}</Text>
					<Text>Plats: {item.location}</Text>
					<Button
						style={{ margin: 5 }}
						onPress={() =>
							item.private === 1
								? setJoinPrivateCommunity(true)
								: setJoinCommunity(true)
						}
					>
						Gå med
					</Button>
				</View>
			)}
		</TouchableOpacity>
	);

	//FUNKTIONER ÖVRIGA

	const giveKey = ({ item, index }) => reuturn(item);

	function closeAddCommunity() {
		setAddCommunityVisible(false);
		setChosenCommunity({});
	}

	function tryPassword() {
		if (communityPasswordInput === chosenCommunity.password) {
			addCommunity();
			setJoinPrivateCommunity(false);
			setIncorrectCommunityPassword(false);
			setCommunityPasswordInput("");
		} else {
			setIncorrectCommunityPassword(true);
			setCommunityPasswordInput("");
		}
	}

	async function addCommunity() {
		setMyCommunityNames([...myCommunityNames, chosenCommunity.name]);
		setJoinCommunity(false);
		closeAddCommunity();
		setMyCommunitysInfo([...myCommunitysInfo, chosenCommunity]);
		await addToCommunity(userInfo.id, [chosenCommunity.id]);
	}

	//IKONER
	const LockIcon = () => (
		<Icon style={styles.lockStyle} fill="#8F9BB3" name="lock-outline" />
	);
	const EditIcon = () => (
		<Icon style={styles.editStyle} fill="#8F9BB3" name="edit-2-outline" />
	);

	const CrossIcon = () => (
		<Icon
			style={styles.crossStyle}
			fill={theme["color-basic-600"]}
			name="close-circle-outline"
		/>
	);

	//KODEN FÖR SIDAN

	return (
		<Layout style={[styles.container]}>
			<Layout style={tw`pt-5 pb-2`}>
				<Text style={tw`text-lg text-center`}>Grannskap </Text>
			</Layout>
			<View
				style={{
					paddingTop: 5,
					backgroundColor: theme["color-basic-200"],
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Text style={tw`text-base`}>Välj grannskap att visa</Text>
				<Divider
					style={{
						backgroundColor: theme["color-basic-400"],
						width: 300,
					}}
				/>
			</View>
			<List
				style={styles.container_list}
				data={myCommunitysInfo}
				renderItem={printCommunity}
				key={giveKey}
				// containerStyle={styles.list_style}
			/>
			<Layout style={styles.buttonCont}>
				<Button
					style={styles.button}
					onPress={() => setAddCommunityVisible(true)}
				>
					Lägg till grannskap
				</Button>
			</Layout>
			<Modal
				visible={addCommunityVisible}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => closeAddCommunity()}
			>
				<Card disabled={true}>
					<View style={{ flex: 1, flexDirection: "row" }}>
						<View style={{ width: 230 }}>
							<Text style={tw`text-lg font-semibold`}>
								Lägg till grannskap
							</Text>
						</View>
						<CloseAddCommunityIcon />
					</View>
					<Divider />
					<List
						style={styles.dataBaseList}
						data={dataBaseCommunities.filter(
							(comm) => !myCommunityNames.includes(comm.name)
						)}
						ItemSeparatorComponent={Divider}
						renderItem={printExistingCommunities}
						key={giveKey}
					/>
					<Button
						style={tw`mt-2`}
						onPress={() => setCreateCommunityVisible(true)}
					>
						Skapa nytt grannskap
					</Button>
					<Divider />
				</Card>
			</Modal>
			<CreateCommunityModal
				visible={createCommunityVisible}
				setVisible={setCreateCommunityVisible}
			/>
			<Modal
				visible={joinCommunity}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => setJoinCommunity(false)}
			>
				<Card disabled={true}>
					<Text style={tw`text-lg font-semibold text-center`}>
						Vill du gå med i {chosenCommunity.name} ?
					</Text>
					<View style={styles.joinCommunityModal}>
						<Button
							style={{ width: 100, marginRight: 15 }}
							onPress={addCommunity}
						>
							Ja
						</Button>
						<Button
							style={{ width: 100, marginLeft: 15 }}
							onPress={() => setJoinCommunity(false)}
						>
							Nej
						</Button>
					</View>
					<Divider />
				</Card>
			</Modal>
			<Modal
				visible={joinPrivateCommunity}
				backdropStyle={styles.backdrop}
				onBackdropPress={() => setJoinPrivateCommunity(false)}
			>
				<Card disabled={true}>
					<Text style={tw`text-lg font-semibold text-center`}>
						{chosenCommunity.name} är ett privat grannskap
					</Text>
					<View style={styles.joinPrivateCommunityModal}>
						{IncorrectCommunityPassword && <Text>Fel lösenord!</Text>}
						<Input
							label="skriv in lösenord för grannskapet för att gå med"
							value={communityPasswordInput}
							onChangeText={(nextValue) =>
								setCommunityPasswordInput(nextValue)
							}
						/>
						<View style={styles.joinPrivateCommunityModalButtons}>
							<Button
								style={{ width: 100, margin: 15 }}
								onPress={() => tryPassword()}
							>
								OK
							</Button>
							<Button
								style={{ width: 100, margin: 15 }}
								onPress={() => {
									setJoinPrivateCommunity(false);
									setIncorrectCommunityPassword(false);
								}}
							>
								Avbryt
							</Button>
						</View>
					</View>
				</Card>
			</Modal>
		</Layout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		paddingTop: 50,
	},
	container_list: {
		paddingTop: 10,
		height: 200,
	},
	buttonCont: {
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		left: 95,
		bottom: 25,
	},
	button: {
		width: 200,
	},
	backdrop: {
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	communityContainer: {
		flex: 1,
		flexDirection: "row",
	},
	communityImageContainer: {
		flex: 1,
		flexDirection: "row",
	},
	communityDescription: {
		width: 130,
		marginLeft: 10,
	},
	communityImageJoin: {
		backgroundColor: "red",
		width: 100,
	},
	crossStyle: {
		width: 30,
		height: 30,
		marginBottom: 10,
	},
	dataBaseList: {
		backgroundColor: "white",
		height: 300,
	},
	// list_style: {
	// 	backgroundColor: "red",
	// },
	editStyle: {
		width: 25,
		height: 25,
		alignSelf: "flex-end",
		paddingRight: 150,
		marginBottom: -10,
	},
	lockStyle: {
		width: 25,
		height: 25,
	},
	joinCommunityModal: {
		flex: 1,
		flexDirection: "row",
		width: 300,
		justifyContent: "center",
	},
	joinPrivateCommunityModal: {
		flex: 1,
		flexDirection: "column",
		width: 300,
		justifyContent: "center",
	},
	joinPrivateCommunityModalButtons: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
	},
	touchableStyle: {
		padding: 10,
	},
});
