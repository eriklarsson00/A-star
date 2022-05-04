import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { Text, Modal, Card, Button, Divider } from "@ui-kitten/components";
import tw from "twrnc";
import { getUserProfileById } from "../../Services/ServerCommunication";
import moment from "moment";
import "moment/locale/sv";

export const RequestedInfoModal = (props) => {
  const item = props.item;
  const [user, setUser] = React.useState("");

  useEffect(async () => {
    let user = await getUserProfileById(item.user_id);
    return setUser(user[0]);
  }, [user]);

  return (
    <Modal
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
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
            <Text style={tw`text-base mt-2 mr-2`}>
              Behövs senast:{" "}
              {moment(item.time_of_expiration).format("Do MMM YYYY")}
            </Text>
          </View>
        </View>
        <Button
          title="ta vara"
          style={{ marginTop: 10, marginBottom: 5 }}
          onPress={() => props.toggleTake()}
        >
          Ge vara
        </Button>
      </Card>
    </Modal>
  );
};
