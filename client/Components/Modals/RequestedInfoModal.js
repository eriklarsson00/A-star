import React, { useEffect } from "react";
import { StyleSheet, View, Image, ScrollView, FlatList } from "react-native";
import {
  Text,
  Modal,
  Card,
  Button,
  useTheme,
  Divider,
} from "@ui-kitten/components";
import { getUserProfileById } from "../../Services/ServerCommunication";
import tw from "twrnc";

export const RequestedInfoModal = (props) => {
  const [user, setUser] = React.useState("");
  const [date, setDate] = React.useState("");
  const item = props.item;

  const getDate = (date) => {
    let newString = date.substring(0, 10);
    return newString;
  };
  const theme = useTheme();
  useEffect(async () => {
    let user = await getUserProfileById(item.user_id);
    return setUser(user[0]);
  }, [user]);

  useEffect(async () => {
    let correct_date = getDate(item.time_of_expiration);
    return setDate(correct_date);
  }, [date]);

  return (
    <Modal
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Image
            style={[tw`rounded-full`]}
            source={{
              uri: user.imgurl,
              height: 100,
              width: 100,
            }}
          />
          <Text style={tw`text-base mt-2`}>
            Efterfrågas av {user.firstname}
          </Text>
          <Divider style={tw`mt-2`} />
          <Text style={tw`text-lg mt-3`}>
            {item.product_text}, {item.quantity} {item.unit}
          </Text>
          <Text style={tw`text-base mt-2`}>{item.description}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={tw`text-base mt-2 mr-2`}>Behövs senast: {date}</Text>
          </View>
        </View>
        <Button
          title="ta vara"
          style={{ marginTop: 10, marginBottom: 5 }}
          onPress={() => {
            props.toggleTake();
          }}
        >
          Ge vara
        </Button>
      </Card>
    </Modal>
  );
};
