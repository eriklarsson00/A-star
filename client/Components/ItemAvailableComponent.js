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
import { CommunityInfo } from "../assets/AppContext";
import { getOffers } from "../Services/ServerCommunication.js";
import io from "socket.io-client";
import { host } from "../Services/ServerHost";

export const ItemAvailableComponent = () => {
  const { community } = React.useContext(CommunityInfo);
  const [takeProduct, setTakeProduct] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [offers, setOffers] = React.useState([]);
  const [myOffers, setMyOffers] = React.useState([]);
  const isFocused = useIsFocused();

  const id = 1;
  const communities = [1, 2];

  //fetch items on focus

  React.useEffect(() => {
    const fetchItems = async () => {
      let myItems = [];
      let otherItems = [];
      let items = await getOffers(communities).catch((e) => console.log(e));
      items.forEach((item) => {
        item.visible = false;
        if (item.user_id == id) {
          myItems.push(item);
        } else {
          otherItems.push(item);
        }
      });
      setMyOffers(myItems);
      setOffers(otherItems);
    };

    if (isFocused) fetchItems();
  }, [isFocused]);

  const socketRef = React.useRef();

  //connect to WebSocket on module load
  React.useEffect(() => {
    socketRef.current = io(host);

    socketRef.current.emit("communities", { ids: ["1", "2"] });

    socketRef.current.on("offer", (offer) => {
      offer.visible = false;
      if (offer.user_id == id) {
        setMyOffers([...myOffers, offer]);
      } else {
        setOffers([...offers, offer]);
      }
    });

    socketRef.current.on("deleteOffer", (id) => {
      console.log(id);
      removeOffer(myOffers, id);
      removeOffer(offers, id);
      setOffers([...offers]);
      setMyOffers([...myOffers]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const removeOffer = (array, id) => {
    return array.filter((offer) => offer.id != id);
  };

  const toggleVisible = (array, item) => {
    return array.map((offer) => {
      if (offer == item) {
        offer.visible = !offer.visible;
      }
    });
  };

  const toggleModal = (item) => {
    toggleVisible(offers, item);
    toggleVisible(myOffers, item);
    setOffers([...offers]);
    setMyOffers([...myOffers]);
  };

  const renderAvailableItems = ({ item }) => (
    <View>
      <ListItem
        style={styles.container}
        onPress={() => {
          toggleModal(item);
        }}
        // accessoryLeft={"https://picsum.photos/150/150"}
        title={`${item.product_text}`}
        description={`${item.quantity}`}
      />
      <Modal //Modal for additional information about a product
        visible={item.visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        onBackdropPress={() => toggleModal(item)}
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

      {/* <Modal //Modal for setting time & offering an offer
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
        onPress={() => toggleModal(item)}
        // accessoryLeft={"https://picsum.photos/150/150"}
        title={`${item.product_text} ${item.quantity}`}
        description={`${item.description}`}
      />
      <Modal
        visible={item.visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.01)" }}
        onBackdropPress={() => toggleModal(item)}
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
        {item.myListings
          ? "Mina varor"
          : community.map((name) => (
              <Text category={"h5"}>Tillgängligt i {name} </Text>
            ))}
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
    <ScrollView style={{ flex: 1 }}>
      <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
        Mina varor
      </Text>
      <List scrollEnabled={false} data={myOffers} renderItem={renderMyItems} />
      {community.map((name) => (
              <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>Tillgängligt i {name} </Text>
            ))}
      <List
        scrollEnabled={false}
        data={offers}
        renderItem={renderAvailableItems}
      />
    </ScrollView>
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
