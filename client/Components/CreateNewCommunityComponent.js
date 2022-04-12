import React from "react";
import { View } from "react-native";
import { Text, Layout } from "@ui-kitten/components";
import { MyCommunitysInfo } from "../assets/AppContext";
import tw from "twrnc";

const CreateNewCommunityComponent = (props) => {
	const theme = useTheme();

	//CONTEXT

	const { myCommunitysInfo, setMyCommunitysInfo } =
		React.useContext(MyCommunitysInfo);

	//ICONS

	const CrossIcon = () => (
		<Icon
			style={styles.crossStyle}
			fill={theme["color-basic-600"]}
			name="close-circle-outline"
		/>
	);
	return (
		<Layout>
			<Text>TBA</Text>
		</Layout>
	);
};

const styles = StyleSheet.create({});

export default CreateNewCommunityComponent;
