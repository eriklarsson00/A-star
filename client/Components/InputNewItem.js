import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  TopNavigation,
  Button,
  useTheme,
  Input,
  CheckBox,
  Layout,
  Icon,
  Modal,
  Card,
  Text,
} from "@ui-kitten/components";
import tw from "twrnc";
import ImagePicker from "./ImagePicker";
import BarCodeScannerComp from "./BarCodeScanner.component";
import { ProfileImagePath, ItemImagePath } from "../assets/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";

//TODO: Inte kunna "skapa" en vara utan att ha skrivit ett namn eller påbörjat att skapa den

export const InputNewItem = (props) => {
  const [productInfo, setProductInfo] = React.useState({
    id: 0,
    user_id: 0,
    product_text: props.product,
    description: "",
    quantity: "",
    time_of_creation: "",
    time_of_purchase: new Date(),
    time_of_expiration: new Date(),
    imgurl: "",
    broken_pkg: false,
  });
  const [productVisible, setProductVisible] = React.useState(true);
  const [created, setCreated] = React.useState(false);
  const [barCodeShow, setBarCodeShow] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [datePurchase, setDatePurchase] = React.useState(new Date());
  const [dateExp, setDateExp] = React.useState(new Date());
  const [visible, setVisible] = React.useState(false);
  const { profileImagePath, setProfileImagePath } =
    React.useContext(ProfileImagePath);

  const newDate = new Date();
  const product = props.product;
  const theme = useTheme();

  const BarIcon = () => (
    <Icon style={styles.lockStyle} fill="black" name="bar-chart-2-outline" />
  );

  const CollapseIcon = () => (
    <Icon style={styles.icon2} fill="grey" name="collapse-outline" />
  );

  const AddIcon = () => (
    <Icon style={styles.lockStyle} fill="#8F9BB3" name="plus-circle-outline" />
  );

  const handleInfo = () => {
    if (!created) {
      props.setId(1);
      setCreated(true);
    }
    setProductVisible(false);
    props.setProductInfo(productInfo);
  };

  const handleChange = () => {
    props.setChange(productInfo.id, productInfo);
    setProductVisible(false);
  };

  const ChoseImageModal = () => {
    return (
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => {
          setVisible(false);
        }}
      >
        <Card disabled={true}>
          <ImagePicker
            context="ItemImage"
            updateResult={(result) => {
              console.log("New picked image path: " + result.uri);
              setImage(result);
              props.pushImage(result);
            }}
          />
          <Button style={tw`mt-2 w-50`} onPress={() => setVisible(false)}>
            Klar
          </Button>
        </Card>
      </Modal>
    );
  };

  const updateDatePurchase = (date) => {
    setDatePurchase(date);
    setProductInfo({ ...productInfo, time_of_purchase: date });
  };

  const updateDateExp = (date) => {
    setDateExp(date);
    setProductInfo({ ...productInfo, time_of_expiration: date });
  };

  const barcodeText = () => {
    if (!product) {
      setProductInfo({ ...productInfo, product_text: product });
    }
  };

  if (barCodeShow === false) {
    return (
      <Layout style={{ backgroundColor: theme["color-basic-300"] }}>
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
            <Layout style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
                style={styles.AddIconContainer}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 4,
                  }}
                  source={{
                    uri:
                      image === null
                        ? "https://www.mcicon.com/wp-content/uploads/2021/02/Technology_Camera_1-copy-22.jpg"
                        : image.uri,
                    height: 150,
                    width: 150,
                  }}
                />
                <ChoseImageModal />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.func(true);
                }}
                style={styles.AddIconContainer}
              >
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderColor: "grey",
                    borderRadius: 4,
                  }}
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKFtLJb-9ebWHz70NK37A_9_bXjULFjI4M7Q&usqp=CAU",
                    height: 150,
                    width: 150,
                  }}
                />
              </TouchableOpacity>
              <Layout style={styles.collapse}>
                <Button
                  appearance="ghost"
                  accessoryLeft={CollapseIcon}
                  onPress={() => {
                    setProductVisible(false);
                  }}
                ></Button>
              </Layout>
            </Layout>
            <Input
              style={tw`pb-2 pl-5 pr-5`}
              placeholder="Typ av vara"
              value={productInfo.product_text}
              onChangeText={(value) =>
                setProductInfo({
                  ...productInfo,
                  product_text: value,
                  id: created ? productInfo.id : props.id,
                  user_id: props.user_id,
                })
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
              placeholder="Antal"
              value={productInfo.quantity}
              onChangeText={(value) =>
                setProductInfo({ ...productInfo, quantity: value })
              }
            />
            <Layout style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text style={tw`pl-5 pt-1 text-base`}> Datum varan köptes: </Text>
              <DateTimePicker
                style={{ width: 168 }}
                value={datePurchase}
                mode={"date"}
                is24Hour={true}
                display="default"
                onChange={(event, date) => updateDatePurchase(date)}
              />
            </Layout>
            <Layout style={{ flexDirection: "row" }}>
              <Text style={tw`pl-5 pt-1 text-base`}>
                {" "}
                Utgångsdatum på varan:{" "}
              </Text>
              <DateTimePicker
                style={{ width: 140 }}
                value={dateExp}
                mode={"date"}
                is24Hour={true}
                minimumDate={newDate}
                display="default"
                onChange={(event, date) => updateDateExp(date)}
              />
            </Layout>
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
                  }}
                >
                  Bruten förpackning
                </Text>
              )}
            </CheckBox>
            <Layout style={{ paddingLeft: 228 }}>
              {created && (
                <Button
                  style={{ width: 120 }}
                  id="createItem"
                  onPress={() => {
                    handleChange();
                  }}
                >
                  Ändra vara
                </Button>
              )}
              {!created && (
                <Button
                  style={{ width: 120 }}
                  id="createItem"
                  onPress={() => {
                    handleInfo();
                    console.log(productInfo);
                  }}
                >
                  Skapa vara
                </Button>
              )}
            </Layout>
          </Layout>
        )}
        {!productVisible && (
          <Layout
            style={{
              width: 370,
              alignSelf: "center",
              paddingBottom: 5,
              paddingTop: 5,
              backgroundColor: theme["color-basic-300"],
            }}
          >
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
  } else {
    return <BarCodeScannerComp />;
  }
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
  icon2: {
    width: 30,
    height: 30,
  },
  collapse: {
    width: 30,
    paddingLeft: 130,
    height: 10,
    paddingBottom: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  AddIconContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 20,
    paddingBottom: 20,
  },
});
