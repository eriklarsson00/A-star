import React from "react";
import { StyleSheet, View, Image, ScrollView, FlatList } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  Text,
  List,
  ListItem,
  Modal,
  Card,
  Button,
  Layout,
  Spinner,
  Tab,
  Icon,
  Divider,
  useTheme,
  TabView
} from "@ui-kitten/components";
import { getUserProfileById } from "../../Services/ServerCommunication";
import moment from "moment";
import "moment/locale/sv";
import tw from "twrnc";

const TopTabs = createMaterialTopTabNavigator();
export const ProductInfoModal = (props) => {
  const item = props.item;
  const [responder, setResponder] = React.useState({});
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const rating =
    responder.raters > 0
      ? Math.round((responder.rating * 10) / responder.raters) / 10 + "/5"
      : "Inga";

  const getResponder = async () => {
    let responder = await getUserProfileById(item.user_id);

    setResponder(responder[0]);
  };

  React.useEffect(() => {
    if (item.visible) return getResponder();
  }, [item.visible]);

  const RenderProfileInfo = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.imgContainer}>
          <Layout style={tw`py-10`}>
            <Image
              style={[tw`rounded-full`, { marginBottom: -40, marginTop: -10 }]}
              source={{
                uri: responder.imgurl,
                height: 100,
                width: 100,
              }}
            />
          </Layout>
          <Text style={{ marginTop: 15 }} category={"h4"}>
            {responder.firstname} {responder.lastname}
          </Text>
          <Layout style={styles.container}>
            <Card style={styles.card}>
              <Text style={[tw`text-center`, styles.text]}>
                {responder.given}
              </Text>
              <Divider />
              <Text style={[tw`text-center`, styles.text]}>Givet</Text>
            </Card>

            <Card style={styles.card}>
              <Text style={[tw`text-center`, styles.text]}>
                {responder.taken}
              </Text>
              <Divider />
              <Text style={[tw`text-center`, styles.text]}>Tagit</Text>
            </Card>

            <Card style={styles.card}>
              <Text style={[tw`text-center`, styles.text]}>{rating}</Text>
              <Divider />
              <Text style={[tw`text-center`, { fontSize: 10 }]}>Betyg</Text>
            </Card>
          </Layout>
        </View>
      </View>
    );
  };

  const RenderProductInfo = () => {
    return (
      <View >
        <View style={styles.image}>
          <Layout style={tw`py-8`}>
            <Image
              style={[tw`rounded-full`, styles.image]}
              source={{
                uri: item.imgurl,
                height: 100,
                width: 100,
              }}
            />
          </Layout>
        </View>
        <View>
          <View style={styles.units}>
            <Text category={"h4"} style={styles.header}>
              {item.product_text} {item.quantity} {item.unit}
            </Text>
          </View>
          <Divider style={styles.divider}></Divider>
          <Text category={"s1"} style={styles.textStyle}>
            Utångsdag:{" "}
            <Text category={"p1"}>
              {moment(item.time_of_expiration).format("dddd Do MMM hh:mm")}
              {"\n"}
              {moment(item.time_of_expiration).fromNow()}
            </Text>
          </Text>
          <Divider style={{ borderBottomWidth: 0.2 }} />
          <Text category={"s1"} style={styles.textStyle}>
            Bruten förpackning:{" "}
            {item.broken_pkg ? (
              <Icon style={styles.icon} fill="green" name="checkmark-circle" />
            ) : (
              <Icon style={styles.icon} fill="red" name="close-outline" />
            )}
          </Text>
          <Divider style={{ borderBottomWidth: 0.2 }} />
          <Text category={"p1"} style={styles.textStyle}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      style={{ flex: 1 }}
      //Modal for additional information about a product
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
       <TabView
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='ProduktInfo'>
        <Layout style={styles.tabContainer}>
          <RenderProductInfo/>
        </Layout>
      </Tab>
      <Tab title='AnvändarInfo'>
        <Layout style={styles.tabContainer}>
          <RenderProfileInfo/>
        </Layout>
      </Tab>
    </TabView>
        <Button onPress={() => props.toggleTake()}>Ta vara</Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  container: {
    paddingTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: "100%",
  },
  text: {
    fontSize: 12,
  },
  icon: {
    width: 20,
    height: 20,
    top: 5,
    left: 5,
  },
  units: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginTop: -10,
  },
  divider: {
    borderBottomWidth: 0.8,
    padding: 2,
  },
  textStyle: {
    marginBottom: 10,
    marginTop: 10,
  },
});

export default ProductInfoModal;