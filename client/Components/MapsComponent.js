/*import * as React from "react";
import { Marker, MapView, Callout } from "react-native-maps";

import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Maps() {
  const [pin, setPin] = React.useState({
    latitude: 59.85735,
    longitude: 17.64624,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 59.85735,
          longitude: 17.64624,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker //draggable
          coordinate={pin}
          pinColor="orange"
          draggable={true}
          onDragEnd={(e) => {
            setPin({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            });
          }}
        >
          <Callout>
            <Text>HIII</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
*/