import React from "react";
import { Text, Button, Icon } from "@ui-kitten/components";
import { View, Image, StyleSheet } from "react-native";
import { UserInfo, UserLoggedIn, GoogleInfo } from "../assets/AppContext";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { getUserProfileByEmail } from "../Services/ServerCommunication";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export const StartScreen = ({ navigation }) => {
  const { userLoggedIn, setLoggedIn } = React.useContext(UserLoggedIn);
  const { userInfo, setUserInfo } = React.useContext(UserInfo);
  const { googleInfo, setGoogleInfo } = React.useContext(GoogleInfo);
  const [accessToken, setAccessToken] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "704852667516-v9g130n9d3shrms1np7t8aqfhqfcs4vv.apps.googleusercontent.com",
  });

  React.useEffect(async () => {
    if (googleInfo != null && googleInfo != undefined) {
      let users = await getUserProfileByEmail(googleInfo.email);

      if (users.length !== 0) {
        try {
          await AsyncStorage.setItem("userId", JSON.stringify(users[0].id));
          setUserInfo(users[0]);

          setLoggedIn(true);
        } catch (e) {
          // saving error
          console.log(e);
        }
      } else {
        navigation.navigate("CreateUserScreen");
      }
      return;
    }

    if (accessToken) {
      getUserData();
      return;
    }
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response, accessToken, googleInfo]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    userInfoResponse.json().then((data) => {
      setGoogleInfo(data);
    });
  }

  const easySignIn = async () => {
    let users = await getUserProfileByEmail("anja.persson@icloud.com");

    if (users.length !== 0) {
      try {
        await AsyncStorage.setItem("userId", JSON.stringify(users[0].id));
        setUserInfo(users[0]);
        setLoggedIn(true);
      } catch (e) {
        // saving error
        console.log(e);
      }
    }
  };

  const GoogleIcon = (props) => <Icon name="google-outline" {...props} />;

  return (
    <View
      style={{
        alignContent: "center",
        alignItems: "center",
        marginTop: 0,
      }}
    >
      <View style={styles.top} />
      <View style={styles.middle} />
      <View style={styles.bottom} />
      <Image
        source={require("../assets/icon.png")}
        style={{
          marginTop: 125,
          width: 200,
          height: 200,
          resizeMode: "stretch",
          marginBottom: 200,
          zIndex: 100,
        }}
      ></Image>
      <Button
        accessoryLeft={GoogleIcon}
        onPress={() => {
          promptAsync({ showInRecents: true });
        }}
        style={{ marginBottom: 14 }}
        status={"danger"}
      >
        <Text>Continue with Google</Text>
      </Button>
      <Button appearance={"ghost"} status={"info"} onPress={easySignIn}>
        Enkel inloggning
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    zIndex: -3,
    width: "300%",
    height: 500,
    position: "absolute",
    top: 200,
    backgroundColor: "rgba(255,100,100,0.3)",
    transform: [{ rotateZ: "-15deg" }, { rotateX: "-5deg" }],
  },
  middle: {
    zIndex: -500,
    width: 900,
    height: 900,
    position: "absolute",
    top: 500,
    borderRadius: 500,
    backgroundColor: "rgba(255,100,100,0.2)",
    transform: [{ rotateY: "30deg" }],
  },
  bottom: {
    zIndex: -500,
    width: 900,
    height: 900,
    position: "absolute",
    top: 500,
    borderRadius: 500,
    backgroundColor: "rgba(255,100,100,0.2)",
    transform: [{ rotateY: "30deg" }],
  },
});
