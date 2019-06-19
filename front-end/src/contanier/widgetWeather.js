import React, {useState, Suspense} from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Listas from "./list";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import "./GridStyle.css";
import ExtendWeather from "./extendWeather";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

let citesArray = ["Current", "London", "Paris", "Miami", "Brasilia", "Montevideo,UY", "La Habana"];

const useStyles = makeStyles(theme => ({
	textField: {
		marginLeft: "auto",
		marginRight: "auto",
		width: "100%",
	},
	cont: {
		maxWidth: "100%",
	},
}));

export default props => {
	const classes = useStyles();
	let [textInputBase, setInputBase] = useState("");
	let [infoCityCurrent, setInfoCityCurrent] = useState({});
	let [cites, setCites] = useState(citesArray);
	let [cityInfo, setCityInfo] = useState("Current");

	const addCites = name => {
		if (name !== "") {
			setCites([...cites, name]);
			setInputBase("");
		}
	};
	const clickSetCityInfo = (c, d) => {
		setCityInfo(c);
		setInfoCityCurrent(d);
		console.log("clickSetCityInfo :", c, d);
	};
	const delCites = id => {
		var index = cites.indexOf(id);
		let cites2 = cites.slice();
		cites2.splice(index, 1);
		setCites(cites2);
	};
	let dense = true;
	return (
		<>
			<Grid container spacing={0} className={classes.cont}>
				<Grid item xs={3} className="Grid">
					<Grid container spacing={0} alignItems="center" justify="space-around">
						<Grid item xs={10}>
							<TextField
								className={classes.textField}
								id="outlined-cites-input"
								label="Agregar Ciudad"
								type="text"
								name="cites"
								autoComplete="cites"
								margin="none"
								variant="outlined"
								value={textInputBase}
								onChange={e => setInputBase(e.target.value)}
								onKeyDown={e => {
									if (e.key === "Enter") {
										addCites(textInputBase);
									}
								}}
							/>
						</Grid>
						<Grid item xs={1}>
							<IconButton edge="end" aria-label="Delete" onClick={() => addCites(textInputBase)}>
								<AddIcon />
							</IconButton>
						</Grid>
					</Grid>
					<div>
						<List dense={dense}>
							{cites.map((value, k) => {
								return <Listas name={value} key={`key-${k + 1}`} fnd={delCites} click={clickSetCityInfo} />;
							})}
						</List>
						<Divider />
					</div>
				</Grid>
				<>
					<Suspense
						fallback={
							<Grid item xs container alignItems="center" justify="center">
								<CircularProgress disableShrink />
							</Grid>
						}
					>
						<Grid item xs>
							<ExtendWeather infoOrg={infoCityCurrent} name={cityInfo} />
						</Grid>
					</Suspense>
				</>
			</Grid>
		</>
	);
};
