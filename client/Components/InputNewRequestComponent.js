import React from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  useTheme,
  Input,
  Layout,
  Icon,
  Text,
  Select,
  SelectItem,
  Tooltip,
} from "@ui-kitten/components";
import tw from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";

export const InputNewRequestComponent = (props) => {
  const [productInfo, setProductInfo] = React.useState({
    id: 0,
    user_id: 0,
    product_text: "",
    description: "",
    quantity: "",
    unit: "",
    time_of_expiration: new Date(),
  });
  const [productVisible, setProductVisible] = React.useState(true);
  const [created, setCreated] = React.useState(false);
  const [dateExp, setDateExp] = React.useState(new Date());
  const [toolTipVisible, setToolTipVisible] = React.useState(false);

  const newDate = new Date(); // behövs för kalendern
  const theme = useTheme();

  const [selectedUnitIndex, setSelectedUnitIndex] = React.useState();
  const units = ["ml", "dl", "l", "g", "kg", "st"];

  // Icons
  const CollapseIcon = () => (
    <Icon style={styles.iconCollapse} fill="grey" name="collapse-outline" />
  );

  // Sker när användaren "skapar" en vara (OBS inte inlägget)
  const handleInfo = () => {
    if (
      productInfo.product_text === "" ||
      productInfo.quantity === "" ||
      productInfo.unit === "" ||
      productInfo.time_of_expiration === null
    ) {
      setToolTipVisible(true);
      return;
    }

    if (!created) {
      props.setId(1);
      setCreated(true);
    }
    setProductVisible(false);
    props.setProductInfo(productInfo);
  };

  // Tar hand om när användaren vill ändra någon information om sin vara (som redan är "skapad")
  const handleChange = () => {
    props.setChange(productInfo.id, productInfo);
    setProductVisible(false);
  };

  // Ska updatera det valda datumet varan senast behövs i både produktinfo och bara statet kopplat till kalendern
  const updateDateExp = (date) => {
    setDateExp(date);
    setProductInfo({ ...productInfo, time_of_expiration: date });
  };

  //printar ut units i drop down menu
  const printUnits = (title) => <SelectItem key={title} title={title} />;

  const handelDelete = () => {
    // TODO: ska ta bort den skapade varan!
  };

  const publishButton = () => (
    <Button
      style={{ width: 120 }}
      id="createItem"
      onPress={() => {
        handleInfo();
      }}
    >
      Skapa vara
    </Button>
  );

  return (
    <Layout style={{ backgroundColor: theme["color-basic-300"] }}>
      {productVisible && (
        <Layout style={styles.outerContainer}>
          <Layout style={styles.collapse}>
            <Button
              appearance="ghost"
              accessoryLeft={CollapseIcon}
              onPress={() => {
                setProductVisible(false);
              }}
            ></Button>
          </Layout>
          <Input
            style={tw`pb-2 pl-5 pr-5`}
            placeholder="Typ av vara*"
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
              placeholder="Antal*"
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
              placeholder="enhet *"
              style={{ width: 125 }}
            >
              {units.map(printUnits)}
            </Select>
          </View>
          <Layout style={{ flexDirection: "row" }}>
            <Text style={tw`pl-5 pt-1 pb-5 text-base`}>
              {" "}
              Varan behövs senast:{" "}
            </Text>
            <DateTimePicker
              style={{ width: 120 }}
              value={dateExp}
              mode={"date"}
              is24Hour={true}
              minimumDate={newDate}
              display="default"
              onChange={(event, date) => updateDateExp(date)}
            />
          </Layout>
          <Layout style={tw`pl-5`}>
            {created && (
              <Layout style={{ flexDirection: "row" }}>
                <Button
                  style={{ width: 140 }}
                  id="createItem"
                  onPress={() => {
                    handleChange();
                  }}
                >
                  Ändra vara
                </Button>
                <Button
                  style={{
                    width: 140,
                    marginLeft: 40,
                    backgroundColor: theme["color-danger-500"],
                    borderColor: theme["color-danger-500"],
                  }}
                  id="deleteItem"
                  onPress={() => {
                    console.log(productInfo.id);
                    props.handleDel(productInfo.id);
                  }}
                >
                  Ta bort vara
                </Button>
              </Layout>
            )}
            {!created && (
              <Layout style={{ paddingTop: 10 }}>
                <Tooltip
                  anchor={publishButton}
                  visible={toolTipVisible}
                  onBackdropPress={() => setToolTipVisible(false)}
                >
                  Du måste fylla alla obligatoriska fält!
                </Tooltip>
              </Layout>
            )}
          </Layout>
        </Layout>
      )}
      {!productVisible && (
        <Layout
          style={[
            styles.createdContainer,
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
              {"\n"}Antal: {productInfo.quantity} {productInfo.unit}
            </Text>
          </Button>
        </Layout>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  createdContainer: {
    width: 370,
    alignSelf: "center",
    paddingBottom: 5,
    paddingTop: 5,
  },
  outerContainer: {
    borderWidth: 1,
    borderColor: "gainsboro",
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconCollapse: {
    width: 30,
    height: 30,
  },
  collapse: {
    paddingLeft: 300,
    height: 10,
    paddingBottom: 50,
  },
});
