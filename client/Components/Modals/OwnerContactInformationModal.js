import { Modal, Text, Layout, Button, Card } from "@ui-kitten/components";
import { View, StyleSheet } from "react-native";
import { ownerConfirmTransaction } from "../../Services/ServerCommunication";

export const OwnerContactInformationModal = (props) => {
  const item = props.item;

  const completedTransaction = async () => {
    console.log("TODO: Pusha transaktionen som ownerConfirmed");
    //await ownerConfirmTransaction(item.id);
    props.toggleRating();
  };

  const Info = () => {
    return (
      <View>
        <Text category={"h1"} style={{ marginTop: 40, marginBottom: 50 }}>
          Kontaktinfo
        </Text>
        <Text style={styles.space_between}>
          Namn: {item.firstname} {item.lastname}{" "}
        </Text>
        <Text style={styles.space_between}>Telefonnummer: {item.number}</Text>
        <Text style={styles.space_between}>Email: {item.email}</Text>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Button
            onPress={() => completedTransaction()}
            style={{ marginTop: 100, flex: 1 }}
          >
            <Text>Bytet är genomfört</Text>
          </Button>
        </Layout>
      </View>
    );
  };

  return (
    <Modal //Modal for additional information about a product
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
    height: 450,
    width: 330,
    flex: 1,
    alignItems: "center",
    alignContent: "center",
  },
  space_between: {
    marginBottom: 15,
  },
});
