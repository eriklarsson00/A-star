import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextPropTypes,
  ProgressViewIOSComponent,
  Alert,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function BarCodeScannerComp(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productName, setProductName] = useState(null);

  useEffect(() => {
    if (productName) {
      productAlert(productName);
      return;
    }
  }, [productName]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const productAlert = (product) =>
    Alert.alert("Vara", productName, [
      {
        text: "Avbryt",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Lägg till",
        onPress: () => {
          props.productInfo(productName);
          props.func(false);
        },
      },
    ]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetch(`http://ec2-3-215-18-23.compute-1.amazonaws.com/products/${data}`)
      .then((response) => response.json())
      .then((product) => {
        setProductName(product.brandName + " " + product.functionalName);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BarCodeScanner
      barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={[StyleSheet.absoluteFillObject, styles.container]}
    >
      <View style={styles.layerTop}>
        <View style={styles.buttonContainer}>
          {scanned && (
            <Button
              title={"Tryck för att Scanna om vara"}
              onPress={() => setScanned(false)}
            />
          )}
        </View>
      </View>

      <View style={styles.layerCenter}>
        <View style={styles.layerLeft} />
        <View style={styles.focused} />

        <View style={styles.layerRight} />
      </View>
      <View style={styles.layerBottom}>
        <Button
          title="Gå tillbaka"
          onPress={() => {
            props.func(false);
          }}
        />
      </View>
    </BarCodeScanner>
  );
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    marginTop: 220,
    marginLeft: 80,
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: "row",
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});
