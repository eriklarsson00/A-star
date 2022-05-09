import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";

export const BlockedDiscover = () => {
  return (
    <SafeAreaView>
      <Text style={styles.header}> Du har inte valt några grannskap!</Text>
      <Text style={styles.footer}>Gå till grannskap-sidan och välj några!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 300,
    fontSize: 25,
    alignSelf: "center",
  },
  footer: {
    marginTop: 10,
    alignSelf: "center",
  },
});
