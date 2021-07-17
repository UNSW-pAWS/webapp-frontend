import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	appBar: {
		backgroundColor: "#FFFFFF",
		padding: "0.25rem",
		borderBottomWidth: "2px",
		borderBottomStyle: "solid",
		borderBottomColor: theme.palette.primary.main
	},
	name: {
		fontWeight: "bold",
		fontFamily: "'Lucida Console', 'Courier New', monospace"
	},
	bar: {
		whiteSpace: "pre",
		fontFamily: "'Lucida Console', 'Courier New', monospace",
		color: theme.palette.primary.main
	},
	appName: {
		whiteSpace: "pre",
		fontFamily: "'Lucida Console', 'Courier New', monospace"
	}
});

export function Header({ classes }) {


	return (
		<AppBar className={classes.appBar} position="static" elevation={0}>
			<Toolbar>
				<Typography className={classes.name} variant={"h4"}>pAWS</Typography>
				<Typography className={classes.bar} variant={"h5"}>  |  </Typography>
				<Typography className={classes.appName} variant={"h6"}>Design and Configuration Tool</Typography>
			</Toolbar>
		</AppBar>
	);

}

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);