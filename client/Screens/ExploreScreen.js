import { Layout, TopNavigation, useTheme } from "@ui-kitten/components";

import { BlockedDiscover } from "../Components/BlockedDiscoveryComponent";
import { ItemAvailableComponent } from "../Components/ItemAvailableComponent";
import { ItemRequestedComponent } from "../Components/ItemRequestedComponent";
import React from "react";
import { ShowCommunityIds } from "../assets/AppContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = createMaterialTopTabNavigator();

export const ExploreScreen = () => {
  const { showCommunityIds } = React.useContext(ShowCommunityIds);
  const theme = useTheme();
  if (showCommunityIds.length === 0) {
    return <BlockedDiscover />;
  } else {
    return (
      <Layout style={{ flex: 1, paddingTop: 50 }}>
        <TopNavigation alignment="center" title={"Utforska varor"} />
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
