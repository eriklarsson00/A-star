import { useState, useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  Text,
  Layout,
  useTheme,
  TopNavigation,
  Spinner,
  ListItem,
  List,
} from "@ui-kitten/components";
import { UserInfo, CommunityInfo } from "../assets/AppContext";
import {
  getAcceptedTransactionsOwner,
  getAcceptedTransactionsResponder,
} from "../Services/ServerCommunication";
import tw from "twrnc";

export const AnsweredListingsTransactions = () => {
  const { userInfo, setUserInfo } = useContext(UserInfo);
  const [ownerTransactions, setOwnerTransactions] = useState([]);
  const [responderTransactions, setResponderTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const uid = userInfo.id;

  const fetchTransactions = async () => {
    setLoading(true);
    let otransactions = await getAcceptedTransactionsOwner(uid);
    setOwnerTransactions(otransactions);
    let rtransactions = await getAcceptedTransactionsResponder(uid);
    setResponderTransactions(rtransactions);
    console.log("-------BESVARADE-------");
    console.log(responderTransactions);
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) fetchTransactions();
  }, [isFocused]);

  const renderAcceptedTransactions = ({ item }) => (
    <View>
      <ListItem
        style={styles.container}
        onPress={() => console.log("todo:visa kontaktinfo")}
        title={`${item.product_text} ${item.quantity}`}
        description={`${item.description}`}
      />
    </View>
  );

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
      //data={}
      //renderItem={renderAcceptedTransactions}
      ListHeaderComponent={flatListHeader}
      ListFooterComponent={flatListFooter}
    ></FlatList>
  );

  return loading ? <LoadingView /> : <LoadedView />;
};
