import React from "react";
import { StyleSheet, View, FlatList, Image } from "react-native";
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
import TransactionInfoModal from "./Modals/TransactionInfoModal";
import { host } from "../Services/ServerHost";
import tw from "twrnc";
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
  const [transactions, setTransactions] = React.useState([]);
  const isFocused = useIsFocused();

  const userId = userInfo.id;
  const communityIds = myCommunitysInfo.map(({ id }) => id);

  //fetch items on focus
  const fetchItems = async () => {
    setLoading(true);
    let myItems = await getMyOffers(userId);
    let otherItems = await getOffers(userId, communityIds);
    let transactions = await getPendingTransactions(userId);

    setTransactions(transactions);
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

  const getTransaction = (offer) => {
    if (!offerHasTransaction(offer)) {
      return null;
    }
    return transactions.find(({ offer_id }) => offer_id == offer.id);
  };

  const offerHasTransaction = (offer) => {
    return getTransactionIds().includes(offer.id);
  };

  const getTransactionIds = () => {
    return transactions.map(({ offer_id }) => offer_id);
  };

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
          accessoryLeft={() => {
          return(
            <Image
              style={tw`rounded-full`}
              source={{ uri: item.imgurl, height: 70, width: 70, marginRight:10 }}
            />)
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
        accessoryLeft={() => {
          return(
            <Image
              style={tw`rounded-full`}
              source={{ uri: item.imgurl, height: 70, width: 70, marginRight:10 }}
            />)
        }}
        accessoryRight={offerHasTransaction(item) ? TransactionIcon : null}
        title={`${item.product_text} ${item.quantity}`}
        description={`${item.description}`}>
        
      </ListItem>
      <TransactionInfoModal
        text={"vill hämta din vara"}
        item={item}
        toggleModal={toggleModal}
        transaction={getTransaction(item)}
      />
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
