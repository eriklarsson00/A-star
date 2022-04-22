import React, { useEffect, useState } from "react";
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
import moment from "moment";
import "moment/locale/sv";
import tw from "twrnc";
import { getUserProfileById } from "../../Services/ServerCommunication";

export const TransactionInfoModal = (props) => {
  const item = props.item;
  const transaction = props.transaction;
  const [responder, setResponder] = useState({});

  useEffect(() => {
    async () => {
      let responder = await getUserProfileById(transaction.responder_id);
      setResponder(responder);
    };
  }, []);

  const Info = () => {
    if (transaction) {
      return (
        <View>
          <Text>
            Vill plocka upp{" "}
            {moment(transaction.time_of_expiration).format("dddd Do MMM hh:mm")}
          </Text>
          <Text>{moment(transaction.time_of_expiration).fromNow()}</Text>
          <Text>{responder.firstname}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Layout style={tw`py-10`}>
              <Image
                style={tw`rounded-full`}
                source={{
                  uri: item.imgurl,
                  height: 100,
                  width: 100,
                }}
              />
            </Layout>
            <Text category={"s1"} style={{ marginLeft: 20 }}>
              {item.product_text}
            </Text>
            <Text category={"s1"} style={{ marginLeft: 20 }}>
              {item.quantity}
            </Text>
          </View>

          <Text style={{ marginBottom: 10 }}>
            Utgångsdag: {moment(item.time_of_expiration).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Bruten förpackning: {item.broken_pkg ? "Japp" : "Nepp"}{" "}
          </Text>
          <Text style={{ marginBottom: 10 }}>Din vara</Text>
          <Text style={{ marginBottom: 10 }}>{item.description}</Text>
        </View>
      );
    }
  };

  return (
    <Modal //Modal for additional information about a product
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
        <Info />
      </Card>
    </Modal>
  );
};

export default TransactionInfoModal;
