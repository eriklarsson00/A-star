import React from "react";
import { StyleSheet } from "react-native";
import { Button, useTheme, Layout } from "@ui-kitten/components";
import tw from "twrnc";

const AddNewItemScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Layout style={styles.container}>
      <Button
        style={[
          styles.btn,
          {
            backgroundColor: theme["color-primary-400"],
            borderColor: theme["color-primary-400"],
          },
        ]}
        onPress={() => navigation.navigate("CreateNewRequestScreen")}
      >
        Sökes
      </Button>
      <Button
        style={[styles.btn, { backgroundColor: theme["color-primary-500"] }]}
        onPress={() => navigation.navigate("CreateNewOfferScreen")}
      >
        Gives{" "}
      </Button>
    </Layout>
  );
};

export default AddNewItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderRadius: 15,
    width: 150,
    height: 70,
    margin: 50,
  },
});
