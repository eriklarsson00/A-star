import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { Button, Divider, Layout, TopNavigation } from "@ui-kitten/components";

export const HomeScreen = ({ navigation }) => {
	const navigateDetails = () => {
		navigation.navigate("Details");
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<TopNavigation title="MyApp" alignment="center" />
			<Divider />
			<Layout
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<Button onPress={navigateDetails}>OPEN DETAILS</Button>
				<View
					style={{
						widht: "100%",
						height: "20%",
					}}
				>
					<Text style={{ color: "white" }}>Heej</Text>
				</View>
			</Layout>
		</SafeAreaView>
	);
};
