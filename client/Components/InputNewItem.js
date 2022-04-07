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
} from "@ui-kitten/components";
import tw from "twrnc";

export const InputNewItem = (props) => {
  return (
    <Layout style={{ alignItems: "row" }}>
      <Text>{props.product_text}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({});
