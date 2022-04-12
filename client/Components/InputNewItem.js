import React from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  Button,
  useTheme,
  Input,
  CheckBox,
  Layout,
  Icon,
  Image,
  Modal,
} from "@ui-kitten/components";
import tw from "twrnc";
import ImagePicker from "./ImagePicker"
import BarCodeScannerComp from "./BarCodeScanner.component"
export const InputNewItem = (props) => {
 
 
  const [allProducts, setAllProducts] = React.useState([]);
  const [productInfo, setProductInfo] = React.useState({
    product_text: props.product,
    description: "",
    quantity: "",
    time_of_creation: "",
    time_of_purchase: "",
    time_of_expiration: "",
    imgurl: "",
    broken_pkg: false,
  });

  const [description, setDescription] = React.useState("");
  const [barCodeShow, setBarCodeShow] = React.useState(false);

  const [time_of_creation, setTime_of_creation] = React.useState("");
  const [time_of_purchase, setTime_of_purchase] = React.useState("");
  const [time_of_expiration, setTime_of_expiration] = React.useState("");
  const [imgurl, setImgurl] = React.useState("");
  const [broken_pkg, setBroken_pkg] = React.useState(false);
  const [productVisible, setProductVisible] = React.useState(true);
  const [barcodeProduct, setBarcodeProduct] = React.useState("");
  const product = props.product;
  const theme = useTheme();
  const CameraIcon = () => (
    <Icon style={styles.lockStyle} fill="black" name="camera-outline" />
  );

   
  const createItem = () => {
    console.log("HEJSANNNN WOOW");
    console.log(productInfo);
  };
  
  const itemHandler = (input) => {
    props.setProductText(input);
  };
  const quantityHandler = (input) => {
    props.setQuantity(input);
  };
  
  const barcodeText = () => {
    if (!product) {
      setProductInfo({ ...productInfo, product_text: product })
    }
  }
  
  

  if (barCodeShow === false) {
    return (
    
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
            onPress={() => { props.func(true) }}
         
          >
        
            {" "}
          </Button>
        </Layout>
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Typ av vara"
          value={productInfo.product_text}
          onChangeText={(value) =>
            setProductInfo({ ...productInfo, product_text: value })
          }
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Beskrivning av vara"
          value={productInfo.description}
          onChangeText={(value) =>
            setProductInfo({ ...productInfo, description: value })
          }
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Antal*"
          value={productInfo.quantity}
          onChangeText={(value) =>
            setProductInfo({ ...productInfo, quantity: value })
          }
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Datum varan köptes"
          value={productInfo.time_of_purchase}
          onChangeText={(value) =>
            setProductInfo({ ...productInfo, time_of_purchase: value })
          }
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Datum varan skapades"
          value={productInfo.time_of_creation}
          onChangeText={(value) =>
            setProductInfo({ ...productInfo, time_of_creation: value })
          }
        />
        <Input
          style={tw`pb-2 pl-5 pr-5`}
          placeholder="Utgångsdatum"
          value={productInfo.time_of_expiration}
          onChangeText={(value) =>
            setProductInfo({ ...productInfo, time_of_expiration: value })
          }
        />
        <CheckBox
          style={styles.checkbox}
          checked={productInfo.broken_pkg}
          onChange={(value) =>
            setProductInfo({ ...productInfo, broken_pkg: value })
          }
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
            onPress={() => {
              props.setVisible(false);
              props.setProductInfo(productInfo);
            }}
          >
            Skapa vara
          </Button>
        </Layout>
      </Layout>
    );
  } else {
    return (
      <BarCodeScannerComp />
    )
  }
} 


const styles = StyleSheet.create({
  item: {
    width: 370,
    alignSelf: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
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
  AddIconContainer: {
        position: 'absolute',
        marginTop: 110,
        backgroundColor: 'white',
        borderRadius: 50
    },
});
