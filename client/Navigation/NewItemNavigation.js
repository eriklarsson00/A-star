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
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="CreateNewOfferScreen"
        component={CreateNewOfferScreen}
        options={{ title: "Skapa din vara", headerBackTitle: "Tillbaka" }}
      />
      <Stack.Screen
        name="CreateNewRequestScreen"
        component={CreateNewRequestScreen}
        options={{ title: "Skapa din förfrågan", headerBackTitle: "Tillbaka" }}
      />
    </Stack.Navigator>
  );
};

export { NewItemNavigation };
