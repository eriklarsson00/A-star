import { Modal, Text, Layout, Button, Card } from "@ui-kitten/components";
import { View, StyleSheet, Image } from "react-native";
import tw from "twrnc";
import moment from "moment";

export const AwaitingConfirmationModal = (props) => {
  const item = props.item;

  const Info = () => {
    return (
      <View>
        <Text
          category={"h4"}
          style={{ textAlign: "center", marginTop: 5, marginBottom: 15 }}
        >
          Inväntar bekräftelse
        </Text>
        {props.text}
        <View
          style={[
            styles.image,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Layout style={tw`py-8`}>
            <Image
              style={[tw`rounded-full`, styles.image, { marginTop: -18 }]}
              source={{
                uri: item.imgurl,
                height: 100,
                width: 100,
              }}
            />
          </Layout>
        </View>
        <Text
          style={[
            styles.space_between,
            {
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginTop: -15,
            },
          ]}
        >
          {item.firstname} {item.lastname}{" "}
        </Text>
        <Layout style={{ flexDirection: "row", marginTop: 20 }}>
          <Text category={"s1"}>Föreslaget utbyte: </Text>
          <Text>
            {moment(item.time_of_expiration).format("dddd Do MMM HH:mm")}
          </Text>
        </Layout>
        <Button
          onPress={() => props.toggleModal(item)}
          style={{ width: 120, marginTop: 50, alignSelf: "center" }}
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
