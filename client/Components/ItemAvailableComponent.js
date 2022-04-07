import React from "react";
import {
  StyleSheet,
  View,
  Image,
  RefreshControl,
  ScrollView,
} from "react-native";
import {
  Text,
  List,
  ListItem,
  Icon,
  Modal,
  Card,
  Button,
  Layout,
  Radio,
  RadioGroup,
  Input,
} from "@ui-kitten/components";
import tw from "twrnc";
//import { render } from 'react-dom';
import { CommunityInfo} from "../assets/AppContext";
import { getOffers } from "../Services/ServerCommunication.js";

const DiscoverIcon = (props) => <Icon {...props} name="compass-outline" />;

let otherItems = [];
let ownItems = [];
let id = 1;

async function getItems() {
  let offers = await getOffers([1]);
  offers.forEach((offer) => {
    if ((offer.user_id == id)) {
      ownItems.push(offer);
    } else {
      otherItems.push(offer);
    }
  });
}

// const items = getItems();
// function getItems() { //TODO: Get the users actuall listning items
//     return new Array(10).fill({
//         user_id : 1,
//         product_id :1,
//         product_text : "Apelsin",
//         description: "Beskrivning av varan, den kanske är såhär lång?",
//         quantity: "3 st",
//         time_of_creation: "Today 13.37",
//         time_of_purchase: "Date",
//         time_of_expiration: "2022-04-01",
//         imgurl : <DiscoverIcon />,
//         broken_pkg : true,
//     });
// };

// const myItems = getMyItems();
// function getMyItems() { // TODO: Get the actuall offers in the communitys
//   return new Array(3).fill({
//     user_id : 1,
//     product_id :1,
//     product_text : "Apelsin",
//     description: "Beskrivning av varan",
//     quantity: "3 st",
//     time_of_creation: "Today 13.37",
//     time_of_purchase: "Date",
//     time_of_expiration: "",
//     imgurl : <DiscoverIcon />,
//     broken_pkg : true,
//   });
// };

// const lists = getLists();

async function getLists() {
  await getItems();
  let arrayList = new Array(2);
  arrayList[0] = {
    //My items
    data: ownItems,
    myListings: true,
  };
  arrayList[1] = {
    //All available
    data: otherItems,
    myListings: false,
  };
  return arrayList;
}

export const ItemAvailableComponent = () => {
  const [visible, setVisible] = React.useState(false);
  const [myVisible, setMyVisible] = React.useState(false);
  const { community } = React.useContext(CommunityInfo);
  const [takeProduct, setTakeProduct] = React.useState(false);
  //const [refreshing, setRefreshing] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [items, setItems] = React.useState([]);

  /*React.useEffect(() => {
    const fetchItems = async () => {setItems(await getLists())}

    fetchItems()
  }, [])*/

  const onRefresh = React.useCallback(() => {
    // Used when users refreshes a page
    setRefreshing(true);
    //TODO: Implement actuall refresh function
    setRefreshing(false);
  }, []);

  const renderAvailableItems = ({ item }) => (
    <View>
      <ListItem
        style={styles.container}
        onPress={() => setVisible(true)}
        accessoryLeft={item.imgurl}
        title={`${item.product_text}`}
        description={`${item.quantity}`}
      />
      <Modal //Modal for additional information about a product
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true} style={{ width: 320, flex: 1 }}>
          <Layout style={tw`py-10`}>
            <Image
              style={tw`rounded-full`}
              source={{
                uri: "https://picsum.photos/150/150",
                height: 100,
                width: 100,
              }}
            />
          </Layout>
          <Text style={{ marginBottom: 10 }}>
            {item.product_text} {item.quantity}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Utångsdag: {item.time_of_expiration}
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Bruten förpackning: {item.broken_pkg ? "Japp" : "Nepp"}{" "}
          </Text>
          <Text style={{ marginBottom: 10 }}>Användare som lagt upp</Text>
          <Text style={{ marginBottom: 10 }}>{item.description}</Text>
          <Button onPress={() => (setTakeProduct(true), setVisible(false))}>
            Ta vara
          </Button>
        </Card>
      </Modal>

      <Modal //Modal for setting time & requesting an offer
        visible={takeProduct}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        onBackdropPress={() => (setTakeProduct(false), setVisible(false))}
      >
        <Card disabled={true} style={{ width: 320, flex: 1 }}>
          <Layout style={tw`py-10`}>
            <Image
              style={tw`rounded-full`}
              source={{
                uri: "https://picsum.photos/100/100",
                height: 80,
                width: 80,
              }}
            />
          </Layout>
          <Text style={{ marginBottom: 10 }}>Jag kan hämta varan: </Text>
          <RadioGroup
            selectedIndex={selectedIndex}
            onChange={index => setSelectedIndex(index)}
          >
            <Radio>Idag</Radio>
            <Radio>Imorgon</Radio>
            <Radio>Inom de närmaste dagarna</Radio>
            <Radio>Annat datum: </Radio>
          </RadioGroup>
            <Input 
              style={{marginBottom:10,}}
              placeholder = 'Annat datum'
              disabled={selectedIndex !== 3}
            />
          <Button onPress={() => (setTakeProduct(false), setVisible(false), console.log(selectedIndex))}>Ta vara</Button>
        </Card>
      </Modal>
    </View>
  );

  const renderMyItems = (
    { item } //Used for rendering my items
  ) => (
    <View>
      <ListItem
        style={styles.container}
        onPress={() => setMyVisible(true)}
        accessoryLeft={item.imgurl}
        title={`${item.product_text} ${item.quantity}`}
        description={`${item.description}`}
      />
      <Modal
        visible={myVisible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.01)" }}
        onBackdropPress={() => setMyVisible(false)}
      >
        <Card disabled={true}>
          <Text> Min vara {item.title} </Text>
        </Card>
      </Modal>
    </View>
  );

  const renderLists = ({ item }) => (
    <View>
      <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
        {item.myListings
          ? "Mina varor"
          : community.map((name) => (
              <Text category={"h5"}>Tillgängligt i {name} </Text>
            ))}
      </Text>
      <List
        data={item.data}
        renderItem={item.myListings ? renderMyItems : renderAvailableItems}
      />
    </View>
  );

  return (
    /* <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>*/
    <View style={{ flex: 1 }}>
      <List data={items} renderItem={renderLists} />
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
  },
  spaceBetween: {
    marginBottom:10,
  }
});
