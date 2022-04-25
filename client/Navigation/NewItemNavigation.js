import React from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddNewItemScreen from "../Screens/AddNewItemScreen";
import CreateNewOfferScreen from "../Screens/CreateNewOfferScreen";
import CreateNewRequestScreen from "../Screens/CreateNewRequestScreen";

const Stack = createStackNavigator();

const NewItemNavigation = () => {
  const theme = useTheme();
  return (
    <Stack.Navigator screenOptions={{ headerTintColor: "#FEA655" }}>
      <Stack.Screen
        name="AddItemScreen"
        component={AddNewItemScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="CreateNewOfferScreen"
        component={CreateNewOfferScreen}
        options={{ title: "Skapa din vara" }}
      />
      <Stack.Screen
        name="CreateNewRequestScreen"
        component={CreateNewRequestScreen}
        options={{ title: "Skapa din förfrågan" }}
      />
    </Stack.Navigator>
  );
};

export { NewItemNavigation };
