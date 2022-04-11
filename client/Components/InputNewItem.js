import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import {
  TopNavigation,
  Button,
  useTheme,
  Input,
  CheckBox,
  Layout,
  Icon,
  Image,
} from "@ui-kitten/components";
import tw from "twrnc";

export const InputNewItem = (props) => {
  const [allProducts, setAllProducts] = React.useState([]);
  const [productInfo, setProductInfo] = React.useState({
    id: 0,
    product_text: "",
    description: "",
    quantity: "",
    time_of_creation: "",
    time_of_purchase: "",
    time_of_expiration: "",
    imgurl: "",
    broken_pkg: false,
  });

  const [productVisible, setProductVisible] = React.useState(true);

  const theme = useTheme();
  const CameraIcon = () => (
    <Icon style={styles.lockStyle} fill="black" name="camera-outline" />
  );

  const EditIcon = () => (
    <Icon style={styles.icon2} fill="grey" name="edit-outline" />
  );

  const createItem = () => {
    console.log("HEJSANNNN WOOW");
    console.log(productInfo);
  };

  const itemHandler = (input) => {
    props.setProductText(input);
  };

  const handleInfo = () => {
    setProductInfo({ ...productInfo, id: props.id });
    setProductVisible(false);
    props.setProductInfo(productInfo);
  };

  return (
    <Layout>
      {productVisible && (
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
                handleInfo();
              }}
            >
              Skapa vara
            </Button>
          </Layout>
        </Layout>
      )}
      {!productVisible && (
        <Layout style={styles.item2}>
          <Button
            style={{
              borderColor: theme["color-primary-300"],
              backgroundColor: theme["color-primary-300"],
              height: 70,
              justifyContent: "flex-start",
            }}
            onPress={() => {
              setProductVisible(true);
            }}
          >
            <Text style={{ fontSize: 20 }}>{productInfo.product_text}</Text>
            <Text>
              {"\n"}Antal: {productInfo.quantity}
            </Text>
          </Button>
        </Layout>
      )}
    </Layout>
  );
};

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
  item2: {
    width: 370,
    alignSelf: "center",
    paddingBottom: 5,
    paddingTop: 5,
    backgroundColor: "rgba(255, 250, 240, 0.08)",
  },
  icon2: {
    width: 30,
    height: 30,
  },
});
