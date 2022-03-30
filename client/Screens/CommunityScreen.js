import {React} from "react";
import { SafeAreaView, View, Text } from "react-native";
import { } from "@ui-kitten/components";
import CommunityComponent from '../Components/CommunityComponent'

export const CommunityScreen= () => {

	return (
		<SafeAreaView >
			 <View>
			<Text>Community</Text>
			<CommunityComponent name="Majklockan"/>

			<CommunityComponent name="Rackarberget"/>
            </View>
		</SafeAreaView>
	);
};
