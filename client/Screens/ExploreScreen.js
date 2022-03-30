import React from "react";
import {StyleSheet } from 'react-native';
import { SafeAreaView, Text, View,Divider } from "react-native";
import { TopNavigation, Tab, TabView, TabBar,ViewPager,Layout } from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import tw from 'twrnc'




export const ExploreScreen = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

	return (
		<SafeAreaView>
            <TopNavigation title="Majklockan" alignment="center" />
            <TabView
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            
            <Tab title='Tillgängligt'>
                <Layout style={styles.tabContainer} >
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                    <Text category='h5'>Tillgänligt</Text>
                </Layout>
            </Tab>
            <Tab title='Efterfrågas'>
                <Layout >
                    <Text category='h5'>Efterfrågas</Text>
                 </Layout>
            </Tab>
            </TabView>
            
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
    tabContainer: {
      marginTop: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  /*function FeedScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed!</Text>
      </View>
    );
  }
  
  function NotificationsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications!</Text>
      </View>
    );
  }
  
  function ProfileScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile!</Text>
      </View>
    );
  }
  
  const Tab = createMaterialTopTabNavigator();
  
export const ExploreScreen = () => {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ tabBarLabel: 'Updates' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ tabBarLabel: 'Profile' }}
        />
      </Tab.Navigator>
    );
  }  */