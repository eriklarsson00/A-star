import {
  React,
  createContext,
  useState,
  useMemo,
  Component,
  useEffect,
  Text,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./Navigation/NavbarNavigation";
import { LoginNavigation } from "./Navigation/LoginNavigation";
import { default as theme } from "./assets/custom-theme.json";
import { NewItemNavigation } from "./Navigation/NewItemNavigation";
import { getUserProfileById } from "./Services/ServerCommunication";
import {
  UserInfo,
  CommunityInfo,
  ProfileImagePath,
  UserLoggedIn,
} from "./assets/AppContext";

export default () => {
  const [userLoggedIn, setLoggedIn] = useState(false);
  const FirstLoggedInValue = useMemo(
    () => ({ userLoggedIn, setLoggedIn }),
    [userLoggedIn]
  );

  const [userInfo, setUserInfo] = useState([]);
  const FirstUservalue = useMemo(() => ({ userInfo, setUserInfo }), [userInfo]);

  const [profileImagePath, setProfileImagePath] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const FirstProfileImagePath = useMemo(
    () => ({ profileImagePath, setProfileImagePath }),
    [profileImagePath]
  );

  const [community, setCommunity] = useState([]);
  const FirstCommunityValue = useMemo(
    () => ({ community, setCommunity }),
    [community]
  );

  useEffect(async () => {
    try {
      const jsonUserId = await AsyncStorage.getItem("userId");
      if (jsonUserId !== null) {
        const userId = JSON.parse(jsonUserId);
        const users = await getUserProfileById(userId);
        if (users[0]) {
          setUserInfo(users[0]);
          setLoggedIn(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const CheckWhichStartScreen = () => {
    if (userLoggedIn) {
      return <AppNavigator />;
    } else {
      return <LoginNavigation />;
    }
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <UserInfo.Provider value={FirstUservalue}>
        <CommunityInfo.Provider value={FirstCommunityValue}>
          <ProfileImagePath.Provider value={FirstProfileImagePath}>
            <UserLoggedIn.Provider value={FirstLoggedInValue}>
              <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
                <StatusBar barStyle="dark-content" />
                <CheckWhichStartScreen />
              </ApplicationProvider>
            </UserLoggedIn.Provider>
          </ProfileImagePath.Provider>
        </CommunityInfo.Provider>
      </UserInfo.Provider>
    </>
  );
};
