import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  Text,
  List,
  ListItem,
  Modal,
  Card,
  Spinner,
  Icon,
} from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";
import { MyCommunitysInfo, UserInfo } from "../assets/AppContext";
import {
  getOffers,
  getMyOffers,
  addTransaction,
  getPendingTransactions,
} from "../Services/ServerCommunication.js";
import io from "socket.io-client";
import ProductInfoModal from "./Modals/ProductInfoModal";
import TakeProductModal from "./Modals/TakeProductModal";
import { host } from "../Services/ServerHost";

const TransactionIcon = (props) => (
  <Icon {...props} fill="red" name="info-outline" />
);

export const ItemAvailableComponent = () => {
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const { myCommunitysInfo, setMyCommunitysInfo } =
    React.useContext(MyCommunitysInfo);
  const [takeProduct, setTakeProduct] = React.useState(false);
  const [offers, setOffers] = React.useState([]);
  const [myOffers, setMyOffers] = React.useState([]);
  const [date, setDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(true);
  const [transactionIds, setTransactionIds] = React.useState([]);
  const isFocused = useIsFocused();

  const userId = userInfo.id;
  const communityIds = myCommunitysInfo.map(({ id }) => id);

  let transactions = [];

  //fetch items on focus
  const fetchItems = async () => {
    setLoading(true);
    let myItems = await getMyOffers(userId);
    let otherItems = await getOffers(userId, communityIds);
    transactions = await getPendingTransactions(userId);
    setTransactionIds(transactions.map((transaction) => transaction.offer_id));

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

    socketRef.current.emit("communities", {
      ids: communityIds.map((id) => id.toString()),
    });

    socketRef.current.on("offer", (offer) => {
      offer.visible = false;
      if (offer.user_id == userId) {
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
      responder_id: userId,
      time_of_creation: new Date(),
      time_of_expiration: date,
    };

    console.log(transaction);

    await addTransaction(transaction);
    fetchItems();
    toggleModal(item);
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
          title={`${item.product_text} ${item.quantity}`}
          description={`${item.description}`}
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
        accessoryRight={
          transactionIds.includes(item.id) ? TransactionIcon : null
        }
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
