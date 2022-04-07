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
import InputNewItem from "../Components/InputNewItem";

const CreateNewItemScreen = () => {
  const [product_text, setProduct_test] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [time_of_creation, setTime_of_creation] = React.useState("");
  const [time_of_purchase, setTime_of_purchase] = React.useState("");
  const [time_of_expiration, setTime_of_expiration] = React.useState("");
  const [imgurl, setImgurl] = React.useState("");
  const [broken_pkg, setBroken_pkg] = React.useState(false);

  const theme = useTheme();

  const CameraIcon = () => (
    <Icon style={styles.lockStyle} fill="black" name="camera-outline" />
  );
  const PlusIcon = () => (
    <Icon style={styles.icon} fill="black" name="plus-circle-outline" />
  );

  const createItem = () => {
    let itemData = {
      product_text: product_text,
      description: description,
      quantity: quantity,
      time_of_creation: time_of_creation,
      time_of_purchase: time_of_purchase,
      time_of_expiration: time_of_expiration,
      imgurl: "",
      broken_pkg: false,
    };
    console.log(itemData);
    //TODO: skicka in i databasen
  };

  return (
    <Layout style={styles.container}>
      <Layout
        style={{
          borderWidth: 1,
          borderColor: "gainsboro",
          marginLeft: 10,
          marginRight: 10,
          paddingTop: 15,
          paddingBottom: 15,
        }}
      >
        <Layout style={tw`pl-5 pb-5`}>
          <Button
            style={styles.btn}
            appearance="ghost"
            accessoryLeft={CameraIcon}
          >
            {" "}
          </Button>
        </Layout>
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Typ av vara"
          value={product_text}
          onChangeText={(nextValue) => setProduct_test(nextValue)}
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Beskrivning av vara"
          value={description}
          onChangeText={(nextValue) => setDescription(nextValue)}
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Antal*"
          value={quantity}
          onChangeText={(nextValue) => setQuantity(nextValue)}
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Datum varan köptes"
          value={time_of_purchase}
          onChangeText={(nextValue) => setTime_of_purchase(nextValue)}
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Datum varan skapades"
          value={time_of_creation}
          onChangeText={(nextValue) => setTime_of_creation(nextValue)}
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Utgångsdatum"
          value={time_of_expiration}
          onChangeText={(nextValue) => setTime_of_expiration(nextValue)}
        />
        <CheckBox
          style={styles.checkbox}
          checked={broken_pkg}
          onChange={(nextChecked) => setBroken_pkg(nextChecked)}
        >
          {(evaProps) => (
            <Text
              {...evaProps}
              style={{
                fontSize: 16,
                paddingLeft: 5,
                color: theme["color-basic-700"],
              }}
            >
              Bruten förpackning
            </Text>
          )}
        </CheckBox>
        <Layout style={{ paddingLeft: 228 }}>
          <Button
            style={{ width: 120 }}
            id="createItem"
            onPress={() => createItem()}
          >
            Skapa vara
          </Button>
        </Layout>
      </Layout>
      <Layout style={{ alignSelf: "left", paddingBottom: 15 }}>
        <Button appearance="ghost" accessoryLeft={PlusIcon}>
          {" "}
          Lägg till en ny vara{" "}
        </Button>
      </Layout>
      <Button style={{ width: 300, alignSelf: "center" }}>Skapa Inlägg</Button>
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
