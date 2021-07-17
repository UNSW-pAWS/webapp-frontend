import React from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme, } from "@material-ui/core/styles";

import { LandingPage } from "./pages/LandingPage";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#FF9900"
		},
		secondary: {
			main: "#F6C5AF"
		},
		contrastThreshold: 3
	},
	typography: {
	}
});

function App() {
	return (
		<div className="App" style={{ height: "100vh" }}>
			<ThemeProvider theme={theme}>
				<LandingPage />
			</ThemeProvider>
		</div>
	);
}

export default App;
