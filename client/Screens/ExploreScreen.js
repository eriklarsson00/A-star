import React from "react";
import { SafeAreaView,} from "react-native";
import { TopNavigation,useTheme, Text } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CommunityInfo } from "../assets/AppContext";
import tw from 'twrnc'

import {ItemAvailableComponent} from "../Components/ItemAvailableComponent"
import {ItemRequestedComponent} from "../Components/ItemRequestedComponent"

const TopTabs = createMaterialTopTabNavigator();

export const ExploreScreen = () => {
  const { community, setCommunity } = React.useContext(CommunityInfo);
    const theme = useTheme();
    return (
    <SafeAreaView style={{flex:1}}>
    <TopNavigation alignment="center" title={community.map(name=><Text style={tw`text-lg`}>{name} </Text>)}>
    </TopNavigation>
      <TopTabs.Navigator
      screenOptions={{
          tabBarIndicatorStyle:{backgroundColor :theme['color-primary-500']}
      }}>
        <TopTabs.Screen
          name='Tillgängligt'
          component={ItemAvailableComponent}
        />
        <TopTabs.Screen
          name='Efterfrågas'
          component={ItemRequestedComponent}
        />
      </TopTabs.Navigator>
      </SafeAreaView>
    );
} 