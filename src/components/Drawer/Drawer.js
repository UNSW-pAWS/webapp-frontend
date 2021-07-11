/* eslint-disable linebreak-style */
import React from "react";
import { Drawer as MUIDrawer } from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";

const useStyles = makeStyles({
	drawer: {
		width: "160px"
	}
});

const Drawer = () => {
	const classes = useStyles();
	return (
		<MUIDrawer open="true" classname={classes.drawer}>
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</MUIDrawer>
	);
}