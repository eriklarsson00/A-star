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
import {
  getUserProfileById,
  getUserCommunities,
} from "./Services/ServerCommunication";
import {
  UserInfo,
  MyCommunitysInfo,
  ShowCommunityIds,
  ProfileImagePath,
  UserLoggedIn,
  GoogleInfo,
  ItemImagePath,
} from "./assets/AppContext";

export default () => {
  const [userLoggedIn, setLoggedIn] = useState(null);
  const FirstLoggedInValue = useMemo(
    () => ({ userLoggedIn, setLoggedIn }),
    [userLoggedIn]
  );

  const [userInfo, setUserInfo] = useState([]);
  const FirstUservalue = useMemo(() => ({ userInfo, setUserInfo }), [userInfo]);

  const [googleInfo, setGoogleInfo] = useState();
  const FirstGooglevalue = useMemo(
    () => ({ googleInfo, setGoogleInfo }),
    [googleInfo]
  );

  const [profileImagePath, setProfileImagePath] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [itemImagePath, setItemImagePath] = useState(
    "https://www.mcicon.com/wp-content/uploads/2021/02/Technology_Camera_1-copy-18.jpg"
  );

  const FirstProfileImagePath = useMemo(
    () => ({ profileImagePath, setProfileImagePath }),
    [profileImagePath]
  );

  const FirstIconImagePath = useMemo(
    () => ({ itemImagePath, setItemImagePath }),
    [itemImagePath]
  );

  const [myCommunitysInfo, setMyCommunitysInfo] = useState([]);
  const FirstCommunityValue = useMemo(
    () => ({ myCommunitysInfo, setMyCommunitysInfo }),
    [myCommunitysInfo]
  );

  const [showCommunityIds, setShowCommunityIds] = useState([]);
  const FirstShowValue = useMemo(
    () => ({ showCommunityIds, setShowCommunityIds }),
    [showCommunityIds]
  );

  const [whichScreen, setWhichScreen] = useState(<LoginNavigation />);

  useEffect(async () => {
    if (userLoggedIn) {
      setWhichScreen(<AppNavigator />);
    } else {
      setWhichScreen(<LoginNavigation />);
    }
  }, [userLoggedIn]);

  useEffect(async () => {
    // Fetch userId from storage (if exists) and get user data from server
    try {
      const jsonUserId = await AsyncStorage.getItem("userId");
      if (jsonUserId !== null) {
        const userId = JSON.parse(jsonUserId);
        const users = await getUserProfileById(userId);
        if (users[0]) {
          setUserInfo(users[0]);
          setLoggedIn(true);
          setWhichScreen(<AppNavigator />);
          await setCommunities(users[0].id);
        } else {
          console.log("Cannot log in, unknown userId: " + userId);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [userLoggedIn]);

  async function setCommunities(user_id) {
    let myComms = await getUserCommunities(user_id);
    setMyCommunitysInfo(myComms);
    const jsonShowIds = await AsyncStorage.getItem("showCommunityIds");
    if (jsonShowIds !== null) {
      const showIds = JSON.parse(jsonShowIds);
      setShowCommunityIds(showIds);
    }
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <UserInfo.Provider value={FirstUservalue}>
        <GoogleInfo.Provider value={FirstGooglevalue}>
          <ShowCommunityIds.Provider value={FirstShowValue}>
            <ProfileImagePath.Provider value={FirstProfileImagePath}>
              <MyCommunitysInfo.Provider value={FirstCommunityValue}>
                <UserLoggedIn.Provider value={FirstLoggedInValue}>
                  <ApplicationProvider
                    {...eva}
                    theme={{ ...eva.light, ...theme }}
                  >
                    <StatusBar barStyle="dark-content" />
                    <>{whichScreen}</>
                  </ApplicationProvider>
                </UserLoggedIn.Provider>
              </MyCommunitysInfo.Provider>
            </ProfileImagePath.Provider>
          </ShowCommunityIds.Provider>
        </GoogleInfo.Provider>
      </UserInfo.Provider>
    </>
  );
};
