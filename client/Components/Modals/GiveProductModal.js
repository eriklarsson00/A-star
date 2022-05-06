import { Button, Card, Modal, Text } from "@ui-kitten/components";

import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { View } from "react-native";

export const GiveProductModal = (props) => {
  const item = props.item;
  const date = props.date;
  const newDate = new Date();

  return (
    <Modal //Modal for setting time & offering an offer
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
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
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.product_text}
          </Text>
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.quantity}
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
          onPress={() => {
            props.makeTransaction(item);
          }}
        >
          Ge vara
        </Button>
      </Card>
    </Modal>
  );
};
