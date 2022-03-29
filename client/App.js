import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Logs } from "expo";
import ImagePicker from "./Components/ImagePicker";
import LoginScreen from "./Screens/LoginScreen";
import BarCodeScanner from "./Components/BarCodeScanner";
import BarCodeScannerComp from "./Components/BarCodeScanner";

Logs.enableExpoCliLogging();

export default function App() {
  return <BarCodeScannerComp />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
