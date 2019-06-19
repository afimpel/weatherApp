import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";

export default props => {
	let {info} = props;
	const lista2 = {
		textAlign: "right",
	};

	return (
		<>
			<ListItem>
				<Typography variant="h5">{new Date(info.dt * 1000).getHours() + ":00"}</Typography>
				<ListItemAvatar>
					<Avatar alt="Remy Sharp" src={"http://openweathermap.org/img/w/" + info.weather.icon + ".png"} />
				</ListItemAvatar>
				<ListItemText primary={"Max: " + info.main.temp_max + "°"} secondary={"Min: " + info.main.temp_min + "°"} style={lista2} />
			</ListItem>
		</>
	);
};
