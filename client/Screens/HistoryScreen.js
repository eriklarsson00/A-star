import { FlatList, StyleSheet, View } from "react-native";
import { Icon, ListItem, Spinner, Text } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";

import { HistoryInfoModal } from "../Components/Modals/HistoryInfoModal";
import { UserInfo } from "../assets/AppContext";
import { getCompletedTransactions } from "../Services/ServerCommunication";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

const GiveAwayIcon = (props) => (
  <Icon {...props} fill={"red"} name="arrow-circle-up" />
);

const ReceiveIcon = (props) => (
  <Icon {...props} fill={"green"} name="arrow-circle-down" />
);

export const HistoryScreen = () => {
  // CONTEXT
  const { userInfo } = useContext(UserInfo);

  // STATE
  const [historyTransactions, setHistoryTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();
  const uid = userInfo.id;

  const fetchHistoryTransactions = async () => {
    setLoading(true);
    let completedTransactions = await getCompletedTransactions(uid);
    completedTransactions.sort(
      ({ time_of_update: a }, { time_of_update: b }) => {
        return a > b ? -1 : a < b ? 1 : 0;
      }
    );
    setHistoryTransactions(completedTransactions);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) fetchHistoryTransactions();
  }, [isFocused]);

  const toggleVisible = (array, item) => {
    return array.map((offer) => {
      if (offer == item) {
        offer.visible = !offer.visible;
      }
    });
  };

  const toggleModal = (item) => {
    toggleVisible(historyTransactions, item);
    setHistoryTransactions([...historyTransactions]);
  };

  const whatToRender = (opt1, opt2) => {
    if (opt1 !== null) {
      return `${opt1}`;
    } else {
      return `${opt2}`;
    }
  };

  const renderTransactionIcon = (offer) => {
    if (offer) {
      return GiveAwayIcon;
    } else {
      return ReceiveIcon;
    }
  };

  const renderGiveOrTake = (offer_product_name, request_product_name) => {
    if (offer_product_name) {
      return (
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text category={"s1"}>{offer_product_name} har</Text>
          <Text category={"s1"} style={{ textDecorationLine: "underline" }}>
            {" "}
            getts bort{" "}
          </Text>
          <Text category={"s1"}>till</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text category={"s1"}>{request_product_name} har</Text>
          <Text category={"s1"} style={{ textDecorationLine: "underline" }}>
            {" "}
            tagits emot{" "}
          </Text>
          <Text category={"s1"}>från</Text>
        </View>
      );
    }
  };

  const renderAcceptedTransactions = ({ item }) => {
    let historyModal = (
      <HistoryInfoModal
        item={item}
        text={renderGiveOrTake(item.offer_product, item.request_product)}
        toggleModal={toggleModal}
      />
    );

    return (
      <View>
        <ListItem
          style={styles.container}
          onPress={() => toggleModal(item)}
          accessoryLeft={renderTransactionIcon(item.offer_product)}
          accessoryRight={() => {
            return (
              <Text style={{ top: 38, fontSize: 10 }}>
                {" "}
                {moment(item.time_of_update).fromNow()}
              </Text>
            );
          }}
          title={whatToRender(item.offer_product, item.request_product)}
          description={whatToRender(
            item.offer_description,
            item.request_description
          )}
        />
        {historyModal}
      </View>
    );
  };

  const flatListHeader = () => {
    return (
      <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
        Genomförda utbyten
      </Text>
    );
  };

  const LoadingView = () => (
    <View
      style={{
        marginTop: 370,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner size={"giant"} />
    </View>
  );

  const LoadedView = () => (
    <FlatList
      style={{ flex: 1 }}
      data={historyTransactions}
      renderItem={renderAcceptedTransactions}
      ListHeaderComponent={flatListHeader}
    />
  );

  return loading ? <LoadingView /> : <LoadedView />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  spaceBetween: {
    marginBottom: 10,
  },
});
