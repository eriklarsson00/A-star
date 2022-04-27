import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Text,
  Modal,
  Divider,
  Card,
  Button,
  Layout,
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
  const [date, setDate] = React.useState("");

  const getDate = (date) => {
    let newString = date.substring(0, 10);
    return newString;
  };
  useEffect(async () => {
    let correct_date = getDate(item.time_of_expiration);
    setDate(correct_date);
  }, [date]);

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
          <Text>
            {responder.firstname} {props.text}{" "}
          </Text>
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
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text style={tw`text-base font-bold mt-2`}>Efterfrågas av mig</Text>
          <Divider style={tw`mt-2`} />
          <Text style={tw`text-lg mt-3`}>
            {item.product_text}, {item.quantity} {item.unit}
          </Text>
          <Text style={tw`text-base mt-2`}>{item.description}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={tw`text-base mt-2 mr-2`}>Behövs senast: {date}</Text>
          </View>
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
