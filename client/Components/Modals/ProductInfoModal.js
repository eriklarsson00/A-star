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
import io from "socket.io-client";

export const ProductInfoModal = (props) => {
  const item = props.item;
  return (
    <Modal //Modal for additional information about a product
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
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
          Utångsdag: {item.time_of_expiration}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Bruten förpackning: {item.broken_pkg ? "Japp" : "Nepp"}{" "}
        </Text>
        <Text style={{ marginBottom: 10 }}>Användare som lagt upp</Text>
        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
        <Button onPress={() => props.toggleTake()}>Ta vara</Button>
      </Card>
    </Modal>
  );
};

export default ProductInfoModal;
