import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Text, Layout,List, Divider,ListItem,Icon,Modal,Card,Button,ModalService} from '@ui-kitten/components';
import tw from 'twrnc'

export const ItemAvailableComponent = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const items = new Array(15).fill({
      title: 'Vara',
      description: 'Beskrivning',
      hiddeninfo: 'gömd info',
    });
    const DiscoverIcon = (props) => (
      <Icon {...props} name='compass-outline'/>
    );
    
    let modalID = '';

  const showModal = () => {
    const contentElement = renderModalContentElement();
    modalID = ModalService.show(contentElement, { onBackdropPress: hideModal });
  };

  const hideModal = () => {
    ModalService.hide(modalID);
  };

  const renderModalContentElement = () => {
    return (
        <Layout >
            <Text>Bara lägga till modul nu</Text>
        </Layout>
    );
  };   

    const renderItem = ({ item, index }) => (
      <View>
      <ListItem
        style={styles.container}
        onPress={showModal}
        accessoryLeft={<DiscoverIcon />}
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
      />
     </View>
    );

	return (
      <List
      data={items}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
            
	);
}

const styles = StyleSheet.create({
    tabContainer: {
      marginTop: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
        marginTop:15,
        height:80,
    },
});