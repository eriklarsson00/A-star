import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { StyleSheet, View } from "react-native";
import {
  Text,
  List,
  Divider,
  ListItem,
  Modal,
  Card,
  Spinner,
} from "@ui-kitten/components";
import { useIsFocused } from "@react-navigation/native";
import { MyCommunitysInfo } from "../assets/AppContext";
import { io } from "socket.io-client";
import { getRequests } from "../Services/ServerCommunication";
import { host } from "../Services/ServerHost";

export const ItemRequestedComponent = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [myRequests, setMyRequests] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { community } = React.useContext(MyCommunitysInfo);
  const isFocused = useIsFocused();

  const communities = [1, 2];
  const id = 4;

  //fetch items on focus
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      let myItems = [];
      let otherItems = [];
      let items = await getRequests(communities).catch((e) => console.log(e));
      items.forEach((item) => {
        item.visible = false;
        if (item.user_id == id) {
          myItems.push(item);
        } else {
          otherItems.push(item);
        }
      });
      setMyRequests(myItems);
      setRequests(otherItems);
      setLoading(false);
    };

    if (isFocused) fetchItems();
  }, [isFocused]);

  const socketRef = React.useRef();

  //WebSocket handling
  React.useEffect(() => {
    socketRef.current = io(host);

    socketRef.current.emit("communities", { ids: ["1", "2"] });

    socketRef.current.on("request", (request) => {
      request.visible = false;
      if (request.user_id == id) {
        setMyRequests([...myRequests, request]);
      } else {
        setRequests([...requests, request]);
      }
    });

    socketRef.current.on("deleteRequest", (id) => {
      console.log(id);
      removeRequest(myRequests, id);
      removeRequest(requests, id);
      setRequests([...requests]);
      setMyRequests([...myRequests]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const removeRequest = (array, id) => {
    return array.filter((request) => request.id != id);
  };

  const toggleVisible = (array, item) => {
    return array.map((request) => {
      if (request == item) {
        request.visible = !request.visible;
      }
    });
  };

  const toggleModal = (item) => {
    toggleVisible(requests, item);
    toggleVisible(myRequests, item);
    setRequests([...requests]);
    setMyRequests([...myRequests]);
  };

  const renderItem = ({ item }) => (
    <View>
      <ListItem
        style={styles.container}
        title={`${item.product_text}`}
        description={`${item.description}`}
        onPress={() => {
          toggleModal(item);
        }}
      />
      <Modal
        visible={item.visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        onBackdropPress={() => toggleModal(item)}
      >
        <Card></Card>
      </Modal>
    </View>
  );

  const LoadingView = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner size={"giant"} />
    </View>
  );

  const LoadedView = () => (
    <ScrollView>
      <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
        Mina efterfrågningar
      </Text>
      <List
        scrollEnabled={false}
        data={myRequests}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
      {community.length != 0 ? (
        community.map((name) => (
          <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
            Efterfrågas i {name}{" "}
          </Text>
        ))
      ) : (
        <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
          Efterfrågade varor
        </Text>
      )}
      <List
        scrollEnabled={false}
        data={requests}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </ScrollView>
  );

  return loading ? <LoadingView /> : <LoadedView />;
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
  },
});
