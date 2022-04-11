import React from "react";
import { Text, Button } from "@ui-kitten/components";
import { View } from "react-native";
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
    let users = await getUserProfileByEmail("jesus.kristus@yahoo.com");

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

  return (
    <View
      style={{ alignContent: "center", alignItems: "center", marginTop: 550 }}
    >
      <Button
        onPress={() => {
          promptAsync({ showInRecents: true });
        }}
        style={{ marginBottom: 14 }}
      >
        <Text>Continue with google</Text>
      </Button>
      <Button onPress={easySignIn}>Enkel inloggning</Button>
    </View>
  );
};
