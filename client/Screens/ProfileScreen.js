import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView, StyleSheet, Image } from "react-native";
import {
  TopNavigation,
  Button,
  Text,
  Avatar,
  Layout,
  Card,
  Divider,
  useTheme,
} from "@ui-kitten/components";
import { ProfileImagePath, UserInfo, UserLoggedIn } from "../assets/AppContext";
import tw from "twrnc";

export const ProfileScreen = () => {
  const { profileImagePath, setProfileImagePath } =
    React.useContext(ProfileImagePath);
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const { userLoggedIn, setLoggedIn } = React.useContext(UserLoggedIn);
  const rating =
    userInfo.raters > 0
      ? Math.round((userInfo.rating * 100) / userInfo.raters) / 100 + "/5"
      : "Inga betyg";

  const logOut = async () => {
    await AsyncStorage.removeItem("userId");
    setUserInfo([]);
    setLoggedIn(false);
  };

  return (
    <Layout style={styles.outerContainer} level="1">
      <Layout style={tw`py-10`}>
        <Image
          style={tw`rounded-full`}
          source={{
            uri: userInfo.imgurl ? userInfo.imgurl : profileImagePath,
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
      <Layout style={[{ width: "100%", paddingTop: 66 }]}>
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
        <Button style={styles.btn} appearance="ghost">
          {" "}
          Ta bort konto
        </Button>
        <Button style={styles.btn} appearance="ghost" onPress={logOut}>
          {" "}
          Logga ut
        </Button>
      </Layout>
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
    paddingTop: 50,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "center",
  },
  card: {
    alignItems: "center",
    justifyContent: "center",
    margin: 5,
    width: 120,
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
