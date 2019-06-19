import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import {useFetch} from "react-hooks-fetch";
import ListInfo from "./listInfo";
import Typography from "@material-ui/core/Typography";
import "./GridStyle.css";
import IconButton from "@material-ui/core/IconButton";
import {TrendingFlat, OpenInNew, FolderSharedOutlined} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";

export default props => {
	const days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
	let {name, infoOrg} = props;
	let [nameCity, setNameCity] = useState(name);
	if (name !== nameCity) {
		setNameCity(name);
	}
	if (nameCity === "Current") {
		name = "";
	} else {
		name = "/" + nameCity;
	}
	const {error, data} = useFetch("http://localhost:3001/v1/forecast" + name);
	if (error) return <span>Error:{error.message}</span>;
	if (!data) return null; // this is important

	const rotater = s => {
		s = s - 90;
		return {transform: `rotate(${s}deg)`};
	};
	return (
		<>
			{infoOrg.sys ? (
				<>
					<Grid container xs={12}>
						<Grid item xs={8} container justify="space-between" alignItems="center">
							<Typography variant="h1">{infoOrg.name + ", " + infoOrg.sys.country}</Typography>
							<button onClick={() => window.open("https://www.google.com/maps/?q=" + infoOrg.name + "," + infoOrg.sys.country, "_blank")}>
								<OpenInNew />
							</button>
						</Grid>
						<Grid item xs alignItems="center" justify="flex-end" container>
							<Typography variant="h3">{infoOrg.main.temp}° C</Typography>
						</Grid>
						<Grid item xs={1} alignItems="center" justify="center" container>
							<Avatar alt={infoOrg.weather.description} className="bigAvatar" src={"http://openweathermap.org/img/w/" + infoOrg.weather.icon + ".png"} />
						</Grid>
					</Grid>
					<Divider />
					<Grid container>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">
								Cor:
								{" Lat: " + infoOrg.coord.lat + " Lon:" + infoOrg.coord.lon}
							</Typography>
						</Grid>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">
								Fecha:
								{" " +
									days[new Date(infoOrg.dt * 1000).getDay()] +
									", " +
									new Date(infoOrg.dt * 1000).getDate() +
									"/" +
									(new Date(infoOrg.dt * 1000).getMonth() + 1) +
									"/" +
									new Date(infoOrg.dt * 1000).getFullYear() +
									" " +
									new Date(infoOrg.dt * 1000).getHours() +
									":00"}
							</Typography>
						</Grid>
						<Grid item xs container alignItems="center" justify="center">
							<Typography variant="h6">Viento:</Typography>
							<TrendingFlat style={rotater(infoOrg.wind.deg)} />
							<Typography variant="h6">{infoOrg.wind.speed} m/s</Typography>
						</Grid>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">Estado: {infoOrg.weather.description}</Typography>
						</Grid>
					</Grid>
					<Divider />
					<Grid container>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">Presion: {infoOrg.main.pressure} hpa</Typography>
						</Grid>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">Humedad: {infoOrg.main.humidity} %</Typography>
						</Grid>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">Visibilidad: {infoOrg.visibility} metros</Typography>
						</Grid>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">Min: {infoOrg.main.temp_min}° C</Typography>
						</Grid>
						<Grid item xs container alignItems="center" justify="space-around">
							<Typography variant="h6">Max: {infoOrg.main.temp_max}° C</Typography>
						</Grid>
					</Grid>
					<Divider />
					<Grid container>
						{data.data.dataDays.map((d, k1) => {
							return (
								<Grid item xs className="Grid2" key={`key-${k1}`}>
									<Typography variant="h4" gutterBottom>
										{days[new Date(d[0].dt * 1000).getDay()]}
									</Typography>
									<div>
										{d.map((x, k) => {
											return <ListInfo info={x} key={`key-${k}`} />;
										})}
									</div>
								</Grid>
							);
						})}
					</Grid>
				</>
			) : (
				<Grid item xs={12} container alignItems="center" justify="space-around">
					<Typography variant="h3" gutterBottom>
						Seleccione la Ciudad para ver mas informacion
					</Typography>
				</Grid>
			)}
			<Divider />
			<Grid item container xs={12} alignItems="center" justify="space-around">
				<Typography variant="h5" gutterBottom>
					Autor: Alvaro Fimpel
				</Typography>
				<IconButton edge="end" aria-label="git" onClick={() => window.open("https://github.com/afimpel/weatherApp", "_blank")}>
					<FolderSharedOutlined />
				</IconButton>
			</Grid>
			<Divider />
		</>
	);
};
