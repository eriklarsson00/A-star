import React from "react";
import { SafeAreaView, View } from "react-native";
import { TopNavigation, useTheme, Text, Layout } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ShowCommunityIds } from "../assets/AppContext";
import tw from "twrnc";

import { MyListingsTransactions } from "../Components/MyListingsTransactions";
import { AnsweredListingsTransactions } from "../Components/AnsweredListingsTransactions";

const TopTabs = createMaterialTopTabNavigator();

export const OngoingScreen = () => {
  const { showCommunityIds, setShowCommunityIds } =
    React.useContext(ShowCommunityIds);
  const theme = useTheme();

  return (
    <Layout style={{ flex: 1, paddingTop: 50 }}>
      <TopNavigation
        alignment="center"
        title={"Pågående utbyten"}
      ></TopNavigation>
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
