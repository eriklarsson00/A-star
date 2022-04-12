import React from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  Text,
  Layout,
  Divider,
  Button,
  Modal,
  Card,
  Input,
  Icon,
  List,
  useTheme,
  ListItem,
} from "@ui-kitten/components";
import CommunityComponent from "../Components/CommunityComponent";
import tw from "twrnc";
import {
  UserInfo,
  MyCommunitysInfo,
  ShowCommunityIds,
  ProfileImagePath,
} from "../assets/AppContext";
import { getCommunities } from "../Services/ServerCommunication";

// Spara alla id som man vill se i ett context
// Spara alla communitys som man är med i i ett annat.

//const dataBaseCommunities = getAllCommunities();

async function getAllCommunities() {
  let communities = await getCommunities();
  return communities;
}

export const CommunityScreen = () => {
  const [visible, setVisible] = React.useState(false);
  const [joinCommunity, setJoinCommunity] = React.useState(false);
  const [IncorrectCommunityPassword, setIncorrectCommunityPassword] =
    React.useState(false);
  const [joinPrivateCommunity, setJoinPrivateCommunity] = React.useState(false);
  const [myCommunitysInfo, setMyCommunitysInfo] =
    React.useState(MyCommunitysInfo);
  const [communityPasswordInput, setCommunityPasswordInput] =
    React.useState("");
  const { profileImagePath, setProfileImagePath } =
    React.useContext(ProfileImagePath);
  const [chosenCommunity, setChosenCommunity] = React.useState("");
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const [dataBaseCommunities, setDataBaseCommunities] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const getComm = async () => {
      setDataBaseCommunities(await getAllCommunities());
    };
    getComm();
    setMyCommunitysInfo([]); // TODO: Detta återställer ens communities till noll (=> Sätta start comms ngnstans)
  }, [isFocused]);

  const printCommunity = ({ item, index }) => (
    <CommunityComponent name={item} />
  );

  const giveKey = ({ item, index }) => reuturn(item);

  const LockIcon = () => (
    <Icon style={styles.lockStyle} fill="#8F9BB3" name="lock-outline" />
  );

  const CrossIcon = () => (
    <Icon
      style={styles.crossStyle}
      fill={theme["color-basic-600"]}
      name="close-circle-outline"
    />
  );

  const theme = useTheme();

  function tryPassword() {
    if (communityPasswordInput == "test") {
      setMyCommunitysInfo([...myCommunitysInfo, chosenCommunity]);
      setJoinPrivateCommunity(false);
      setVisible(false);
      setIncorrectCommunityPassword(false);
      setCommunityPasswordInput("");
    } else {
      setIncorrectCommunityPassword(true);
      setCommunityPasswordInput("");
    }
  }
  const printExistingCommunities = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.touchableStyle,
        {
          backgroundColor:
            chosenCommunity == item.name
              ? theme["color-basic-300"]
              : theme["color-basic-100"],
        },
      ]}
      onPress={() => {
        chosenCommunity == item.name
          ? setChosenCommunity("")
          : setChosenCommunity(item.name);
      }}
    >
      <View style={styles.communityContainer}>
        <View style={{ width: 215 }}>
          <Text style={tw`text-lg`}>{item.name}</Text>
        </View>
        {item.private === 1 && <LockIcon />}
      </View>
      {chosenCommunity == item.name && (
        <View>
          <Divider
            style={{
              marginBottom: 5,
              alignSelf: "stretch",
              backgroundColor: theme["color-basic-400"],
            }}
          />
          <View style={styles.communityImageContainer}>
            <Image
              style={styles.communityImage}
              source={{
                uri: userInfo.imgurl ? userInfo.imgurl : profileImagePath,
                height: 80,
                width: 80,
              }}
            />
            <View style={styles.communityDescription}>
              <Text style={tw`mb-2 mt-1`}>{item.description}</Text>
              <View style={styles.communityImageJoin}></View>
            </View>
          </View>
          {item.private === 1 && (
            <Text style={tw`font-semibold`}>Privat grannskap</Text>
          )}
          <Text>Antal medlemmar {item.members}</Text>
          <Text>Plats: {item.location}</Text>
          <Button
            style={{ margin: 5 }}
            onPress={() =>
              item.private === 1
                ? setJoinPrivateCommunity(true)
                : setJoinCommunity(true)
            }
          >
            Gå med
          </Button>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderIcon = (props) => {
    return <Icon {...props} name={props.iconName} />;
  };

  return (
    <Layout style={styles.container}>
      <Layout style={tw`pt-5 pb-2`}>
        <Text style={tw`text-lg text-center`}>Grannskap </Text>
      </Layout>
      <Divider style={{ color: "black" }} />
      <List
        style={styles.container_list}
        data={myCommunitysInfo}
        renderItem={printCommunity}
        key={giveKey}
        containerStyle={styles.list_style}
        accessoryLeft={(props) =>
          renderIcon({ ...{ iconName: "search" }, ...props })
        }
      />
      <Layout style={styles.buttonCont}>
        <Button style={styles.button} onPress={() => setVisible(true)}>
          Lägg till grannskap
        </Button>
      </Layout>
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 230 }}>
              <Text style={tw`text-lg font-semibold`}>Lägg till grannskap</Text>
            </View>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <CrossIcon />
            </TouchableOpacity>
          </View>
          <Divider />
          <List
            style={styles.dataBaseList}
            data={dataBaseCommunities.filter((comm) =>
              myCommunitysInfo.map((comms) => comms.id === comm.id)
            )}
            ItemSeparatorComponent={Divider}
            renderItem={printExistingCommunities}
            key={giveKey}
          />
          <Button style={tw`mt-2`} onPress={() => setVisible(false)}>
            Skapa nytt grannskap
          </Button>
          <Divider />
        </Card>
      </Modal>
      <Modal
        visible={joinCommunity}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setJoinCommunity(false)}
      >
        <Card disabled={true}>
          <Text style={tw`text-lg font-semibold text-center`}>
            Vill du gå med i {chosenCommunity} ?
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: 300,
              justifyContent: "center",
            }}
          >
            <Button
              style={{ width: 100, marginRight: 15 }}
              onPress={() => {
                console.log(myCommunitysInfo);
                setMyCommunitysInfo([...myCommunitysInfo, chosenCommunity]);
                setJoinCommunity(false);
                setVisible(false);
              }}
            >
              Ja
            </Button>
            <Button
              style={{ width: 100, marginLeft: 15 }}
              onPress={() => setJoinCommunity(false)}
            >
              Nej
            </Button>
          </View>
          <Divider />
        </Card>
      </Modal>
      <Modal
        visible={joinPrivateCommunity}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setJoinPrivateCommunity(false)}
      >
        <Card disabled={true}>
          <Text style={tw`text-lg font-semibold text-center`}>
            {chosenCommunity} är ett privat grannskap
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              width: 300,
              justifyContent: "center",
            }}
          >
            {IncorrectCommunityPassword && <Text>Fel lösenord!</Text>}
            <Input
              label="skriv in lösenord för grannskapet för att gå med"
              value={communityPasswordInput}
              onChangeText={(nextValue) => setCommunityPasswordInput(nextValue)}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                style={{ width: 100, margin: 15 }}
                onPress={() => tryPassword()}
              >
                OK
              </Button>
              <Button
                style={{ width: 100, margin: 15 }}
                onPress={() => {
                  setJoinPrivateCommunity(false);
                  setIncorrectCommunityPassword(false);
                }}
              >
                Avbryt
              </Button>
            </View>
          </View>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: 50,
  },
  container_list: {
    height: 200,
  },
  buttonCont: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 95,
    bottom: 25,
  },
  button: {
    width: 200,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  communityContainer: {
    flex: 1,
    flexDirection: "row",
  },
  communityImageContainer: {
    flex: 1,
    flexDirection: "row",
  },
  communityDescription: {
    width: 130,
    marginLeft: 10,
  },
  communityImage: {},
  communityImageJoin: {
    backgroundColor: "red",
    width: 100,
  },
  crossStyle: {
    width: 30,
    height: 30,
    marginBottom: 10,
  },
  dataBaseList: {
    backgroundColor: "white",
    height: 300,
  },
  list_style: {
    backgroundColor: "red",
  },
  lockStyle: {
    width: 25,
    height: 25,
  },
  touchableStyle: {
    padding: 10,
  },
});
