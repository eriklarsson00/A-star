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
} from "@ui-kitten/components";
import { getUserProfileById } from "../../Services/ServerCommunication";
import tw from "twrnc";
import moment from "moment";
import "moment/locale/sv";

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
        <Text style={tw`mt-2 text-base font-bold`}>
          Efterfrågas av:<Text style={tw``}> {responder.firstname}</Text>
        </Text>
        <Text style={tw`text-lg mt-5 mb-2`}>
          {item.product_text}, {item.quantity} {item.unit}
        </Text>
        <Divider style={styles.divider} />
        <Text style={tw`text-base mt-2 mb-2`}>{item.description}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={tw`font-bold`}>
            Behövs senast:{" "}
            <Text style={tw`text-base mt-2 mr-2`}>
              {moment(item.time_of_expiration).format("Do MMM YYYY")}
            </Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
        <View style={styles.units}>
          <Text category={"h3"}>
            {item.product_text} {item.quantity} {item.unit}
          </Text>
        </View>
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
  divider: {
    borderBottomWidth: 0.8,
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
    padding: 30,
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
