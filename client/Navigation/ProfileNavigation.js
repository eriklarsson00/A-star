import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { HistoryScreen } from "../Screens/HistoryScreen";
import { ChangeAccountInfoScreen } from "../Screens/ChangeAccountInfoScreen";

const Stack = createStackNavigator();

function ProfileNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: "#FEA655" }}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ gestureEnabled: false, title: "", headerShown: false }}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ title: "Historik", headerBackTitle: "Tillbaka" }}
      />
      <Stack.Screen
        name="ChangeAccountInfoScreen"
        component={ChangeAccountInfoScreen}
        options={{
          title: "Ändra kontoinställningar",
          headerBackTitle: "Tillbaka",
        }}
      />
    </Stack.Navigator>
  );
}

export { ProfileNavigation };
