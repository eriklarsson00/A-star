import React from "react";
import { StyleSheet, View, Image, ScrollView, FlatList } from "react-native";
import {
  Text,
  List,
  ListItem,
  Modal,
  Card,
  Button,
  Layout,
  Spinner,
  Divider,
  TabView,
  Tab
} from "@ui-kitten/components";
import { getUserProfileById } from "../../Services/ServerCommunication";
import DateTimePicker from "@react-native-community/datetimepicker";
import tw from "twrnc";

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
    console.log(responder);
    setResponder(responder[0]);
  };
  
  React.useEffect(() => {
   if(item.visible) return getResponder();
  }, [item.visible]);

const RenderProfileInfo = () => {
      return (
        <View>
          <View style={styles.imgContainer}>
            <Layout style={tw`py-10`}>
              <Image
                style={[
                  tw`rounded-full`,
                  { marginBottom: -40, marginTop: -10 },
                ]}
                source={{
                  uri: responder.imgurl,
                  height: 90,
                  width: 90,
                }}
              />
            </Layout>
            <Text style={{ marginTop: 15} }category={"h3"}>{ responder.firstname} {responder.lastname }</Text>
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
      )
}
  
  const RenderProductInfo = () => {
    return (
      <View>
       <View
          style={{
            flexDirection: "column",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "left",
          }}
        >
          <Text category={"h6"} style={{ marginLeft: 20 }}>Vara</Text>
          <Text category={"s1"} style={{ marginLeft: 20, borderBottomWidth: 1, }}>
            {item.product_text}
          </Text>
          <Text category={"h6"} style={{ marginLeft: 20, marginTop: 10 }}>Antal</Text>
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.quantity}
          </Text>
          <Text category={"h5"} style={{ marginLeft: 20, marginTop: 10 }}>Senast Inom</Text>
          <Text category={"s1"} style={{ marginLeft: 20 }}>
            {item.time_of_expiration}
          </Text>
        </View>
        
        <Text category={"h5"} style={{ marginBottom: 10, marginLeft: 20, marginTop: 10 }}>Beskrivning</Text>
        <Text category={"s1"} style={{ marginBottom: 10 }}>{item.description}</Text>
        </View>
    )
  }
  




  return (
    <Modal
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
      <View style={styles.units}>
        <Text category={"h3"}>
            {item.product_text}  {item.quantity} {item.unit}
          </Text>
        </View>
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
        <Button title="ta vara" style={{ marginTop: 10, marginBottom: 5 }} onPress={() => props.toggleTake()}>Ge vara</Button>
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
    padding: 30
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});