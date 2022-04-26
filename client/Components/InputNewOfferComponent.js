import React from "react";
import { StyleSheet, TouchableOpacity, Image, View } from "react-native";
import {
  Button,
  useTheme,
  Input,
  CheckBox,
  Layout,
  Icon,
  Modal,
  Card,
  Text,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import tw from "twrnc";
import ImagePicker from "./ImagePickerComponent";
import BarCodeScannerComp from "./BarCodeScannerComponent";
import { ProfileImagePath, ItemImagePath } from "../assets/AppContext";
import DateTimePicker from "@react-native-community/datetimepicker";

//TODO: Inte kunna "skapa" en vara utan att ha skrivit ett namn eller påbörjat att skapa den

export const InputNewOfferComponent = (props) => {
  // Objectet för hur en offer ska se ut
  const [productInfo, setProductInfo] = React.useState({
    id: 0,
    user_id: 0,
    product_text: props.product,
    description: "",
    quantity: "",
    unit: "",
    time_of_purchase: new Date(),
    imgurl: "",
    broken_pkg: false,
  });

  // STATES
  const [productVisible, setProductVisible] = React.useState(true);
  const [created, setCreated] = React.useState(false);
  const [barCodeShow, setBarCodeShow] = React.useState(false);
  const [image, setImage] = React.useState(null);
  const [datePurchase, setDatePurchase] = React.useState(new Date());
  const [dateExp, setDateExp] = React.useState();
  const [visible, setVisible] = React.useState(false);

  const [selectedUnitIndex, setSelectedUnitIndex] = React.useState();

  const newDate = new Date();
  const theme = useTheme();
  const units = ["ml", "dl", "l", "g", "kg", "st"];

  const CollapseIcon = () => (
    <Icon style={styles.iconCollapse} fill="grey" name="collapse-outline" />
  );

  // Tar hand om all info om när användaren tryckt på skapa vara knappen
  const handleInfo = () => {
    if (!created) {
      props.setId(1); // ger ett lokalt id (bara för screenen)
      setCreated(true); // "Skapar" varan, så att det inte blir dubbletter
    }
    setProductVisible(false);
    props.setProductInfo(productInfo);
  };

  // tar hand om när användaren vill uppdatera/ändra en vara som redan är "skapad"
  const handleChange = () => {
    props.setChange(productInfo.id, productInfo);
    setProductVisible(false);
  };

  // Tar hand om när användaren ska ta en bild på sin vara
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

  // Väljer utgångsdatum på användarens vara
  const ChooseExpDate = () => {
    if (dateExp) {
      return (
        <>
          <Text style={tw`pl-5 pt-1 text-base`}> Utgångsdatum på varan: </Text>
          <DateTimePicker
            style={{ width: 140 }}
            value={dateExp}
            mode={"date"}
            is24Hour={true}
            minimumDate={newDate}
            display="default"
            onChange={(event, date) => updateDateExp(date)}
          />
        </>
      );
    } else {
      return (
        <Button
          style={{ marginLeft: 20.5 }}
          onPress={() => {
            updateDateExp(new Date());
          }}
        >
          Sätt utgångsdatum
        </Button>
      );
    }
  };

  // Ska updatera det valda purchase datumet i både produktinfo och bara statet kopplat till kalendern
  const updateDatePurchase = (date) => {
    setDatePurchase(date);
    setProductInfo({ ...productInfo, time_of_purchase: date });
  };

  // Ska updatera det valda utgångsdatmet i både produktinfo och bara statet kopplat till kalendern
  const updateDateExp = (date) => {
    setDateExp(date);
    setProductInfo({ ...productInfo, time_of_expiration: date });
  };

  //printar ut units i drop down menu
  const printUnits = (title) => <SelectItem key={title} title={title} />;

  if (barCodeShow === false) {
    return (
      <Layout style={{ backgroundColor: theme["color-basic-300"] }}>
        {productVisible && (
          <Layout style={styles.itemContainer}>
            <Layout style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(true);
                }}
                style={styles.AddIconContainer}
              >
                <Image
                  style={styles.featureImage}
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
                  style={styles.featureImage}
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
            <View style={{ flexDirection: "row" }}>
              <Input
                style={[tw`pb-2 pl-5 pr-5`, { width: 150 }]}
                placeholder="Antal"
                value={productInfo.quantity}
                onChangeText={(value) =>
                  setProductInfo({ ...productInfo, quantity: value })
                }
              />
              <Select
                value={units[selectedUnitIndex - 1]}
                selectedIndex={selectedUnitIndex}
                onSelect={(index) => {
                  setSelectedUnitIndex(index);
                  setProductInfo({
                    ...productInfo,
                    unit: units[index - 1],
                  });
                }}
                placeholder="enhet"
                style={{ width: 115 }}
              >
                {units.map(printUnits)}
              </Select>
            </View>
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
              <ChooseExpDate />
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
            style={[
              styles.compactProductContainer,
              { backgroundColor: theme["color-basic-300"] },
            ]}
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
  AddIconContainer: {
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    paddingLeft: 20,
    paddingBottom: 20,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  featureImage: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
  },
  checkbox: {
    paddingTop: 10,
    paddingLeft: 20,
  },
  compactProductContainer: {
    width: 370,
    alignSelf: "center",
    paddingBottom: 5,
    paddingTop: 5,
  },
  collapse: {
    width: 30,
    paddingLeft: 130,
    height: 10,
    paddingBottom: 10,
  },
  iconCollapse: {
    width: 30,
    height: 30,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "gainsboro",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  lockStyle: {
    width: 55,
    height: 55,
  },
});
