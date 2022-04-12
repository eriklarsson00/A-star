import React from "react";
import { StyleSheet, View, Image, ScrollView, FlatList } from "react-native";
import {
  Text,
  List,
  ListItem,
  Modal,
  Card,
  Button,
  Layout,
  Spinner,
} from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";
import { useIsFocused } from "@react-navigation/native";
import { MyCommunitysInfo, UserInfo } from "../assets/AppContext";
import { getOffers, addTransaction } from "../Services/ServerCommunication.js";
import io from "socket.io-client";
import ProductInfoModal from "./Modals/ProductInfoModal";
import TakeProductModal from "./Modals/TakeProductModal";
import { host } from "../Services/ServerHost";

export const ItemAvailableComponent = () => {
  const { community } = React.useContext(MyCommunitysInfo);
  const [takeProduct, setTakeProduct] = React.useState(false);
  const [offers, setOffers] = React.useState([]);
  const [myOffers, setMyOffers] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);
  const { user } = React.useContext(UserInfo);
  const isFocused = useIsFocused();

  const id = user ? user.id : 1;
  const communities = [1, 2];

  //fetch items on focus
  const fetchItems = async () => {
    setLoading(true);
    let myItems = [];
    let otherItems = [];
    let items = await getOffers(communities).catch((e) => console.log(e));
    items.forEach((item) => {
      item.visible = false;
      item.imgurl = "https://picsum.photos/150/150";
      if (item.user_id == id) {
        myItems.push(item);
      } else {
        otherItems.push(item);
      }
    });
    setMyOffers(myItems);
    setOffers(otherItems);
    setLoading(false);
  };

  React.useEffect(() => {
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
    setTakeProduct(false);
    setOffers([...offers]);
    setMyOffers([...myOffers]);
  };

  const toggleTake = () => {
    setTakeProduct(!takeProduct);
  };

  const updateDate = (date) => {
    setDate(date);
  };

  const makeTransaction = async (item) => {
    const transaction = {
      offer_id: item.id,
      request_id: null,
      status: "pending",
      responder_id: id,
      time_of_creation: new Date(),
      time_of_expiration: date,
    };

    console.log(transaction);

    await addTransaction(transaction);
    fetchItems();
    toggleModal(item);
  };

  const flatListHeader = () => {
    return (
      <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
        Mina varor
      </Text>
    );
  };

  const flatListFooter = () => {
    return (
      <View>
        <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
          Tillgängliga varor
        </Text>
        <List
          scrollEnabled={false}
          data={offers}
          renderItem={renderAvailableItems}
        />
      </View>
    );
  };

  const renderAvailableItems = ({ item }) => {
    let infoModal = (
      <ProductInfoModal
        item={item}
        toggleModal={toggleModal}
        toggleTake={toggleTake}
      />
    );

    let takeProductModal = (
      <TakeProductModal
        item={item}
        date={date}
        toggleModal={toggleModal}
        updateDate={updateDate}
        makeTransaction={makeTransaction}
      />
    );

    let modal = !takeProduct ? infoModal : takeProductModal;

    return (
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
        {modal}
      </View>
    );
  };

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

  const LoadingView = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner size={"giant"} />
    </View>
  );

  const LoadedView = () => (
    <FlatList
      style={{ flex: 1 }}
      data={myOffers}
      renderItem={renderMyItems}
      ListHeaderComponent={flatListHeader}
      ListFooterComponent={flatListFooter}
    ></FlatList>
  );

  return loading ? <LoadingView /> : <LoadedView />;
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
