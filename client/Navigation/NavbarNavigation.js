import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Divider, Layout, Text, Icon } from '@ui-kitten/components';
import { ExploreScreen } from "../Screens/ExploreScreen";
import { CommunityScreen } from "../Screens/CommunityScreen";
import { OngoingScreen } from "../Screens/OngoingScreen";
import { ProfileScreen } from "../Screens/ProfileScreen";
import { AddNewItemScreen } from "../Screens/AddNewItemScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const DiscoverIcon = (props) => (
    <Icon {...props} name='compass-outline'/>
);
const CommunityIcon = (props) => (
  <Icon {...props} name='people-outline'/>
);
const AddIcon = (props) => (
  <Icon {...props} name='plus-circle-outline'/>
);
const OngoingIcon = (props) => (
  <Icon {...props} name='sync-outline'/>
);
const ProfileIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance='noIndicator'
    style={styles.navbar}
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Utforska' icon={DiscoverIcon}/>
    <BottomNavigationTab title='Grannskap'icon={CommunityIcon}/>
    <BottomNavigationTab title='Lägg till' icon={AddIcon}/>
    <BottomNavigationTab title='Pågående'icon={OngoingIcon}/>
    <BottomNavigationTab title='Profil'icon={ProfileIcon}/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='ExploreScreen' component={ExploreScreen}/>
    <Screen name='CommunityScreen' component={CommunityScreen}/>
    <Screen name='AddNewItemScreen' component={AddNewItemScreen}/>
    <Screen name='OngoingScreen' component={OngoingScreen}/>
    <Screen name='ProfileScreen' component={ProfileScreen}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
); 

const styles = StyleSheet.create({
    navbar:{ //Styles the navbar
        marginBottom:25,
        marginTop:8,
    },
});