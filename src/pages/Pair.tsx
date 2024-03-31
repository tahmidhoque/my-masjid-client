import { Grid, Typography } from "@mui/material";
import { useAppState } from "../providers/state";
import { useEffect, useState } from "react";
import DatabaseHandler from "../modules/DatabaseHandler";
import { useNavigate } from "react-router-dom";

export default function Pair(): JSX.Element {
	const { state } = useAppState();
	const [paired, setPaired] = useState(false);
	const [screenKey, setScreenKey] = useState(state.screenKey);
	const navigate = useNavigate();

	useEffect(() => {
		window.api.getScreenKey().then((key) => {
			setScreenKey(key);
		});
	}, [state]);

	useEffect(() => {
		const interval = setInterval(async () => {
			const db = new DatabaseHandler();
			db.getScreenInfo(screenKey).then((screenInfo: any) => {
				console.log("screenInfo: ", screenInfo);
				if (screenInfo.paired === "1") {
					setPaired(true);
					window.api.setPaired({ paired: true });
					navigate("/");
				}
			});
		}, 25000);

		return () => clearInterval(interval);
	});

	if (paired === true) {
		return (
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="h1">Device Paired</Typography>
					<Typography variant="h2">
						Your device is paired to your account.
					</Typography>
				</Grid>
			</Grid>
		);
	}

	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant="h1">
					Pair Screen to your Masjid Solutions Account
				</Typography>
				<Typography variant="h2">
					Please pair your device to your account to continue.
				</Typography>
			</Grid>
			<Grid item xs={12}>
				<Typography variant="h3">
					To pair your device, please visit the following URL:
				</Typography>
				<Typography variant="h4">https://masjidsolutions.com/pair</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography variant="h5">Enter the following code:</Typography>
				<Typography variant="h6">{screenKey}</Typography>
			</Grid>
		</Grid>
	);
}
