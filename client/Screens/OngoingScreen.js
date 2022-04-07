import React from "react";
import { TopNavigation, SafeAreaView } from "react-native";
import { Text, Layout, useTheme} from "@ui-kitten/components";
import { UserInfo, CommunityInfo } from '../assets/AppContext'
import tw from 'twrnc'


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const TopTabs = createMaterialTopTabNavigator();

export const OngoingScreen = () => {
	 const theme = useTheme();
	return (
		<Layout style={{flex:1, paddingTop:50}}>
		{/* <TopNavigation alignment="center">
		</TopNavigation>
		  <TopTabs.Navigator
		  screenOptions={{
			  tabBarIndicatorStyle:{backgroundColor :theme['color-primary-500']}
		  }}>
			<TopTabs.Screen
			  name='Tillgängligt'
			
			/>
			<TopTabs.Screen
			  name='Efterfrågas'
			/>
		  </TopTabs.Navigator> */}
		  </Layout>
	);
};
