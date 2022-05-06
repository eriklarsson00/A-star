import { Button, Layout } from "@ui-kitten/components";

import React from "react";
import { StyleSheet } from "react-native";

const AddNewItemScreen = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate("CreateNewRequestScreen")}
      >
        Sökes
      </Button>
      <Button
        style={styles.btn}
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
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 5 },
  },
});
