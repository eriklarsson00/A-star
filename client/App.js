import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImagePicker from './Components/ImagePicker';
import LoginScreen from './Screens/LoginScreen';
import BarCodeScanner from './Components/BarCodeScanner';


export default function App() {
  return (
    <BarCodeScanner />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
