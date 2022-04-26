import React from "react";
import { SafeAreaView, View } from "react-native";
import { TopNavigation, useTheme, Text, Layout } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ShowCommunityIds } from "../assets/AppContext";
import tw from "twrnc";

import { ItemAvailableComponent } from "../Components/ItemAvailableComponent";
import { ItemRequestedComponent } from "../Components/ItemRequestedComponent";
import { BlockedDiscover } from "../Components/BlockedDiscoveryComponent";

const TopTabs = createMaterialTopTabNavigator();

export const ExploreScreen = () => {
  const { showCommunityIds, setShowCommunityIds } =
    React.useContext(ShowCommunityIds);
  const theme = useTheme();
  if (showCommunityIds.length === 0) {
    return <BlockedDiscover />;
  } else {
    return (
      <Layout style={{ flex: 1, paddingTop: 50 }}>
        <TopNavigation
          alignment="center"
          title={"Utforska varor"}
        ></TopNavigation>
        <TopTabs.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: theme["color-primary-500"],
            },
          }}
        >
          <TopTabs.Screen
            name="Tillgängligt"
            component={ItemAvailableComponent}
          />
          <TopTabs.Screen
            name="Efterfrågas"
            component={ItemRequestedComponent}
          />
        </TopTabs.Navigator>
      </Layout>
    );
  }
};
