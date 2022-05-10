import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  Text,
  Modal,
  Card,
  Button,
  Layout,
  Divider,
  TabView,
  Tab,
  useTheme,
} from "@ui-kitten/components";
import { getUserProfileById } from "../../Services/ServerCommunication";
import tw from "twrnc";
import moment from "moment";
import "moment/locale/sv";
import { requestedImage } from "../../assets/Images";

export const RequestedInfoModal = (props) => {
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

  const ItemDescriptiom = () => {
    if (item.description) {
      return (
        <Text category={"p1"} style={styles.textStyleBorder}>
          {item.description}
        </Text>
      );
    } else {
      return <View />;
    }
  };

  React.useEffect(() => {
    if (item.visible) return getResponder();
  }, [item.visible]);

  const RenderProfileInfo = () => {
    return (
      <View>
        <View style={styles.imgContainer}>
          <Layout style={tw`py-10`}>
            <Image
              style={[tw`rounded-full`, { marginBottom: -40, marginTop: -10 }]}
              source={{
                uri: responder.imgurl,
                height: 90,
                width: 90,
              }}
            />
          </Layout>
          <Text style={{ marginTop: 15 }} category={"h3"}>
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
      <View>
        <View style={styles.imgContainer}>
          <Layout style={tw`py-8`}>
            <Image
              style={{ marginBottom: -40, marginTop: -10 }}
              source={{
                uri: requestedImage,
                height: 90,
                width: 90,
              }}
            />
          </Layout>
        </View>
        <View>
          <View style={styles.units}>
            <Text category={"h4"}>
              {item.product_text} {item.quantity} {item.unit}
            </Text>
          </View>
          <Divider style={styles.divider}></Divider>
          <Text category={"s1"} style={styles.textStyle}>
            Efterfrågas av: <Text category={"p1"}> {responder.firstname}</Text>
          </Text>
          <Text category={"s1"} style={styles.textStyle}>
            Behövs senast:{" "}
            <Text category={"p1"}>
              {moment(item.time_of_expiration).format("dddd Do MMM")}
            </Text>
          </Text>
          <ItemDescriptiom />
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.25)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
        <TabView
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title="ProduktInfo">
            <Layout style={styles.tabContainer}>
              <RenderProductInfo />
            </Layout>
          </Tab>
          <Tab title="AnvändarInfo">
            <Layout style={styles.tabContainer}>
              <RenderProfileInfo />
            </Layout>
          </Tab>
        </TabView>
        <Button
          title="ta vara"
          style={{ marginTop: 10, marginBottom: 5 }}
          onPress={() => props.toggleTake()}
        >
          Ge vara
        </Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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
  divider: {
    borderBottomWidth: 0.8,
  },
  icon: {
    width: 20,
    height: 20,
    top: 5,
    left: 5,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 12,
  },
  textStyle: {
    marginBottom: 10,
    marginTop: 10,
  },
  textStyleBorder: {
    marginBottom: 10,
    marginTop: 10,
    borderColor: "grey",
    borderWidth: 0.7,
    borderRadius: 3,
    padding: 5,
  },
  units: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
});
