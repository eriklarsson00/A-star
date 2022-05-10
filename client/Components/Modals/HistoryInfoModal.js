import { Button, Card, Layout, Modal, Text } from "@ui-kitten/components";
import { StyleSheet, View, Image } from "react-native";

import moment from "moment";
import tw from "twrnc";
export const HistoryInfoModal = (props) => {
  const item = props.item;
  console.log(item);
  const Info = () => {
    return (
      <View>
        <View style={{flex: 1, alignItems: "center"}}>
        <Text category={"h3"} style={{ marginTop: 20, marginBottom: 20}}>
          Utbytesinfo
        </Text>
       
        </View>
        <Text>{props.text} </Text>
        <Text style={styles.space_between}>
          {item.firstname} {item.lastname}{" "}
        </Text>
        <Layout style={{ flexDirection: "row", marginTop: 60 }}>
          <Text category={"s1"}>Utbyted gjordes: </Text>
          <Text>{moment(item.time_of_update).format("dddd Do MMM HH:mm")}</Text>
        </Layout>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            onPress={() => props.toggleModal(item)}
            style={{ marginTop: 70, flex: 1 }}
          >
            <Text>Stäng</Text>
          </Button>
          </Layout>
      </View>
    );
  };

  return (
    <Modal
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={styles.card}>
        <Info />
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 400,
    width: 330,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    borderRadius: 15,
  },
  space_between: {
    marginBottom: 8,
  },
});
