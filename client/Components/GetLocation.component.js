import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function GetLocation() {
  const [location, setLocation] = useState(null);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const CheckIfLocationEnabled = async () => {
    const location = await Location.hasServicesEnabledAsync();

    if (!location) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } 
      setLocation(location);
  };

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  
        setDisplayCurrentAddress(address);
      }
    }
  };
  



  
  
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
      <Text style={styles.title}>What's your address?</Text>
      </View>
      <Text> {location}</Text>
      <Text style={styles.text}>{displayCurrentAddress}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#070707',
      alignItems: 'center',
      paddingTop: 130
    },
    contentContainer: {
      alignItems: 'center',
      marginBottom: 20
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 20
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: '#FD0139'
    },
    text: {
      fontSize: 20,
      fontWeight: '400',
      color: '#fff'
    }
  });
