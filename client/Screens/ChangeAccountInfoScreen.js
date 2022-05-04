import React from "react";
import { StyleSheet } from "react-native";
import { Button, useTheme, Layout } from "@ui-kitten/components";
import tw from "twrnc";

export const ChangeAccountInfoScreen = ({ navigation }) => {
  const theme = useTheme();
  return (
    <Layout>
      <Button style={styles.btn}>Sökes</Button>
      <Button
        style={styles.btn}
        onPress={() => navigation.navigate("CreateNewOfferScreen")}
      >
        Gives{" "}
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({});
