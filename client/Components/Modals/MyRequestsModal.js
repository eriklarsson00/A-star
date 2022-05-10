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

export const MyRequestsModal = (props) => {
  const item = props.item;
  return (
    <Modal
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
        <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "left",
          }}
        >
          <Text category={"h6"} style={{ marginLeft: 20 }}>
            Vara
          </Text>
          <Text
            category={"s1"}
            style={{ marginLeft: 20, borderBottomWidth: 1 }}
          >
            {item.product_text}
          </Text>
          <Text category={"h6"} style={{ marginLeft: 20, marginTop: 10 }}>
            Antal
          </Text>
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.quantity}
          </Text>
          <Text category={"h5"} style={{ marginLeft: 20, marginTop: 10 }}>
            Senast Inom
          </Text>
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.time_of_expiration}
          </Text>
        </View>

        <Text
          category={"h5"}
          style={{ marginBottom: 10, marginLeft: 20, marginTop: 10 }}
        >
          Beskrivning
        </Text>
        <Text category={"s1"} style={{ marginBottom: 10 }}>
          {item.description}
        </Text>
      </Card>
    </Modal>
  );
};
