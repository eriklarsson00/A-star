import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import AddNewItemScreen from '../Screens/AddNewItemScreen';
import CreateNewItemScreen from '../Screens/CreateNewItemScreen';


const Stack = createStackNavigator();

const NewItemNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="AddItemScreen" component={AddNewItemScreen}/>
        <Stack.Screen name='CreateNewItemScreen' component={CreateNewItemScreen}/>
      </Stack.Navigator>
    );
}

export {NewItemNavigation}

// const NewRequestNavigation = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="AddItemScreen" component={AddNewItemScreen}/>
//       <Stack.Screen name='NewRequestScreen' component={CreateNewItemScreen}/>
//     </Stack.Navigator>
//   );
// }