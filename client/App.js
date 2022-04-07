import { React, createContext, useState, useMemo, Component, useEffect,Text } from "react";
import { StatusBar } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./Navigation/NavbarNavigation";
import { LoginNavigation } from "./Navigation/LoginNavigation";
import { default as theme } from "./assets/custom-theme.json"; 
import { NewItemNavigation } from "./Navigation/NewItemNavigation";
import { UserInfo, CommunityInfo, ProfileImagePath, UserLoggedIn} from './assets/AppContext'

const CheckIfLoggedIn = () => {
	//TODO : Implementera async storage för att kolla om man är inloggad?
	let isLoggedIn = false; //Simulate if the user is already signed in or not
	return isLoggedIn; 
}

export default () => {
		const [userLoggedIn, setLoggedIn] = useState(CheckIfLoggedIn);
		const FirstLoggedInValue = useMemo(
		  () => ({ userLoggedIn, setLoggedIn }), 
		  [userLoggedIn]
		);

		const [userInfo, setUserInfo] = useState([]);
		const FirstUservalue = useMemo(
		  () => ({ userInfo, setUserInfo }), 
		  [userInfo]
		);
			
		const [profileImagePath, setProfileImagePath] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png');
		const FirstProfileImagePath = useMemo(
		  () => ({ profileImagePath, setProfileImagePath }), 
		  [profileImagePath]
		);

		const [community, setCommunity] = useState([]);
		const FirstCommunityValue = useMemo(
		  () => ({ community, setCommunity }), 
		  [community]
		);
		
		const CheckWhichStartScreen = () => {
			if(userLoggedIn){
			  return <AppNavigator/>
			}
			else{
				return <LoginNavigation />
			}
		}

	return (
		<>
		<IconRegistry icons={EvaIconsPack} />
		<UserInfo.Provider value={FirstUservalue}>
			<CommunityInfo.Provider value={FirstCommunityValue}>
				<ProfileImagePath.Provider value ={FirstProfileImagePath}>	
					<UserLoggedIn.Provider value={FirstLoggedInValue}>
						<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
							<StatusBar barStyle="dark-content"/>
							<CheckWhichStartScreen />
						</ApplicationProvider>
					</UserLoggedIn.Provider>
				</ProfileImagePath.Provider>
			</CommunityInfo.Provider>
		</UserInfo.Provider>
	</>
	);
};
  