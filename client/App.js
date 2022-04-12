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
	MyCommunitysInfo,
	ShowCommunityIds,
	ProfileImagePath,
	UserLoggedIn,
	GoogleInfo,
} from "./assets/AppContext";

export default () => {
	const [userLoggedIn, setLoggedIn] = useState(null);
	const FirstLoggedInValue = useMemo(
		() => ({ userLoggedIn, setLoggedIn }),
		[userLoggedIn]
	);

	const [userInfo, setUserInfo] = useState([]);
	const FirstUservalue = useMemo(
		() => ({ userInfo, setUserInfo }),
		[userInfo]
	);

	const [googleInfo, setGoogleInfo] = useState();
	const FirstGooglevalue = useMemo(
		() => ({ googleInfo, setGoogleInfo }),
		[googleInfo]
	);

	const [profileImagePath, setProfileImagePath] = useState(
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	);
	const FirstProfileImagePath = useMemo(
		() => ({ profileImagePath, setProfileImagePath }),
		[profileImagePath]
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
	}, []);

	const CheckWhichStartScreen = () => {
		if (userLoggedIn) {
			return <AppNavigator />;
		} else if (userLoggedIn != null) {
			return <LoginNavigation />;
		} else {
			return <></>;
		}
	};

	return (
		<>
			<IconRegistry icons={EvaIconsPack} />
			<UserLoggedIn.Provider value={FirstLoggedInValue}>
				<UserInfo.Provider value={FirstUservalue}>
					<GoogleInfo.Provider value={FirstGooglevalue}>
						<ShowCommunityIds.Provider value={FirstShowValue}>
							<ProfileImagePath.Provider value={FirstProfileImagePath}>
								<MyCommunitysInfo.Provider value={FirstCommunityValue}>
									<ApplicationProvider
										{...eva}
										theme={{ ...eva.light, ...theme }}
									>
										<StatusBar barStyle="dark-content" />

										<CheckWhichStartScreen />
									</ApplicationProvider>
								</MyCommunitysInfo.Provider>
							</ProfileImagePath.Provider>
						</ShowCommunityIds.Provider>
					</GoogleInfo.Provider>
				</UserInfo.Provider>
			</UserLoggedIn.Provider>
		</>
	);
};
