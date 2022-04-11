import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { Button, useTheme, Layout, Icon, List } from "@ui-kitten/components";
import tw from "twrnc";
import { CreatedNewItem } from "../Components/CreatedNewItem";
import { InputNewItem } from "../Components/InputNewItem";

const CreateNewItemScreen = () => {
  const [productInfo, setProductInfo] = React.useState([
    // {
    //   id: 0,
    //   product_text: "hej",
    //   description: "nej",
    //   quantity: "12",
    //   time_of_creation: "12",
    //   time_of_purchase: "12",
    //   time_of_expiration: "2",
    //   imgurl: "",
    //   broken_pkg: false,
    // },
    // {
    //   id: 1,
    //   product_text: "Moo",
    //   description: "who",
    //   quantity: "4",
    //   time_of_creation: "12",
    //   time_of_purchase: "12",
    //   time_of_expiration: "2",
    //   imgurl: "",
    //   broken_pkg: true,
    // },
  ]);
  const [productVisible, setProductVisible] = React.useState(true);
  const [quantity, setQuantity] = React.useState("");
  const [count, setCount] = React.useState([0]);

  const theme = useTheme();

  const PlusIcon = () => (
    <Icon style={styles.icon} fill="black" name="plus-circle-outline" />
  );

  const infoHandler = (input) => {
    console.log("ID NUMMEE  " + count);
    setProductInfo((productInfo) => [...productInfo, input]);
  };

  const print = () => {
    console.log(productInfo);
  };

  const newComp = () => {
    const length = count.length;
    setCount((count) => [...count, length]);
  };

  const addComp = ({ item, index }) => (
    <Layout>
      <InputNewItem
        // setVisible={setProductVisible}
        setProductInfo={infoHandler}
        id={index}
        // setProductText={textHandler}
        // setQuantity={quantityHandler}
        // quantity={quantity}
        // productText={product_text}
      />
    </Layout>
  );

  const giveKey = ({ item, index }) => reuturn(item);

  return (
    <Layout style={styles.container}>
      <List
        style={styles.container_list}
        data={count}
        renderItem={addComp}
        key={giveKey}
      />

      <Layout
        style={{
          alignSelf: "left",
          paddingBottom: 15,
          backgroundColor: "rgba(255, 250, 240, 0.08)",
        }}
      >
        <Button
          appearance="ghost"
          accessoryLeft={PlusIcon}
          onPress={() => {
            newComp();
          }}
        >
          Lägg till en ny vara{" "}
        </Button>
      </Layout>
      <Layout
        style={{
          paddingBottom: 15,
          backgroundColor: "rgba(255, 250, 240, 0.08)",
        }}
      >
        <Button
          style={{ width: 300, alignSelf: "center" }}
          onPress={() => {
            print();
          }}
        >
          {" "}
          Skapa Inlägg
        </Button>
      </Layout>
    </Layout>
  );
};

export default CreateNewItemScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
  container_list: {
    height: 200,
  },
  list_style: {
    backgroundColor: "red",
  },
});
