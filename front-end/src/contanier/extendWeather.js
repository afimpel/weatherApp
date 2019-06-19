import React, {useState, Suspense} from "react";
import Grid from "@material-ui/core/Grid";
import {useFetch} from "react-hooks-fetch";
import ListInfo from "./listInfo";
import Typography from "@material-ui/core/Typography";
import "./GridStyle.css";

const DisplayRemoteData = props => {
	const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
	// eslint-disable-next-line to the line before.
	let {name, ms} = props;
	console.log("ms :", ms);
	let [nameCity] = useState(name);
	//	let [info] = useState(infoOrg);
	if (nameCity === "Current") {
		name = "";
	} else {
		console.log("data :", name);
		name = "/" + nameCity;
	}
	const {error, data} = useFetch("http://localhost:3001/v1/forecast" + name);
	if (error) return <span>Error:{error.message}</span>;
	if (!data) return null; // this is important

	return (
		<Grid container>
			{data.data.dataDays.map((d, k1) => {
				return (
					<Grid item xs className="Grid" key={`key-${k1}`}>
						<Typography variant="h3" gutterBottom>
							{days[new Date(d[0].dt * 1000).getDay()]}
						</Typography>
						{d.map((x, k) => {
							return <ListInfo info={x} key={`key-${k}`} />;
						})}
					</Grid>
				);
			})}
		</Grid>
	);
};
const DD = props => {
	console.log("ms :", props);
	return (
		<>
			<Typography variant="h3" gutterBottom>
				{props.infoOrg.name + ", " + props.infoOrg.sys.country}
			</Typography>
			<Suspense fallback={<span>Loading...</span>}>
				<DisplayRemoteData {...props} />
			</Suspense>
		</>
	);
};

export default props => {
	let d = new Date().getMilliseconds();
	let {name} = props;
	let [nameCity, setNameCity] = useState(name);
	if (nameCity !== name) {
		setNameCity(name);
	}
	return <DD {...props} name2={nameCity} ms={d} />;
};
