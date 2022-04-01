import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Text, List, ListItem,Icon,Modal,Card,Button,Layout} from '@ui-kitten/components';
import tw from 'twrnc'
import { render } from 'react-dom';
import { CommunityInfo } from "../assets/AppContext";

const DiscoverIcon = (props) => (
    <Icon {...props} name='compass-outline'/>
);

const items = getItems();
function getItems() {
    return new Array(10).fill({
        user_id : 1,
        product_id :1,
        product_text : "Apelsin",
        description: "Beskrivning av varan, den kanske är såhär lång?",
        quantity: "3 st",
        time_of_creation: "Today 13.37",
        time_of_purchase: "Date",
        time_of_expiration: "2022-04-01",
        imgurl : <DiscoverIcon />,
        broken_pkg : true,
    });
};  

const myItems = getMyItems();
function getMyItems() {
  return new Array(3).fill({
    user_id : 1,
    product_id :1,
    product_text : "Apelsin",
    description: "Beskrivning av varan",
    quantity: "3 st",
    time_of_creation: "Today 13.37",
    time_of_purchase: "Date",
    time_of_expiration: "",
    imgurl : <DiscoverIcon />,
    broken_pkg : true,
  });
};

const lists = getLists();
function getLists() {
  let arrayList = new Array(2);
  arrayList[0] = {
    data : myItems,
    mina:true,
  }
  arrayList[1] = {
    data: items,
    mina: false,
  }
  return arrayList;
}

export const ItemAvailableComponent = () => {
    const [visible, setVisible] = React.useState(false);
    const [myVisible, setMyVisible] = React.useState(false);
    const { community } = React.useContext(CommunityInfo);
    const [takeProduct, setTakeProduct] = React.useState(false);
    
    const renderAvailableItems = ({ item }) => 
    (
    <View>
      <ListItem
        style={styles.container}
        onPress={() => setVisible(true)}
        accessoryLeft={item.imgurl}
        title={`${item.product_text}`}
        description={`${item.quantity}`}
      />
      <Modal //Modal för ytterliggare info
        visible={visible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.01)'}}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={{ width:300, flex:1}}>
          <Layout style={tw`py-10`} >
            <Image style={tw`rounded-full`} source={{uri: "https://picsum.photos/150/150", height: 100, width: 100}}/>
            
	        </Layout>
          <Text style={{marginBottom:10}}>{item.product_text}    {item.quantity}</Text>
          <Text style={{marginBottom:10}}>Utångsdag: {item.time_of_expiration}</Text>
          <Text style={{marginBottom:10}}>Bruten förpackning: {item.broken_pkg ? "Japp" : "Nepp"} </Text>
          <Text style={{marginBottom:10}}>Användare som lagt upp</Text>
          <Text style={{marginBottom:10}}>{item.description}</Text>
          <Button onPress={() => setTakeProduct(true)}>Ta vara</Button>
        </Card>
      </Modal>
      <Modal
      visible={takeProduct && visible}
      onBackdropPress={() => setTakeProduct(false)}
      >
      <Card disabled={true} style={{ width:300, flex:1}}>
          <Text style={{marginBottom:10}}>{item.product_text}    {item.quantity}</Text>
          <Text style={{marginBottom:10}}>Utångsdag: {item.time_of_expiration}</Text>
          <Text style={{marginBottom:10}}>Bruten förpackning: {item.broken_pkg ? "Japp" : "Nepp"} </Text>
          <Text style={{marginBottom:10}}>Användare som lagt upp</Text>
          <Text style={{marginBottom:10}}>{item.description}</Text>
          <Button onPress={() => setTakeProduct(true)}>Ta vara</Button>
        </Card>  
      </Modal>
    </View>
    );
    
    const renderMyItems = ({ item }) => 
    (
    <View>
      <ListItem
        style={styles.container}
        onPress={() => setMyVisible(true)}
        accessoryLeft={item.imgurl}
        title={`${item.product_text} ${item.quantity}`}
        description={`${item.description}`}
      />
      <Modal
        visible={myVisible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.01)'}}
        onBackdropPress={() => setMyVisible(false)}>
        <Card disabled={true}>
          <Text> Mina vara {item.title} </Text>
        </Card>
      </Modal>
    </View>
    );

    const renderLists = ({item}) => (
      <View>
        <Text category={"h5"}style={{marginTop:20, marginLeft:11}}>
          {item.mina ? "Mina varor" : 
          community.map(name=><Text category={"h5"}>Tillgängligt i {name} </Text>) }</Text>
        <List 
        data={item.data}
        renderItem={item.mina ? renderMyItems : renderAvailableItems}
          />
      </View>
    );

	return (
    <View style={{flex:1}}>
      <List
      data={lists}
      renderItem={renderLists}
      />
    </View>);
}

const styles = StyleSheet.create({
    container: {
        marginTop:15,
        height:100,
        marginRight:10,
        marginLeft:10,
    },
});