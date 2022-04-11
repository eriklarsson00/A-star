import React from "react";
import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import { Button, useTheme, Layout, Icon, List } from "@ui-kitten/components";
import tw from "twrnc";
import { CreatedNewItem } from "../Components/CreatedNewItem";
import { InputNewItem } from "../Components/InputNewItem";
import BarCodeScannerComp from "../Components/BarCodeScanner.component";

const CreateNewItemScreen = () => {
  const [productInfo, setProductInfo] = React.useState([
    {
      id: 0,
      product_text: "hej",
      description: "nej",
      quantity: "12",
      time_of_creation: "12",
      time_of_purchase: "12",
      time_of_expiration: "2",
      imgurl: "",
      broken_pkg: false,
    },
    {
      id: 1,
      product_text: "nej",
      description: "who",
      quantity: "12",
      time_of_creation: "12",
      time_of_purchase: "12",
      time_of_expiration: "2",
      imgurl: "",
      broken_pkg: true,
    },
  ]);
  const [productVisible, setProductVisible] = React.useState(true);
  const [quantity, setQuantity] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState([]);
	const [barCodeShow, setBarCodeShow] = React.useState(false);
	const [productName, setProductName] = React.useState("");
  const theme = useTheme();

  const PlusIcon = () => (
    <Icon style={styles.icon} fill="black" name="plus-circle-outline" />
  );
	
	const product = (productName) => {
		setProductName(productName);
		console.log(productName);
	}
	const barCodeActive = (barCodeShow) => {
		setBarCodeShow(barCodeShow);

	}
  const quantityHandler = (input) => {
    setQuantity(input);
  };
  const infoHandler = (input) => {
    setProductInfo(input);
  };

  const printInfo = () => {
    console.log("Skickat över");
    console.log(productInfo);
  };

  const addComp = ({ item, index }) => (
    <CreatedNewItem
      product_text={productInfo.product_text}
      quantity={productInfo.quantity}
      setVisible={setProductVisible}
      containerStyle={styles.list_style}
    />
  );

  const giveKey = ({ item, index }) => reuturn(item);
	
	if (!barCodeShow) {
		return (
			<Layout style={styles.container}>
				<List
					style={styles.container_list}
					data={productInfo}
					renderItem={addComp}
					key={giveKey}
				/>

				{/* {productVisible == false && ( */}
				{/* <CreatedNewItem
        product_text={productInfo.product_text}
        quantity={productInfo.quantity}
        setVisible={setProductVisible}
      /> */}

				{/* {productVisible && ( */}
				<InputNewItem
					func={barCodeActive}
					setVisible={setProductVisible}
					setProductInfo={infoHandler}
				// setProductText={textHandler}
				// setQuantity={quantityHandler}
				// quantity={quantity}
				// productText={product_text}
				/>

				<Layout style={{ alignSelf: "left", paddingBottom: 15 }}>
					<Button
						appearance="ghost"
						accessoryLeft={PlusIcon}
						onPress={() => {
							printInfo();
						}}
					>
						Lägg till en ny vara{" "}
					</Button>
				</Layout>
				<Button style={{ width: 300, alignSelf: "center" }}> Skapa Inlägg</Button>
			</Layout>
		);
	} else {
		return (
			<BarCodeScannerComp
				func={barCodeActive}
				productInfo={product}
			/>
		)
	}
};

export default CreateNewItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
