import React from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddNewItemScreen from "../Screens/AddNewItemScreen";
import CreateNewItemScreen from "../Screens/CreateNewItemScreen";

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
        name="CreateNewItemScreen"
        component={CreateNewItemScreen}
        options={{ title: "Skapa din vara" }}
      />
    </Stack.Navigator>
  );
};

export { NewItemNavigation };
