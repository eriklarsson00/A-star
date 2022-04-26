import { Modal, Text, Layout, Button, Card } from "@ui-kitten/components";
import { View } from "react-native";
import { ownerConfirmTransaction } from "../../Services/ServerCommunication";

export const OwnerContactInformationModal = (props) => {
  const item = props.item;

  const completedTransaction = async () => {
    console.log("TODO: Pusha transaktionen som ownerConfirmed");
    /*ownerConfirmTransaction(item.id)
      .catch((err) => console.log(err))
      .then((msg) => console.log(msg));*/
    props.toggleRating();
  };

  const Info = () => {
    return (
      <View>
        <Text category={"h2"}>Kontaktinfo</Text>
        <Text>
          Namn: {item.firstname} {item.lastname}{" "}
        </Text>
        <Text>Telefonnummer: {item.number}</Text>
        <Text>Email: {item.email}</Text>
        <Layout
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Button onPress={() => completedTransaction()} status={"success"}>
            <Text>Bytet är genomfört</Text>
          </Button>
        </Layout>
      </View>
    );
  };

  return (
    <Modal //Modal for additional information about a product
      visible={item.visible}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
      onBackdropPress={() => props.toggleModal(item)}
    >
      <Card disabled={true} style={{ width: 320, flex: 1 }}>
        <Info />
      </Card>
    </Modal>
  );
};
