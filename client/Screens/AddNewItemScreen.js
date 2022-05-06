import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, useTheme, Layout, TopNavigation } from "@ui-kitten/components";
import tw from "twrnc";

const AddNewItemScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Layout style={styles.container}>
      <View style={styles.boxBlue} />
      <View style={{ marginTop: 110 }}>
        <Button
          style={styles.btn}
          onPress={() => navigation.navigate("CreateNewRequestScreen")}
        >
          Jag söker en vara
        </Button>
        <Button
          style={styles.btn}
          onPress={() => navigation.navigate("CreateNewOfferScreen")}
        >
          Jag vill ge bort en vara
        </Button>
      </View>
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
    width: 210,
    height: 70,
    margin: 50,
    shadowOpacity: 0.4,
    zIndex: 20,
    shadowOffset: { width: 1, height: 5 },
  },
  boxBlue: {
    zIndex: -1,
    width: "300%",
    height: 390,
    position: "absolute",
    top: 270,
    backgroundColor: "#FEE6BB",
    transform: [{ rotateZ: "-15deg" }],
  },
});
