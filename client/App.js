import { React, createContext, useState, useMemo } from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./Navigation/NavbarNavigation";
import { default as theme } from "./assets/custom-theme.json"; // <-- Import app theme
import { UserInfo, CommunityInfo} from './assets/AppContext'

  export default () => {
	  
		const [userName, setUserName] = useState('Anna');
		const FirstUservalue = useMemo(
		  () => ({ userName, setUserName }), 
		  [userName]
		);

		const [community, setCommunity] = useState([]);
		const FirstCommunityValue = useMemo(
		  () => ({ community, setCommunity }), 
		  [community]
		);
  
	return (
		<>
		<IconRegistry icons={EvaIconsPack} />
		<UserInfo.Provider value={FirstUservalue}>
		<CommunityInfo.Provider value={FirstCommunityValue}>
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
			<AppNavigator />
		</ApplicationProvider>
		</CommunityInfo.Provider>
		</UserInfo.Provider>
	</>
	);
  };
  