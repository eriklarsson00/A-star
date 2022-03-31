import React from 'react';
import { StyleSheet} from 'react-native';
import { Text, Layout,List, Divider,ListItem,Icon} from '@ui-kitten/components';
import tw from 'twrnc'

export const ItemRequestedComponent = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const items = new Array(15).fill({
      title: 'Vara',
      description: 'Beskrivning',
    });
    const DiscoverIcon = (props) => (
      <Icon {...props} name='compass-outline'/>
  );
    
    const renderItem = ({ item, index }) => (
      <ListItem
        style={styles.container}
        accessoryLeft={<DiscoverIcon />}
        title={`${item.title} ${index + 1}`}
        description={`${item.description} ${index + 1}`}
      />
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