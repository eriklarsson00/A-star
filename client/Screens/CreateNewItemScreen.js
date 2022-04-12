import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { Button, useTheme, Layout, Icon, List } from "@ui-kitten/components";
import tw from "twrnc";
import { CreatedNewItem } from "../Components/CreatedNewItem";
import { InputNewItem } from "../Components/InputNewItem";
import BarCodeScannerComp from "../Components/BarCodeScanner.component";

const CreateNewItemScreen = () => {
  const [productInfo, setProductInfo] = React.useState([]);
  const [compId, setCompId] = React.useState(0);
  const [count, setCount] = React.useState([0]);
  const [productName, setProductName] = React.useState("");
  const [barCodeShow, setBarCodeShow] = React.useState(false);

  const theme = useTheme();

  const PlusIcon = () => (
    <Icon style={styles.icon} fill="black" name="plus-circle-outline" />
  );

  // barcodescanner
  const product = (productName) => {
    setProductName(productName);
    console.log(productName);
  };
  const barCodeActive = (barCodeShow) => {
    setBarCodeShow(barCodeShow);
  };

  // koppla mellan parent och child
  const infoHandler = (input) => {
    setProductInfo((productInfo) => [...productInfo, input]);
  };
  const addId = (input) => {
    setCompId(compId + input);
  };

  const print = () => {
    console.log(productInfo);
  };

  const newComp = () => {
    const length = count.length;
    setCount((count) => [...count, length]);
  };

  const updateItem = (inputId, updatedItem) => {
    for (let i = 0; i < productInfo.length; i++) {
      if (productInfo[i].id === inputId) {
        console.log("productInfo[i].id = " + productInfo[i].id);
        let newProductInfo = [...productInfo];
        newProductInfo[i] = updatedItem;
        setProductInfo(newProductInfo);
        return;
      }
    }
    console.log("ERROR: no item with inputId found");
  };

  const addComp = ({ item, index }) => (
    <Layout>
      <InputNewItem
        setProductInfo={infoHandler}
        id={compId}
        setId={addId}
        setChange={updateItem}
        func={barCodeActive}
        product={productName}
      />
    </Layout>
  );

  const giveKey = ({ item, index }) => reuturn(item);

  if (!barCodeShow) {
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
            paddingLeft: 30,
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
  } else {
    return <BarCodeScannerComp func={barCodeActive} productInfo={product} />;
  }
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
