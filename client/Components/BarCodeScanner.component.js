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
      console.log("effekt" + "" + productName);
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
        },
      },
    ]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetch(`http://ec2-3-215-18-23.compute-1.amazonaws.com/products/${data}`)
      .then((response) => response.json())
      .then((product) => {
        setProductName(product.brandName + " " + product.functionalName);
        console.log("After set" + "" + productName);
      });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      <Button
        style={styles.button}
        title="Gå tillbaka"
        onPress={() => {
          props.func(false);
        }}
      />
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
  button: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});
