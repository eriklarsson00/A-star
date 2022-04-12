import React from "react";
import { StyleSheet } from "react-native";
import { Radio, Text, Layout, Button, useTheme } from "@ui-kitten/components";
import { ShowCommunityIds, MyCommunitysInfo } from "../assets/AppContext";

import tw from "twrnc";

const CommunityComponent = (props) => {
  const theme = useTheme();
  const { showCommunityIds, setShowCommunityIds } =
    React.useContext(ShowCommunityIds);
  const [checked, setChecked] = React.useState(false);
  return (
    <Layout style={styles.outer_container}>
      <Layout
        style={[
          styles.container,
          {
            backgroundColor: checked
              ? theme["color-primary-400"]
              : theme["color-primary-300"],
          },
        ]}
      >
        <Text style={tw`pl-7 text-lg`}>{props.id}</Text>
        <Radio
          style={styles.radio}
          checked={checked}
          onChange={
            (nextChecked) => setChecked(nextChecked) /*(nextChecked) => {
            setChecked(nextChecked);
            showCommunityIds.includes(props.id)
              ? setShowCommunityIds(
                  showCommunityIds.filter((comName) => comName != props.id)
                )
              : setShowCommunityIds([...community, props.id]);
          }*/
          }
        />
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  radio: {
    marginLeft: 280,
    position: "absolute",
  },
  container: {
    justifyContent: "center",
    margin: 5,
    width: "90%",
    height: 80,
    borderRadius: 15,
  },
  div_layout: {
    flex: 1,
  },
  outer_container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },
});

export default CommunityComponent;
