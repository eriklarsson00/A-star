import React from "react";
import { Text, Button} from "@ui-kitten/components";
import { View } from "react-native";
import { UserInfo, UserLoggedIn } from "../assets/AppContext";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import tw from 'twrnc'
import { useRoute } from "@react-navigation/native";
import { getUserProfile } from "../Services/ServerCommunication";

WebBrowser.maybeCompleteAuthSession();

export const StartScreen = ({navigation}) => {
    const {userLoggedIn, setLoggedIn} = React.useContext(UserLoggedIn);
    const { userInfo, setUserInfo } = React.useContext(UserInfo);
    const [accessToken, setAccessToken] = React.useState();
    const [googleInfo, setGoogleInfo] = React.useState();


    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: "704852667516-v9g130n9d3shrms1np7t8aqfhqfcs4vv.apps.googleusercontent.com",
    });

    React.useEffect(() => {
        if(googleInfo){
            checkIfUserExists();
            let newUser = userInfo;
            newUser.email = googleInfo.email;
            setUserInfo(newUser);
            console.log(userInfo)
            return;
        }
        if(accessToken){ 
            getUserData();
            return;
        }
        if (response?.type === "success") {
            setAccessToken(response.authentication.accessToken);
        }
    }, [response,accessToken,googleInfo]);
    
    async function checkIfUserExists(){
        // TODO: Skicka request till servern och kika om kontot finns eller inte
        let userAcc = await getUserProfile(googleInfo.email);
        if(userAcc.length !== 0){
            console.log("HEJ")
            setUserInfo(userAcc[0]);
            // TODO: Dra ner annan info från profilen också?
            setLoggedIn(true);
        }
        else{
            navigation.navigate('CreateUserScreen');
            
        } 
    }

    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });
        userInfoResponse.json().then(data => {
        setGoogleInfo(data);
        });
    };

	return (
		<View style={{alignContent:"center", alignItems:"center", marginTop:550}}>
            <Button
                onPress={() => {promptAsync({showInRecents: true})}}
                style={{marginBottom:14}}
            >
            <Text>Continue with google</Text>
            </Button>
            <Button onPress={() => setLoggedIn(true)}>Enkel inloggning</Button>
		</View>
	);
};