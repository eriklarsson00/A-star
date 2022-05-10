import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { Image, View } from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import tw from "twrnc";

const TakeProductModal = (props) => {
  const item = props.item;
  const date = props.date;
  const newDate = new Date();
  return (
    <Modal //Modal for setting time & offering an offer
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onBackdropPress={() => {
        props.toggleModal(item);
      }}
    >
      <Card
        disabled={true}
        style={{
          width: 320,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
          <Text style={{ width: "60%" }}>
            <Text category={"s1"} style={{ marginLeft: 20 }}>
              {item.product_text}
              {", "}
            </Text>
            <Text category={"s1"} style={{ marginLeft: 20 }}>
              {item.quantity} {item.unit}
            </Text>
          </Text>
        </View>
        <Text style={{ marginBottom: 10 }}>Välj tid för upphämtning</Text>
        <DateTimePicker
          style={{ flex: 1, width: 280 }}
          mode={"datetime"}
          value={date}
          minimumDate={newDate}
          onChange={(event, date) => props.updateDate(date)}
          display={"inline"}
        />
        <Button
          style={{ marginTop: -50 }}
          onPress={() => props.makeTransaction(item)}
        >
          Ta vara
        </Button>
      </Card>
    </Modal>
  );
};

export default TakeProductModal;
