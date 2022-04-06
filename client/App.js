import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImagePicker from './Components/ImagePicker.component.js';
import GoogleLogin from './Components/GoogleLogin.component';
import BarCodeScanner from './Components/BarCodeScanner.component';
import BarCodeScannerComp from './Components/BarCodeScanner.component';
import GetLocation from './Components/GetLocation.component.js'
import Maps from './Components/Maps.component.js';



export default function App() {
  return (
    <Maps/>  
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
