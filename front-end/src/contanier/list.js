import React, {useState, useEffect} from "react";
import Typography from "@material-ui/core/Typography";

import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import LocationOn from "@material-ui/icons/LocationOn";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";

export default props => {
	let {fnd, click, name} = props;
	let [info, setInfo] = useState({});
	let [info2, setInfo2] = useState({temp: 0, description: "", country: "", ico: "01n"});
	let [nameCity, setNameCity] = useState(name);
	let del = true;
	if (nameCity !== name) {
		setNameCity(name);
	}
	if (nameCity === "Current") {
		del = false;
	}

	useEffect(() => {
		let name = "";
		if (nameCity === "Current") {
			name = "";
		} else {
			name = "/" + nameCity;
		}
		axios
			.get("http://localhost:3001/v1/current" + name)
			.then(result => {
				let data = result.data.data;
				setInfo2({temp: data.main.temp, description: data.weather.description, country: data.sys.country, ico: data.weather.icon});
				setInfo(data);
			})
			.catch(err => {});
	}, [nameCity]);

	return (
		<ListItem button onClick={() => click(name, info)}>
			<ListItemText primary={info.name + ", " + info2.country} secondary={info2.description} />
			<Typography variant="h5">{info2.temp + "° C"} </Typography>
			<ListItemAvatar>
				<Avatar
					alt="Remy Sharp"
					src={"http://openweathermap.org/img/w/" + info2.ico + ".png"}
					onLoad={e => {
						setNameCity(name);
					}}
				/>
			</ListItemAvatar>
			{del ? (
				<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="Delete" onClick={() => fnd(info.name)}>
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			) : (
				<ListItemSecondaryAction>
					<LocationOn />
				</ListItemSecondaryAction>
			)}
		</ListItem>
	);
};
