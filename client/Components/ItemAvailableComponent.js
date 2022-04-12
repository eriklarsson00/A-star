import React from "react";
import {
	StyleSheet,
	View,
	Image,
	RefreshControl,
	ScrollView,
} from "react-native";
import {
	Text,
	List,
	ListItem,
	Icon,
	Modal,
	Card,
	Button,
	Layout,
	Radio,
	RadioGroup,
	Input,
} from "@ui-kitten/components";
import tw from "twrnc";
import { useIsFocused } from "@react-navigation/native";
//import { render } from 'react-dom';
import { ShowCommunityIds } from "../assets/AppContext";
import { getOffers } from "../Services/ServerCommunication.js";
import io from "socket.io-client";
import { host } from "../Services/ServerHost";

const DiscoverIcon = (props) => <Icon {...props} name="compass-outline" />;

async function getItems(id, communities) {
	let offers = await getOffers(communities);
	let myItems = [];
	let availableItems = [];
	let myItemsIndex = 0;
	let availableItemsIndex = 0;
	offers.forEach((offer) => {
		if (offer.user_id == id) {
			offer.index = myItemsIndex;
			myItems.push(offer);
			myItemsIndex++;
		} else {
			offer.index = availableItemsIndex;
			availableItems.push(offer);
			availableItemsIndex++;
		}
	});
}

async function getLists() {
	await getItems();
	let arrayList = new Array(2);
	arrayList[0] = {
		//My items
		data: myItems,
		myListings: true,
	};
	arrayList[1] = {
		//All available
		data: availableItems,
		myListings: false,
	};
	return arrayList;
}

export const ItemAvailableComponent = () => {
	const [visible, setVisible] = React.useState(false);
	const [myVisible, setMyVisible] = React.useState(false);
	const { showCommunityIds } = React.useContext(ShowCommunityIds);
	const [takeProduct, setTakeProduct] = React.useState(false);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const [items, setItems] = React.useState([]);
	const isFocused = useIsFocused();

	const id = 1;

	//fetch items on focus
	React.useEffect(() => {
		const fetchItems = async () => {
			let newAvailibleVisibles = [];
			let newMyVisibles = [];
			let offers = await getItems(id, [1, 2, 3]);
			offers[1].data.forEach(() => {
				newAvailibleVisibles.push(false);
			});
			offers[0].data.forEach(() => {
				newMyVisibles.push(false);
			});
			setMyVisible(newMyVisibles);
			setVisible(newAvailibleVisibles);
			setItems(offers);
		};

		if (isFocused) fetchItems();
	}, [isFocused]);

	const socketRef = React.useRef();

	//connect to WebSocket on module load
	React.useEffect(() => {
		socketRef.current = io(host);

		socketRef.current.emit("communities", { ids: ["1", "2"] });

		socketRef.current.on("offer", (offer) => {
			console.log(offer);
			const offers = items;
			if (offer.user_id == id) {
				offers[0].data.push(offer);
			} else {
				offers[1].data.push(offer);
			}
			setItems(offers);
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);

	const toggleAvailibleModal = (i) => {
		visible[i] = !visible[i];
		setVisible([...visible]);
	};

	const toggleMyModal = (i) => {
		myVisible[i] = !myVisible[i];
		setMyVisible([...myVisible]);
	};

	const renderAvailableItems = ({ item }) => (
		<View>
			<ListItem
				style={styles.container}
				onPress={() => {
					toggleAvailibleModal(item.index);
				}}
				// accessoryLeft={"https://picsum.photos/150/150"}
				title={`${item.product_text}`}
				description={`${item.quantity}`}
			/>
			<Modal //Modal for additional information about a product
				visible={visible[item.index]}
				backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
				onBackdropPress={() => toggleAvailibleModal(item.index)}
			>
				<Card disabled={true} style={{ width: 320, flex: 1 }}>
					<Layout style={tw`py-10`}>
						<Image
							style={tw`rounded-full`}
							source={{
								uri: "https://picsum.photos/150/150",
								height: 100,
								width: 100,
							}}
						/>
					</Layout>
					<Text style={{ marginBottom: 10 }}>
						{item.product_text} {item.quantity}
					</Text>
					<Text style={{ marginBottom: 10 }}>
						Utångsdag: {item.time_of_expiration}
					</Text>
					<Text style={{ marginBottom: 10 }}>
						Bruten förpackning: {item.broken_pkg ? "Japp" : "Nepp"}{" "}
					</Text>
					<Text style={{ marginBottom: 10 }}>Användare som lagt upp</Text>
					<Text style={{ marginBottom: 10 }}>{item.description}</Text>
					<Button onPress={() => setTakeProduct(true)}>Ta vara</Button>
				</Card>
			</Modal>

			{/* <Modal //Modal for setting time & requesting an offer
        visible={takeProduct}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        onBackdropPress={() => setTakeProduct(false)}
      >
        <Card disabled={true} style={{ width: 320, flex: 1 }}>
          <Layout style={tw`py-10`}>
            <Image
              style={tw`rounded-full`}
              source={{
                uri: "https://picsum.photos/100/100",
                height: 80,
                width: 80,
              }}
            />
          </Layout>
          <Text style={{ marginBottom: 10 }}>Jag kan hämta varan: </Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={(index) => setSelectedIndex(index)}
          >
            <Radio>Idag</Radio>
            <Radio>Imorgon</Radio>
            <Radio>Inom de närmaste dagarna</Radio>
            <Radio>Annat datum: </Radio>
          </RadioGroup>
          <Input
            style={{ marginBottom: 10 }}
            placeholder="Annat datum"
            disabled={selectedIndex !== 3}
          />
          <Button
            onPress={() => (
              setTakeProduct(false),
              setVisible(false),
              console.log(selectedIndex)
            )}
          >
            Ta vara
          </Button>
        </Card>
      </Modal> */}
		</View>
	);

	const renderMyItems = (
		{ item } //Used for rendering my items
	) => (
		<View>
			<ListItem
				style={styles.container}
				onPress={() => toggleMyModal(item.index)}
				// accessoryLeft={"https://picsum.photos/150/150"}
				title={`${item.product_text} ${item.quantity}`}
				description={`${item.description}`}
			/>
			<Modal
				visible={myVisible[item.index]}
				backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.01)" }}
				onBackdropPress={() => toggleMyModal(item.index)}
			>
				<Card disabled={true}>
					<Text> Min vara {item.title} </Text>
				</Card>
			</Modal>
		</View>
	);

	const renderLists = ({ item }) => (
		<View>
			<Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
				{item.myListings ? "Mina varor" : "TODO: Fixa detta"}
			</Text>
			<List
				data={item.data}
				renderItem={item.myListings ? renderMyItems : renderAvailableItems}
			/>
		</View>
	);

	return (
		/* <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>*/
		<View style={{ flex: 1 }}>
			<List data={items} renderItem={renderLists} />
		</View>
		// </ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 15,
		height: 100,
		marginRight: 10,
		marginLeft: 10,
	},
	spaceBetween: {
		marginBottom: 10,
	},
});
