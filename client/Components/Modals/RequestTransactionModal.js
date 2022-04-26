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
import {
  getUserProfileById,
  acceptTransaction,
  deleteTransaction,
} from "../../Services/ServerCommunication";

export const RequestTransactionInfoModal = (props) => {
  const item = props.item;
  const transaction = props.transaction;
  const [responder, setResponder] = useState({});

  const getResponder = async () => {
    if (!transaction) return;
    let responder = await getUserProfileById(transaction.responder_id);
    setResponder(responder[0]);
  };

  useEffect(() => {
    getResponder();
  }, []);

  const accept = () => {
    acceptTransaction(transaction.id);
    props.toggleModal(item);
  };

  const decline = () => {
    deleteTransaction(transaction.id);
    props.toggleModal(item);
  };

  const Info = () => {
    if (transaction) {
      return (
        <View>
          <Text>{responder.firstname} {props.text} </Text>
          <Text>
            {moment(transaction.time_of_expiration).format("dddd Do MMM hh:mm")}
          </Text>
          <Text>{moment(transaction.time_of_expiration).fromNow()}</Text>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button onPress={() => accept()} status={"success"}>
              <Text>Acceptera</Text>
            </Button>
            <Button onPress={() => decline()} status={"danger"}>
              <Text>Neka</Text>
            </Button>
          </Layout>
        </View>
      );
    } else {
      return (
        <View>
          <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "left",
          }}
          >
          <Text category={"h6"} style={{ marginLeft: 20}}>Vara</Text>
          <Text category={"s1"} style={{ marginLeft: 20, borderBottomWidth: 1, }}>
            {item.product_text}
            </Text>
          <Text category={"h6"} style={{ marginLeft: 20, marginTop: 10 }}>Antal</Text>
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.quantity}
            </Text>
            <Text category={"h5"} style={{ marginLeft: 20, marginTop: 10 }}>Senast Inom</Text>
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.time_of_expiration}
            </Text>
        </View>
        
          <Text category={"h5"} style={{ marginBottom: 10, marginLeft: 20, marginTop: 10 }}>Beskrivning</Text>
          <Text category={"s1"} style={{ marginBottom: 10 }}>{item.description}</Text>
          
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


