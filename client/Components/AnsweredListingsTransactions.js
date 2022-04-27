import { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Text, Spinner, ListItem, List, Icon } from "@ui-kitten/components";
import { UserInfo, CommunityInfo } from "../assets/AppContext";
import {
  getOngoingTransactionsResponder,
  responderConfirmTransaction,
} from "../Services/ServerCommunication";
import { OwnerContactInformationModal } from "./Modals/OwnerContactInformationModal";
import { RatingModal } from "./Modals/RatingModal";
import tw from "twrnc";

const GiveAwayIcon = (props) => (
  <Icon {...props} fill={"red"} name="arrow-circle-up" />
);

const ReceiveIcon = (props) => (
  <Icon {...props} fill={"green"} name="arrow-circle-down" />
);

export const AnsweredListingsTransactions = () => {
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [responderTransactions, setResponderTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(false);

  const isFocused = useIsFocused();
  const uid = userInfo.id;

  const fetchTransactions = async () => {
    setLoading(true);
    let rtransactions = await getOngoingTransactionsResponder(uid);
    setResponderTransactions(rtransactions);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) fetchTransactions();
  }, [isFocused]);

  const toggleVisible = (array, item) => {
    return array.map((offer) => {
      if (offer == item) {
        offer.visible = !offer.visible;
      }
    });
  };

  const toggleModal = (item) => {
    toggleVisible(responderTransactions, item);
    setResponderTransactions([...responderTransactions]);
  };

  const toggleRating = () => {
    setRating(!rating);
  };

  const ratingCompleted = () => {
    setRating(!rating);
    fetchTransactions();
  };

  const confirmTransaction = async (id) => {
    await responderConfirmTransaction(id);
  };

  const whatToRender = (opt1, opt2) => {
    if (opt1 !== null) {
      return `${opt1} `;
    } else {
      return `${opt2} `;
    }
  };

  const renderTransactionIcon = (offer) => {
    if (!offer) {
      return GiveAwayIcon;
    } else {
      return ReceiveIcon;
    }
  };

  const renderGiveOrTake = (offer_product_name, request_product_name) => {
    if (!offer_product_name) {
      return (
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text category={"s1"}>{request_product_name} ska</Text>
          <Text category={"s1"} style={{ textDecorationLine: "underline" }}>
            {" "}
            ges bort{" "}
          </Text>
          <Text category={"s1"}>till</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text category={"s1"}>{offer_product_name} ska</Text>
          <Text category={"s1"} style={{ textDecorationLine: "underline" }}>
            {" "}
            tas emot{" "}
          </Text>
          <Text category={"s1"}>från</Text>
        </View>
      );
    }
  };

  const renderAcceptedTransactions = ({ item }) => {
    let contactModal = (
      <OwnerContactInformationModal
        item={item}
        text={renderGiveOrTake(item.offer_product, item.request_product)}
        toggleModal={toggleModal}
        toggleRating={toggleRating}
        confirmTransaction={confirmTransaction}
      />
    );

    let ratingModal = (
      <RatingModal
        item={item}
        toggleModal={toggleModal}
        ratingCompleted={ratingCompleted}
      />
    );

    let modal = !rating ? contactModal : ratingModal;

    return (
      <View>
        <ListItem
          style={styles.container}
          onPress={() => toggleModal(item)}
          accessoryLeft={renderTransactionIcon(item.offer_product)}
          title={whatToRender(item.offer_product, item.request_product)}
          description={whatToRender(
            item.offer_description,
            item.request_description
          )}
        />
        {modal}
      </View>
    );
  };

  const flatListHeader = () => {
    return (
      <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
        Bekräftade utbyten
      </Text>
    );
  };

  const flatListFooter = () => {
    return (
      <View>
        <Text category={"h5"} style={{ marginTop: 20, marginLeft: 11 }}>
          Inväntar bekräftelse
        </Text>
        <List
          scrollEnabled={false}
          /*data={}
          renderItem={}*/
        />
      </View>
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
      data={responderTransactions}
      renderItem={renderAcceptedTransactions}
      ListHeaderComponent={flatListHeader}
      ListFooterComponent={flatListFooter}
    ></FlatList>
  );

  return loading ? <LoadingView /> : <LoadedView />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
  },
});
