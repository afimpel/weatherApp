import React from "react";

import Layout from "./contanier/widgetWeather";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
	cont: {
		height: "100%",
	},
}));

function App() {
	const classes = useStyles();
	return (
		<div className={classes.cont}>
			<Layout />
		</div>
	);
}

export default App;
