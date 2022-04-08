import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
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
import { CreatedNewItem } from "../Components/CreatedNewItem";
import { InputNewItem } from "../Components/InputNewItem";

const CreateNewItemScreen = () => {
  const [product_text, setProduct_test] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [productVisible, setProductVisible] = React.useState(true);
  const [quantity, setQuantity] = React.useState("");
  const [time_of_creation, setTime_of_creation] = React.useState("");
  const [time_of_purchase, setTime_of_purchase] = React.useState("");
  const [time_of_expiration, setTime_of_expiration] = React.useState("");
  const [imgurl, setImgurl] = React.useState("");
  const [broken_pkg, setBroken_pkg] = React.useState(false);

  const theme = useTheme();

  const PlusIcon = () => (
    <Icon style={styles.icon} fill="black" name="plus-circle-outline" />
  );

  const textHandler = (input) => {
    setProduct_test(input);
  };
  const quantityHandler = (input) => {
    setQuantity(input);
  };

  return (
    <Layout style={styles.container}>
      {productVisible == false && (
        <CreatedNewItem
          product_text={product_text}
          quantity={quantity}
          setVisible={setProductVisible}
        />
      )}
      {productVisible && (
        <InputNewItem
          setVisible={setProductVisible}
          setProductText={textHandler}
          setQuantity={quantityHandler}
          quantity={quantity}
          productText={product_text}
        />
      )}
      <Layout style={{ alignSelf: "left", paddingBottom: 15 }}>
        <Button appearance="ghost" accessoryLeft={PlusIcon}>
          Lägg till en ny vara{" "}
        </Button>
      </Layout>
      <Button style={{ width: 300, alignSelf: "center" }}> Skapa Inlägg</Button>
    </Layout>
  );
};

export default CreateNewItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: 50,
  },
  checkbox: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  lockStyle: {
    width: 55,
    height: 55,
  },
  btn: {
    width: 75,
    height: 70,
    borderColor: "grey",
    paddingLeft: 33,
  },
  createBtn: {
    alignSelf: "center",
    width: 200,
    height: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
