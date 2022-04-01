import React from "react";
import { View, Button, StyleSheet, Text, Image } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

function LoginScreen(props) {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "1069025561632-ubf6h9h78gcr5o2qdcpe4nukthhueu34.apps.googleusercontent.com",
    iosClientId: "1069025561632-8k1skspkm7r92rgnnn0u0klaa9dvnjmd.apps.googleusercontent.com",
    expoClientId: "1069025561632-70ajtntjh20pkgulogbu7375ramtf1ql.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);
  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style = {styles.container}>
          <Image source= {{uri: userInfo.picture}} style={styles.profilePic}/>
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email} {userInfo.id}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button 
        title={accessToken ? "Get User Data" : "Login"} 
        onPress={accessToken ? getUserData : () => { promptAsync({showInRecents: true}) }}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
export default LoginScreen;
