import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { Radio } from '@ui-kitten/components';

const CommunityComponent = (props) => {
 
    return(
    <View style={styles.container}>
        <Text>{props.name}</Text>
        <Radio style={styles.radio} checked={true}>TESTAR </Radio> 
    </View>
  );
}

const styles = StyleSheet.create({
    radio: {
        justifyContent: "flex-end",
    },
    container: {
        alignItems: "center",
        margin:2,
        backgroundColor: '#FED499',
        width: '80%',
        height: 100
    },
  });
  


export default CommunityComponent;