import { React, createContext, useState, useMemo } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./Navigation/NavbarNavigation";
import { default as theme } from "./assets/custom-theme.json"; // <-- Import app theme
import { UserInfo } from './assets/AppContext'

// const UserInfo = createContext({
// 	userName: '',
// 	setUserName: () => {},
//   });
  
  export default () => {
	  
		const [userName, setUserName] = useState('Anna');
		const FirstUservalue = useMemo(
		  () => ({ userName, setUserName }), 
		  [userName]
		);
  
	return (
		<>
		<IconRegistry icons={EvaIconsPack} />
		<UserInfo.Provider value={FirstUservalue}>
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
			<AppNavigator />
		</ApplicationProvider>
		</UserInfo.Provider>
	</>
	);
  };
  