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
  Icon,
} from "@ui-kitten/components";
import { getUserProfileById } from "../../Services/ServerCommunication";
import moment from "moment";
import "moment/locale/sv";
import tw from "twrnc";

export const ProductInfoModal = (props) => {
  const item = props.item;
  const user = getUserProfileById(item.user_id);
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
            {item.quantity} {item.unit}
          </Text>
        </View>

        <Text style={{ marginBottom: 10 }}>
          Utångsdag:{" "}
          {moment(item.time_of_expiration).format("dddd Do MMM hh:mm")}
          {"\n"}
          {moment(item.time_of_expiration).fromNow()}
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Bruten förpackning:{" "}
          {item.broken_pkg ? (
            <Icon style={styles.icon} fill="green" name="checkmark-circle" />
          ) : (
            <Icon style={styles.icon} fill="red" name="close-outline" />
          )}
        </Text>
        <Text style={{ marginBottom: 10 }}>Användare som lagt upp</Text>
        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
        <Button onPress={() => props.toggleTake()}>Ta vara</Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    paddingTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: "100%",
  },
  text: {
    fontSize: 12,
  },
  icon: {
    width: 20,
    height: 20,
    top: 5,
    left: 5,
  },
});

export default ProductInfoModal;
