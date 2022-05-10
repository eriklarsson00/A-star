import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Alert } from "react-native";
import {
  Text,
  Modal,
  Card,
  Button,
  Layout,
  Divider,
} from "@ui-kitten/components";
import moment from "moment";
import "moment/locale/sv";
import tw from "twrnc";
import {
  getUserProfileById,
  acceptTransaction,
  deleteTransaction,
  deleteRequest,
} from "../../Services/ServerCommunication";
import { myRequestImage, requestedImage } from "../../assets/Images";

export const RequestTransactionInfoModal = (props) => {
  const item = props.item;
  const transaction = props.transaction;
  const [responder, setResponder] = useState({});
  const rating =
    responder.raters > 0
      ? Math.round((responder.rating * 10) / responder.raters) / 10 + "/5"
      : "Inga";
  const getResponder = async () => {
    if (!transaction) return;
    let responder = await getUserProfileById(transaction.responder_id);

    setResponder(responder[0]);
  };

  useEffect(() => {
    if (item.visible) return getResponder();
  }, [item.visible]);

  const accept = () => {
    acceptTransaction(transaction.id);
    props.removeMyRequest(transaction.request_id);
    props.removeTransaction(transaction.id);
    props.toggleModal(item);
  };

  const ItemDescriptiom = () => {
    if (item.description) {
      return (
        <Text category={"p1"} style={styles.textStyleBorder}>
          {item.description}
        </Text>
      );
    } else {
      return <View />;
    }
  };

  const AlertRemove = () =>
    Alert.alert("Ta bort vara", "Är du säker att du vill ta bort din vara?", [
      {
        text: "Avbryt",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Ja", onPress: () => RemoveRequest() },
    ]);

  const RemoveRequest = () => {
    deleteRequest(item.id);
    props.toggleModal(item);
  };
  const decline = () => {
    deleteTransaction(transaction.id);
    props.removeTransaction(transaction.id);
    props.toggleModal(item);
  };

  const Info = () => {
    if (transaction) {
      return (
        <View>
          <View style={styles.imgContainer}>
            <Layout style={tw`py-10`}>
              <Image
                style={[
                  tw`rounded-full`,
                  { marginBottom: -40, marginTop: -10 },
                ]}
                source={{
                  uri: responder.imgurl,
                  height: 150,
                  width: 150,
                }}
              />
            </Layout>
            <Layout style={styles.container}>
              <Card style={styles.card}>
                <Text style={[tw`text-center`, styles.text]}>
                  {responder.given}
                </Text>
                <Divider />
                <Text style={[tw`text-center`, styles.text]}>Givet</Text>
              </Card>

              <Card style={styles.card}>
                <Text style={[tw`text-center`, styles.text]}>
                  {responder.taken}
                </Text>
                <Divider />
                <Text style={[tw`text-center`, styles.text]}>Tagit</Text>
              </Card>

              <Card style={styles.card}>
                <Text style={[tw`text-center`, styles.text]}>{rating}</Text>
                <Divider />
                <Text style={[tw`text-center`, { fontSize: 10 }]}>Betyg</Text>
              </Card>
            </Layout>
            <Text style={{ marginBottom: 5 }} category={"s1"}>
              {responder.firstname} {props.text}{" "}
            </Text>
            <Text style={{ marginBottom: 5 }} category={"s1"}>
              {moment(transaction.time_of_expiration).format(
                "dddd Do MMM HH:mm"
              )}
            </Text>
            <Text style={{ marginBottom: 5 }} category={"s1"}>
              {moment(transaction.time_of_expiration).fromNow()}
            </Text>
          </View>
          <Layout
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Button
              style={{ marginLeft: 10, width: 120 }}
              onPress={() => accept()}
              status={"success"}
            >
              <Text>Acceptera</Text>
            </Button>
            <Button
              style={{ marginRight: 10, width: 120 }}
              onPress={() => decline()}
              status={"danger"}
            >
              <Text>Neka</Text>
            </Button>
          </Layout>
        </View>
      );
    } else {
      return (
        <View>
          <View style={styles.imgContainer}>
            <Layout style={tw`py-8`}>
              <Image
                style={{ marginBottom: -40, marginTop: -10 }}
                source={{
                  uri: myRequestImage,
                  height: 90,
                  width: 90,
                }}
              />
            </Layout>
          </View>
          <View>
            <View style={styles.units}>
              <Text category={"h4"}>
                {item.product_text} {item.quantity} {item.unit}
              </Text>
            </View>
            <Divider style={styles.divider}></Divider>
            <Text category={"s1"} style={styles.textStyle}>
              Efterfrågas av: <Text category={"p1"}> mig</Text>
            </Text>
            <Text category={"s1"} style={styles.textStyle}>
              Skapades:{" "}
              <Text category={"p1"}>
                {moment(item.time_of_creation).format("dddd Do MMM")}
              </Text>
            </Text>
            <ItemDescriptiom />
            <Button style={{ width: "100%" }} onPress={() => AlertRemove()}>
              <Text> Ta Bort vara</Text>
            </Button>
          </View>
        </View>
      );
    }
  };

  return (
    <Modal //Modal for additional information about a product
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
        <Info />
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
  divider: {
    borderBottomWidth: 0.8,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
  },
  textStyle: {
    marginBottom: 10,
    marginTop: 10,
  },
  textStyleBorder: {
    marginBottom: 10,
    marginTop: 10,
    borderColor: "grey",
    borderWidth: 0.7,
    borderRadius: 3,
    padding: 5,
  },
  units: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
});
