import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { StartScreen } from "../Screens/StartScreen";
import { CreateUserScreen } from "../Screens/CreateUserScreen";

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StartScreen"
        component={StartScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />
      <Stack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{
          gestureEnabled: false,
          title: "Slutför registrering",
          headerBackTitle: "Tillbaka",
          headerTintColor: "#FEA655",
        }}
      />
    </Stack.Navigator>
  );
}

export const LoginNavigation = () => (
  <NavigationContainer>
    <LoginStack />
  </NavigationContainer>
);
