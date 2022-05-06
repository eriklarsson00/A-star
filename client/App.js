import * as eva from "@eva-design/eva";

import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import {
  GoogleInfo,
  MyCommunitysInfo,
  ShowCommunityIds,
  UserInfo,
  UserLoggedIn,
} from "./assets/AppContext";
import { React, useEffect, useMemo, useState } from "react";
import {
  getUserCommunities,
  getUserProfileById,
} from "./Services/ServerCommunication";

import { AppNavigator } from "./Navigation/NavbarNavigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { LoginNavigation } from "./Navigation/LoginNavigation";
import { StatusBar } from "react-native";
import { default as theme } from "./assets/custom-theme.json";

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
          console.error("Cannot log in, unknown userId: " + userId);
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    } catch (e) {
      console.error(e);
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
          </ShowCommunityIds.Provider>
        </GoogleInfo.Provider>
      </UserInfo.Provider>
    </>
  );
};
