import React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  useTheme,
  Input,
  Layout,
  Icon,
  Text,
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
    time_of_expiration: new Date(),
  });
  const [productVisible, setProductVisible] = React.useState(true);
  const [created, setCreated] = React.useState(false);
  const [dateExp, setDateExp] = React.useState(new Date());

  const newDate = new Date(); // behövs för kalendern
  const theme = useTheme();

  // Icons
  const CollapseIcon = () => (
    <Icon style={styles.iconCollapse} fill="grey" name="collapse-outline" />
  );

  // Sker när användaren "skapar" en vara (OBS inte inlägget)
  const handleInfo = () => {
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
              <Button
                style={{ width: 140 }}
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
              {"\n"}Antal: {productInfo.quantity}
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