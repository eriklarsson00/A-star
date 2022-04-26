import { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Text, Layout, Spinner, ListItem, List } from "@ui-kitten/components";
import { UserInfo } from "../assets/AppContext";
import {
  getAcceptedTransactionsOwner,
  getAcceptedTransactionsResponder,
} from "../Services/ServerCommunication";
import { OwnerContactInformationModal } from "./Modals/OwnerContactInformationModal";
import { RatingModal } from "./Modals/RatingModal";
import tw from "twrnc";

export const MyListingsTransactions = () => {
  // CONTEXT
  const { userInfo, setUserInfo } = useContext(UserInfo);

  // STATE
  const [ownerTransactions, setOwnerTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(false);

  const isFocused = useIsFocused();
  const uid = userInfo.id;

  const fetchTransactions = async () => {
    setLoading(true);
    let otransactions = await getAcceptedTransactionsOwner(uid);
    setOwnerTransactions(otransactions);
    console.log(otransactions);
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
    toggleVisible(ownerTransactions, item);
    setOwnerTransactions([...ownerTransactions]);
  };

  const toggleRating = () => {
    setRating(!rating);
  };

  const whatToRender = (opt1, opt2) => {
    if (opt1 !== null) {
      return `${opt1}`;
    } else {
      return `${opt2}`;
    }
  };

  const renderAcceptedTransactions = ({ item }) => {
    let contactModal = (
      <OwnerContactInformationModal
        item={item}
        toggleModal={toggleModal}
        toggleRating={toggleRating}
      />
    );

    let ratingModal = <RatingModal item={item} toggleModal={toggleModal} />;

    let modal = !rating ? contactModal : ratingModal;

    return (
      <View>
        <ListItem
          style={styles.container}
          onPress={() => toggleModal(item)}
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
      data={ownerTransactions}
      renderItem={renderAcceptedTransactions}
      ListHeaderComponent={flatListHeader}
    ></FlatList>
  );

  return null || loading ? <LoadingView /> : <LoadedView />;
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    height: 100,
    marginRight: 10,
    marginLeft: 10,
  },
  spaceBetween: {
    marginBottom: 10,
  },
});
