import { StyleSheet, Text, TouchableOpacity } from "react-native";

import React from "react";
import { useTheme } from "@ui-kitten/components";

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
