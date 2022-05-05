import { Modal, Text, Layout, Button, Card } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import moment from "moment";

export const AwaitingConfirmationModal = (props) => {
  const item = props.item;

  const Info = () => {
    return (
      <View>
        <Text
          category={"h4"}
          style={{ textAlign: "center", marginTop: 20, marginBottom: 25 }}
        >
          Inväntar bekräftelse
        </Text>
        {props.text}
        <Text style={styles.space_between}>
          {item.firstname} {item.lastname}{" "}
        </Text>
        <Layout style={{ flexDirection: "row", marginTop: 40 }}>
          <Text category={"s1"}>Föreslaget utbyte: </Text>
          <Text>
            {moment(item.time_of_expiration).format("dddd Do MMM HH:mm")}
          </Text>
        </Layout>
        <Button
          onPress={() => props.toggleModal(item)}
          style={{ width: 120, marginTop: 120, alignSelf: "center" }}
        >
          <Text>Stäng</Text>
        </Button>
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
    width: 310,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  space_between: {
    marginBottom: 8,
  },
});
