import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import {
  TopNavigation,
  Button,
  useTheme,
  Input,
  CheckBox,
  Layout,
  Icon,
  Image,
} from "@ui-kitten/components";
import tw from "twrnc";

export const CreatedNewItem = (props) => {
  const theme = useTheme();

  const EditIcon = () => (
    <Icon style={styles.icon} fill="grey" name="edit-outline" />
  );

  return (
    <Layout style={styles.item}>
      <Button
        style={{
          borderColor: theme["color-primary-300"],
          backgroundColor: theme["color-primary-300"],
          height: 70,
          justifyContent: "flex-start",
        }}
        onPress={() => {
          props.setVisible(true);
        }}
      >
        <Text style={{ fontSize: 20 }}>{props.product_text}</Text>
        <Text>
          {"\n"}Antal: {props.quantity}
        </Text>
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  item: {
    width: 370,
    alignSelf: "center",
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "rgba(255, 250, 240, 0.08)",
  },
  icon: {
    width: 30,
    height: 30,
  },
});
