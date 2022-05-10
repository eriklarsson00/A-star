import "moment/locale/sv";

import { Icon, ListItem, Spinner, Text } from "@ui-kitten/components";
import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, Image } from "react-native";
import { myRequestImage, requestedImage } from "../assets/Images";
import { useIsFocused } from "@react-navigation/native";
import { ShowCommunityIds, UserInfo } from "../assets/AppContext";
import { io } from "socket.io-client";
import {
  addTransaction,
  getMyActiveRequests,
  getPendingTransactions,
  getRequests,
} from "../Services/ServerCommunication";

import { GiveProductModal } from "./Modals/GiveProductModal";
import { RequestTransactionInfoModal } from "./Modals/RequestTransactionModal";
import { RequestedInfoModal } from "./Modals/RequestedInfoModal";
import { host } from "../Services/ServerHost";
import moment from "moment";
import "moment/locale/sv";

export const ItemRequestedComponent = () => {
  const { userInfo } = React.useContext(UserInfo);
  const { showCommunityIds } = React.useContext(ShowCommunityIds);
  const [myRequests, setMyRequests] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const isFocused = useIsFocused();
  const [date, setDate] = React.useState(new Date());
  const [takeProduct, setTakeProduct] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const userId = userInfo.id;
  const communityIds = showCommunityIds;
  const [responder, setResponder] = React.useState({});

  const TransactionIcon = (props) => (
    <Icon {...props} fill="red" name="info-outline" />
  );
  //fetch items on focus
  useEffect(() => {
    if (isFocused) fetchItems();
  }, [isFocused]);

  const socketRef = React.useRef();

  //WebSocket handling
  React.useEffect(() => {
    socketRef.current = io(host);

    socketRef.current.on("request", (requestobj) => {
      const request = requestobj.request;
      const communities = requestobj.communities;
      if (
        request.user_id != userId &&
        communities?.map((i) => communityIds?.includes(i)).includes(true)
      )
        addRequest(request);
    });

    socketRef.current.on("deleteRequest", (id) => {
      removeRequest(id);
    });

    socketRef.current.on("transaction", (transaction) => {
      updateTransactions(transaction);
      if (transaction.request_id != null) removeRequest(transaction.request_id);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [requests, transactions]);

  const fetchItems = async () => {
    setLoading(true);
    const myItems = await getMyActiveRequests(userId);
    const otherItems = await getRequests(userId, communityIds);
    setMyRequests(myItems);
    setRequests(otherItems);
    const newTransactions = await getPendingTransactions(userId);
    setTransactions(newTransactions);
    setLoading(false);
  };

  const removeTransaction = (id) => {
    return setTransactions(
      transactions.filter((transaction) => transaction.id != id)
    );
  };
  const updateTransactions = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const addRequest = (request) => {
    setRequests([...requests, request]);
  };

  const removeRequest = (id) => {
    return setRequests(requests.filter((request) => request.id != id));
  };

  const removeMyRequest = (id) => {
    return setMyRequests(myRequests.filter((request) => request.id != id));
  };

  const getTransaction = (request) => {
    if (!requestHasTransaction(request)) {
      return null;
    }
    return transactions.find(({ request_id }) => request_id == request.id);
  };

  const requestHasTransaction = (request) => {
    return getTransactionIds().includes(request.id);
  };

  const getTransactionIds = () => {
    return transactions.map(({ request_id }) => request_id);
  };
  const toggleVisible = (array, item) => {
    return array.map((request) => {
      if (request == item) {
        request.visible = !request.visible;
      }
    });
  };

  const makeTransaction = async (item) => {
    const transaction = {
      offer_id: null,
      request_id: item.id,
      status: "pending",
      responder_id: userId,
      time_of_creation: new Date(),
      time_of_expiration: date,
    };

    await addTransaction(transaction);
    fetchItems();
    toggleModal(item);
  };

  const toggleModal = (item) => {
    toggleVisible(requests, item);
    toggleVisible(myRequests, item);
    setTakeProduct(false);
    setRequests([...requests]);
    setMyRequests([...myRequests]);
  };

  const renderMyItems = (
    { item } //Used for rendering my item
  ) => {
    return (
      <View key={item.id}>
        <ListItem
          accessoryLeft={() => {
            return (
              <Image
                source={{
                  uri: myRequestImage,
                  height: 50,
                  width: 50,
                  marginRight: 10,
                }}
              />
            );
          }}
          style={styles.container}
          title={`${item.product_text} | ${item.quantity} ${item.unit ?? ""}`}
          accessoryRight={requestHasTransaction(item) ? TransactionIcon : null}
          description={`${item.description}`}
          onPress={() => {
            toggleModal(item);
          }}
        />
        <RequestTransactionInfoModal
          item={item}
          text={"vill ge dig denna vara"}
          toggleModal={toggleModal}
          transaction={getTransaction(item)}
          removeTransaction={removeTransaction}
          removeMyRequest={removeMyRequest}
        />
      </View>
    );
  };
  const updateDate = (date) => {
    setDate(date);
  };

  const toggleTake = () => {
    setTakeProduct(!takeProduct);
  };
  const renderRequestedItem = ({ item }) => {
    let infoModal = (
      <RequestedInfoModal
        item={item}
        toggleModal={toggleModal}
        toggleTake={toggleTake}
      />
    );

    let giveProductModal = (
      <GiveProductModal
        item={item}
        date={date}
        toggleModal={toggleModal}
        updateDate={updateDate}
        makeTransaction={makeTransaction}
      />
    );

    let modal = !takeProduct ? infoModal : giveProductModal;
    return (
      <View key={item.id}>
        <ListItem
          style={styles.container}
          accessoryRight={() => {
            return (
              <Text style={{ top: 25, fontSize: 10 }}>
                {" "}
                {moment(item.time_of_creation).fromNow()}
              </Text>
            );
          }}
          accessoryLeft={() => {
            return (
              <Image
                source={{
                  uri: requestedImage,
                  height: 50,
                  width: 50,
                  marginRight: 10,
                }}
              />
            );
          }}
          title={`${item.product_text} | ${item.quantity} ${item.unit ?? ""}`}
          description={`${item.description}`}
          onPress={() => {
            toggleModal(item);
          }}
        />
        {modal}
      </View>
    );
  };

  const LoadingView = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner size={"giant"} />
    </View>
  );

  const LoadedView = () => (
    <View>
      <Text category={"h6"} style={{ marginTop: 20, marginLeft: 11 }}>
        Alla mina efterfrågningar
      </Text>
      {myRequests.map((request) => {
        return renderMyItems({ item: request });
      })}
      <Text category={"h6"} style={{ marginTop: 20, marginLeft: 11 }}>
        Efterfrågade varor i valda grannskap
      </Text>
      {requests.map((request) => {
        return renderRequestedItem({ item: request });
      })}
    </View>
  );

  return loading ? (
    <LoadingView />
  ) : (
    <ScrollView>
      <LoadedView />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    marginTop: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginTop: 15,
    height: 80,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
});
