import { Layout, TopNavigation, useTheme } from "@ui-kitten/components";

import { AnsweredListingsTransactions } from "../Components/AnsweredListingsTransactions";
import { MyListingsTransactions } from "../Components/MyListingsTransactions";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const TopTabs = createMaterialTopTabNavigator();

export const OngoingScreen = () => {
  const theme = useTheme();

  return (
    <Layout style={{ flex: 1, paddingTop: 50 }}>
      <TopNavigation alignment="center" title={"Pågående utbyten"} />
      <TopTabs.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: theme["color-primary-500"],
          },
        }}
      >
        <TopTabs.Screen name="Mina inlägg" component={MyListingsTransactions} />
        <TopTabs.Screen
          name="Besvarade inlägg"
          component={AnsweredListingsTransactions}
        />
      </TopTabs.Navigator>
    </Layout>
  );
};
