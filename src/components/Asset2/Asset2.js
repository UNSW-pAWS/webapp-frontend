/* eslint-disable linebreak-style */
import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { Tooltip } from "@material-ui/core";


const styles = () => ({
	asset: {
		height: 80,
		width: 80,
		margin: "1rem"
	}
});

export function Asset2({ classes }) {

	return (
		<React.Fragment>
			<Tooltip title="Open Menu">
				<Paper elevation={3} className={classes.asset} draggable={"false"}/>
			</Tooltip>
		</React.Fragment>
	);

}

Asset2.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Asset2);