import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { AppNavigator } from "./Navigation/Navigation";
import { default as theme } from "./assets/custom-theme.json"; // <-- Import app theme

export default () => (
	<>
		<IconRegistry icons={EvaIconsPack} />
		<ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
			<AppNavigator />
		</ApplicationProvider>
	</>
);
