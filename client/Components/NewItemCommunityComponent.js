import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TopNavigation, Button, useTheme, Layout } from "@ui-kitten/components";
import tw from "twrnc";

export const NewItemCommunityComponent = (props) => {
  const [checked, setChecked] = React.useState(false);
  const theme = useTheme();

  const updateCommunity = () => {
    setChecked(!checked);
    props.addCommunity(props.community, checked);
  };

  return (
    <TouchableOpacity
      style={{
        borderColor: "red",
        backgroundColor: checked ? theme["color-primary-300"] : "white",
        borderRadius: 3,
      }}
      onPress={() => {
        updateCommunity();
      }}
    >
      <Text
        style={{
          fontSize: 20,
          margin: 10,
        }}
      >
        {props.community.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
