import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Image, Alert, ScrollView } from "react-native";
import { Button, Text, Layout, Card, Divider } from "@ui-kitten/components";
import {
  UserInfo,
  GoogleInfo,
  UserLoggedIn,
  ShowCommunityIds,
} from "../assets/AppContext";
import tw from "twrnc";
import { deleteProfile } from "../Services/ServerCommunication";

export const ProfileScreen = () => {
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const { setLoggedIn } = React.useContext(UserLoggedIn);
  const { setGoogleInfo } = React.useContext(GoogleInfo);
  const { setShowCommunityIds } = React.useContext(ShowCommunityIds);
  const rating =
    userInfo.raters > 0
      ? Math.round((userInfo.rating * 100) / userInfo.raters) / 100 + "/5"
      : "Inga";

  const logOut = async () => {
    // Clear all sorts of cache in app
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("showCommunityIds");
    setUserInfo([]);
    setGoogleInfo(null);
    setLoggedIn(false);
    setShowCommunityIds([]);
  };

  const removeAccount = async () => {
    const res = await deleteProfile(userInfo.id);
    // TODO: Remove profile pic from S3
    await logOut();
  };

  const confirmRemovalAlert = () =>
    Alert.alert(
      "Ta bort konto?",
      "Är du säker på att du vill ta bort ditt konto? Det går inte att ångra sig i efterhand.",
      [
        {
          text: "Avbryt",
          onPress: () => {},
          style: "cancel",
        },
        { text: "Jag är säker", onPress: async () => removeAccount() },
      ]
    );

  const confirmLogOutAlert = () =>
    Alert.alert("Logga ut?", "Är du säker på att du vill logga ut?", [
      {
        text: "Avbryt",
        onPress: () => {},
        style: "cancel",
      },
      { text: "Jag är säker", onPress: async () => logOut() },
    ]);

  return (
    <Layout style={styles.outerContainer} level="1">
      <Layout style={tw`py-10`}>
        <Image
          style={tw`rounded-full`}
          source={{
            uri: userInfo.imgurl,
            height: 150,
            width: 150,
          }}
        />
      </Layout>
      <Text style={tw`text-3xl`}>
        {userInfo.firstname + " " + userInfo.lastname}
      </Text>
      <Layout style={styles.container}>
        <Card style={styles.card}>
          <Text style={tw`text-center`}>{userInfo.given}</Text>
          <Divider />
          <Text style={tw`text-center`}>Gett bort</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={tw`text-center`}>{userInfo.taken}</Text>
          <Divider />
          <Text style={tw`text-center`}>Tagit</Text>
        </Card>

        <Card style={styles.card}>
          <Text style={tw`text-center`}>{rating}</Text>
          <Divider />
          <Text style={tw`text-center`}>Betyg</Text>
        </Card>
      </Layout>
      <ScrollView style={[{ width: "100%" }]}>
        <Button style={styles.btn} appearance="ghost">
          {" "}
          Mina produkter
        </Button>
        <Button style={styles.btn} appearance="ghost">
          {" "}
          Historik{" "}
        </Button>
        <Button style={styles.btn} appearance="ghost">
          {" "}
          Kontoinställningar
        </Button>
        <Button
          style={styles.btn}
          appearance="ghost"
          onPress={confirmRemovalAlert}
        >
          {" "}
          Ta bort konto
        </Button>
        <Button
          style={styles.btn}
          appearance="ghost"
          onPress={confirmLogOutAlert}
        >
          {" "}
          Logga ut
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  outerContainer: {
    height: "100%",
    paddingTop: 50,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: "30%",
  },
  btn: {
    borderRadius: 1,
    borderBottomColor: "gainsboro",
    borderTopColor: "white",
    borderLeftColor: "white",
    borderRightColor: "white",
    margin: 5,
  },
  logOut: {
    width: 200,
    borderRadius: 15,
    borderColor: "gainsboro",
    alignSelf: "center",
  },
});
