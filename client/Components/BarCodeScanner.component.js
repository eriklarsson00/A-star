import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextPropTypes, ProgressViewIOSComponent } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function BarCodeScannerComp() {
  
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetch(
      `http://ec2-54-165-238-176.compute-1.amazonaws.com:8080/products/${data}`
    )
      .then((response) => response.json())
      .then((product) => {
        alert(product.brandName + " " + product.functionalName);
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
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({ 
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
}); 