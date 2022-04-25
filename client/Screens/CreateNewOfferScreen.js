import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  useTheme,
  Layout,
  Icon,
  List,
  Modal,
  Card,
  Divider,
  Tooltip,
} from "@ui-kitten/components";
import tw from "twrnc";
import { InputNewOfferComponent } from "../Components/InputNewOfferComponent";
import BarCodeScannerComp from "../Components/BarCodeScanner.component";
import { MyCommunitysInfo, UserInfo } from "../assets/AppContext";
import { NewItemCommunityComponent } from "../Components/NewItemCommunityComponent";
import { pushImagesToServer, postOffer } from "../Services/ServerCommunication";

const CreateNewOfferScreen = ({ navigation }) => {
  //CONTEXT
  const { myCommunitysInfo, setMyCommunitysInfo } =
    React.useContext(MyCommunitysInfo);
  const { userInfo, setUserInfo } = React.useContext(UserInfo);

  // STATES
  const [productInfo, setProductInfo] = React.useState([]);
  const [compId, setCompId] = React.useState(0);
  const [count, setCount] = React.useState([0]);
  const [productName, setProductName] = React.useState("");
  const [barCodeShow, setBarCodeShow] = React.useState(false);
  const [createPost, setCreatePost] = React.useState(false);
  const [chosenCommunity, setChosenCommunity] = React.useState([]);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [images, setImages] = React.useState([]);

  const theme = useTheme();

  const PlusIcon = () => (
    <Icon style={styles.icon} fill="black" name="plus-circle-outline" />
  );

  // barcodescanner
  const product = (productName) => {
    setProductName(productName);
  };
  const barCodeActive = (barCodeShow) => {
    setBarCodeShow(barCodeShow);
  };

  // koppla mellan parent och child (InputNewItem)
  // Funktionen ska lägga in ett nytt object i listan av alla objekt i inlägget
  const infoHandler = (input) => {
    setProductInfo((productInfo) => [...productInfo, input]);
  };
  // Håller koll på vilket id en vara ska ha (lokalt, bara för den här screenen)
  const addId = (input) => {
    setCompId(compId + input);
  };

  // Ska skapa en ny vara/produkt i inlägget
  const newComp = () => {
    const length = count.length;
    setCount((count) => [...count, length]);
  };

  // lägg in en ny bild i arrayen av alla bilder
  const pushImage = (image) => {
    setImages([...images, image]);
  };

  // ska updatera en vara, INTE skapa en ny
  const updateItem = (inputId, updatedItem) => {
    for (let i = 0; i < productInfo.length; i++) {
      if (productInfo[i].id === inputId) {
        let newProductInfo = [...productInfo];
        newProductInfo[i] = updatedItem;
        setProductInfo(newProductInfo);
        return;
      }
    }
    console.log("ERROR: no item with inputId found");
  };

  // Lista av enskilda varor
  const addComp = ({ item, index }) => (
    <Layout>
      <InputNewOfferComponent
        setProductInfo={infoHandler}
        id={compId}
        user_id={userInfo.id}
        setId={addId}
        setChange={updateItem}
        func={barCodeActive}
        product={productName}
        pushImage={pushImage}
      />
    </Layout>
  );

  // funktion som behövs för listor
  const giveKey = ({ item, index }) => reuturn(item);

  // Lista av mina communities
  const printMyCommunities = ({ item, index }) => (
    <Layout>
      <NewItemCommunityComponent community={item} addCommunity={addCommunity} />
    </Layout>
  );

  // Funktion som kollar om ett community ska läggas till av valda communities eller tas bort (alltså där inlägget ska publiceras)
  const addCommunity = (community, remove) => {
    for (let i = 0; i < chosenCommunity.length; i++) {
      if (chosenCommunity[i].id === community.id) {
        if (remove) {
          // om remove == falsk ska det community tas bort från listan
          let newChosenCommunity = chosenCommunity.filter(
            (com) => com.name != community.name
          );
          setChosenCommunity(newChosenCommunity);
          return;
        } else {
          return;
        }
      }
    }
    setChosenCommunity((chosenCommunity) => [...chosenCommunity, community]);
  };

  // förbereder objektet för att kunna skickas till servern
  const prepareProduct = async (product, communities) => {
    let imgurl = await pushImagesToServer(
      images[product.id],
      "itemimages",
      userInfo.id
    );
    product.id = undefined;
    product.imgurl = imgurl;
    postOffer(product, communities);
  };

  const publishOffer = () => {
    const communityIds = chosenCommunity.map(({ id }) => id);

    productInfo.forEach((product) => {
      prepareProduct(product, communityIds);
      console.log(communityIds);
    });
    //skickar upp varje bild till s3 när vi publicerar inlägget
  };

  // Knapp som ska publicera inlägget
  const renderPublishButton = () => (
    <Button
      onPress={() => {
        if (chosenCommunity.length == 0) {
          setTooltipVisible(true);
        } else {
          publishOffer();
          setCreatePost(false);
          navigation.navigate("AddItemScreen");
        }
      }}
    >
      Publicera inlägg
    </Button>
  );

  if (!barCodeShow) {
    return (
      <Layout style={styles.container}>
        <List
          style={styles.container_list}
          data={count}
          renderItem={addComp}
          key={giveKey}
        />

        <Layout
          style={{
            alignSelf: "left",
            paddingLeft: 30,
            backgroundColor: "rgba(255, 250, 240, 0.08)",
          }}
        >
          <Button
            appearance="ghost"
            accessoryLeft={PlusIcon}
            onPress={() => {
              newComp();
            }}
          >
            Lägg till en ny vara{" "}
          </Button>
        </Layout>
        <Layout
          style={{
            paddingBottom: 15,
            backgroundColor: "rgba(255, 250, 240, 0.08)",
          }}
        >
          <Button
            style={{ width: 300, alignSelf: "center" }}
            onPress={() => {
              setCreatePost(true);
            }}
          >
            {" "}
            Skapa Inlägg
          </Button>
        </Layout>
        <Modal
          visible={createPost}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setCreatePost(false)}
        >
          <Card disabled={true}>
            {myCommunitysInfo.length != 0 && (
              <Text style={tw`text-lg font-semibold text-center pb-5`}>
                Vilka grannskap vill du publicera inlägget i?
              </Text>
            )}
            {myCommunitysInfo.length == 0 && (
              <Text>
                Du måste gå med i ett grannskap för att publicera inlägget!
              </Text>
            )}
            <Divider />
            <List
              style={styles.dataBaseList}
              data={myCommunitysInfo}
              ItemSeparatorComponent={Divider}
              renderItem={printMyCommunities}
              key={giveKey}
            />

            <Layout style={{ paddingTop: 10 }}>
              <Tooltip
                anchor={renderPublishButton}
                visible={tooltipVisible}
                onBackdropPress={() => setTooltipVisible(false)}
              >
                Du måste välja ett grannskap först!
              </Tooltip>
            </Layout>
          </Card>
        </Modal>
      </Layout>
    );
  } else {
    return <BarCodeScannerComp func={barCodeActive} productInfo={product} />;
  }
};

export default CreateNewOfferScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
  icon: {
    width: 30,
    height: 30,
  },
  container_list: {
    height: 200,
  },
  list_style: {
    backgroundColor: "red",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
